/* globals process, require */
var Parse = require('parse').Parse,
    _ = require('lodash'),
    cheerio = require('cheerio'),
    express = require('express'),
    axios = require('axios'),
    app = express(),
    PORT = process.env.PORT || 3000;

Parse.initialize(
  'cuynRBSgSE61Pc3XOiblptLRUMiBQ3nq7phxjYEc',
  'iRB1slCezFHDGvB5Gs7IyJ53e1dmusLfDVN1UTyU');

app.get('/sync/:date', function(req, res) {
  var date = req.params.date;

  console.log('Fetching match summaries');
  axios.get('http://football-data.mx-api.enetscores.com/page/xhr/sport_events/1%2F' + date + '%2Fbasic_h2h%2F0%2F0/')
  .then(function(eventsResponse) {

    var eventsHtml = eventsResponse.data;
    var $ = cheerio.load(eventsHtml);
    var eventsFetched = $('[data-link=event_link][data-event]').map(function() {
      return $(this).data('event');
    }).get().map(function(id) {
      return axios.get('http://json.mx-api.enetscores.com/live_data/event/' + id + '/0?_=' + Date.now()).then(function(response) {
        return response;
      });
    });
    console.log('Found ' + eventsFetched.length + ' matches for ' + date);
    console.log('Fetching match data');

    // TODO: don't fail on a single failure
    return axios.all(eventsFetched);

  }).then(function(eventsResponses) {
    if(!eventsResponses.length) { return Parse.Promise.as(); }

    console.log('Finding leagues and matches for tracked leagues');

    var events = _.chain(eventsResponses).pluck('data').pluck('i').pluck('0').value();

    var teamQuery = new Parse.Query("Team");
    var leagueQuery = new Parse.Query("League");

    return Parse.Promise.when([teamQuery.find(), leagueQuery.find()]).then(function(teams, leagues) {
      console.log('Found tracked leagues');

      var teamIds = _.chain(teams).pluck('attributes').pluck('teamfk').value();
      var leagueNames = _.chain(leagues).pluck('attributes').pluck('name').value();

      var relevantEvents = events.filter(function(event) {
        return (_.contains(teamIds, event.homefk) || _.contains(teamIds, event.awayfk)) && event.status_type === "finished";
      });
      console.log('Found ' + relevantEvents.length + ' matches for tracked leagues');
      console.log('Syncing matches to Parse');

      var matchesSynced = relevantEvents.map(function(event){

        return axios.all([
          axios.get('http://json.mx-api.enetscores.com/live_data/actionzones/' + event.eventfk + '/0?_=' + Date.now()),
          axios.get('http://json.mx-api.enetscores.com/live_data/event_texts/' + event.eventfk + '/3?_=' + Date.now())
        ]).then(axios.spread(function(incidentsResponse, leagueResponse) {

          var matchQuery = new Parse.Query(Match);
          matchQuery.equalTo('eventfk', event.eventfk);
          return matchQuery.first().then(function(match) {
            if(!match) { match = new Match(); }

            var type = _.contains(leagueNames, leagueResponse.data.tt) ? "league" : "cup";

            return match.syncData(event, incidentsResponse.data.i, type);
          });

        }));
      });

      if(matchesSynced.length > 0) {
        return Parse.Promise.when(matchesSynced);
      } else {
        return Parse.Promise.as();
      }
    }).then(function(){
      res.send("OK");
    });
  });
});

app.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});

var Match = Parse.Object.extend({
  className: "Match",

  syncData: function(event, incidents, type) {
    var homefk = Number(event.homefk);
    var awayfk = Number(event.awayfk);

    var homeScore = Number(event.results[1].r[1]);
    var awayScore = Number(event.results[2].r[1]);

    console.log('homeScore', homeScore);
    console.log('awayScore', awayScore);

    var defaultHomeGoals = Array.apply(null, new Array(homeScore)).map(Number.prototype.valueOf,0);
    var defaultAwayGoals = Array.apply(null, new Array(awayScore)).map(Number.prototype.valueOf,0);

    console.log('defaultHomeGoals', defaultHomeGoals);
    console.log('defaultAwayGoals', defaultAwayGoals);

    var homeGoals = _.chain(incidents).where({type: 'goal', team: homefk}).pluck('elapsed').value();
    var awayGoals = _.chain(incidents).where({type: 'goal', team: awayfk}).pluck('elapsed').value();
    console.log('homeGoals', homeGoals);
    console.log('awayGoals', awayGoals);
    homeGoals = homeGoals.length? homeGoals : defaultHomeGoals;
    awayGoals = awayGoals.length? awayGoals : defaultAwayGoals;
    console.log('homeGoals', homeGoals);
    console.log('awayGoals', awayGoals);

    var homeShotsOnGoal = _.where(incidents, {type: 'shoton', team: homefk}).length || 0;
    var awayShotsOnGoal = _.where(incidents, {type: 'shoton', team: awayfk}).length || 0;

    var homeShotsOffGoal = _.where(incidents, {type: 'shotoff', team: homefk}).length || 0;
    var awayShotsOffGoal = _.where(incidents, {type: 'shotoff', team: awayfk}).length || 0;

    var homeCorner = _.where(incidents, {type: 'corner', team: homefk}).length || 0;
    var awayCorner = _.where(incidents, {type: 'corner', team: awayfk}).length || 0;

    var homeFoul = _.where(incidents, {type: 'foulcommit', team: homefk}).length || 0;
    var awayFoul = _.where(incidents, {type: 'foulcommit', team: awayfk}).length || 0;

    var homePos = +_.where(incidents, {subtype: 'possession'}).pop().homepos || 50;
    var awayPos = +_.where(incidents, {subtype: 'possession'}).pop().awaypos || 50;

    var homeYellowCard = _.where(incidents, {card_type: 'y', team: homefk}).length || 0;
    var awayYellowCard = _.where(incidents, {card_type: 'y', team: awayfk}).length || 0;

    var homeRedCard = _.where(incidents, {card_type: 'r', team: homefk}).length || 0;
    var awayRedCard = _.where(incidents, {card_type: 'r', team: awayfk}).length || 0;

    this.set('eventfk', event.eventfk);
    this.set('date', new Date(event.startdate));
    this.set('isFinished', event.status_type === "finished");
    this.set('type', type);

    this.set('awayGoals', awayGoals);
    this.set('awayCorner', awayCorner);
    this.set('awayFoul', awayFoul);
    this.set('awayPos', awayPos);
    this.set('awayRedCard', awayRedCard);
    this.set('awayShotsOffGoal', awayShotsOffGoal);
    this.set('awayShotsOnGoal', awayShotsOnGoal);
    this.set('awayYellowCard', awayYellowCard);

    this.set('homeGoals', homeGoals);
    this.set('homeCorner', homeCorner);
    this.set('homeFoul', homeFoul);
    this.set('homePos', homePos);
    this.set('homeRedCard', homeRedCard);
    this.set('homeShotsOffGoal', homeShotsOffGoal);
    this.set('homeShotsOnGoal', homeShotsOnGoal);
    this.set('homeYellowCard', homeYellowCard);

    var teamQuery = new Parse.Query("Team");
    teamQuery.containedIn('teamfk', [event.homefk, event.awayfk]);
    return teamQuery.find().then(function(teams) {
      this.set('home', _.find(teams, function(t) {
        return t.get('teamfk') === event.homefk;
      }));
      this.set('away', _.find(teams, function(t) {
        return t.get('teamfk') === event.awayfk;
      }));

      return this.save();
    }.bind(this));
  }
});
