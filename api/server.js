/* globals process, require */
var Parse = require('parse').Parse,
    _ = require('lodash'),
    express = require('express'),
    // axios = require('axios'),
    app = express(),
    PORT = process.env.PORT || 3000;

Parse.initialize(
  'cuynRBSgSE61Pc3XOiblptLRUMiBQ3nq7phxjYEc',
  'iRB1slCezFHDGvB5Gs7IyJ53e1dmusLfDVN1UTyU');

var eventsResponse = require('./events.json');
var incidentsResponse = require('./incidents.json');

app.get('/sync/:timestamp', function(req, res) {
  // var timestamp = req.params.timestamp;
  // axios.get('http://json.mx-api.enetscores.com/live_data/livescore/1/0/?_=' + timestamp)
  //   .then(function(response) {
      syncMatches(eventsResponse.i).then(function(){
        console.log(arguments);
        res.send("OK");
      });
    // });
});

app.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});

var Match = Parse.Object.extend({
  className: "Match",

  // TODO: type
  syncData: function(data) {

      data.homefk = 9825;
      data.awayfk = 8659;

      var homeScore = data.results[1].r[1];
      var awayScore = data.results[2].r[1];

      var defaultHomeGoals = Array.apply(null, Array(homeScore)).map(Number.prototype.valueOf,0);
      var defaultAwayGoals = Array.apply(null, Array(awayScore)).map(Number.prototype.valueOf,0);

      var homeGoals = _.chain(incidentsResponse.i).where({type: 'goal', team: data.homefk}).pluck('elapsed').value();
      var awayGoals = _.chain(incidentsResponse.i).where({type: 'goal', team: data.awayfk}).pluck('elapsed').value();
      homeGoals = homeGoals.length? homeGoals : defaultHomeGoals;
      awayGoals = awayGoals.length? awayGoals : defaultAwayGoals;

      var homeShotsOnGoal = _.where(incidentsResponse.i, {type: 'shoton', team: data.homefk}).length || 0;
      var awayShotsOnGoal = _.where(incidentsResponse.i, {type: 'shoton', team: data.awayfk}).length || 0;

      var homeShotsOffGoal = _.where(incidentsResponse.i, {type: 'shotoff', team: data.homefk}).length || 0;
      var awayShotsOffGoal = _.where(incidentsResponse.i, {type: 'shotoff', team: data.awayfk}).length || 0;

      var homeCorner = _.where(incidentsResponse.i, {type: 'corner', team: data.homefk}).length || 0;
      var awayCorner = _.where(incidentsResponse.i, {type: 'corner', team: data.awayfk}).length || 0;

      var homeFoul = _.where(incidentsResponse.i, {type: 'foulcommit', team: data.homefk}).length || 0;
      var awayFoul = _.where(incidentsResponse.i, {type: 'foulcommit', team: data.awayfk}).length || 0;

      var homePos = _.where(incidentsResponse.i, {subtype: 'possession'}).pop().homepos || 50;
      var awayPos = _.where(incidentsResponse.i, {subtype: 'possession'}).pop().awaypos || 50;

      var homeYellowCard = _.where(incidentsResponse.i, {card_type: 'y', team: data.homefk}).length || 0;
      var awayYellowCard = _.where(incidentsResponse.i, {card_type: 'y', team: data.awayfk}).length || 0;

      var homeRedCard = _.where(incidentsResponse.i, {card_type: 'r', team: data.homefk}).length || 0;
      var awayRedCard = _.where(incidentsResponse.i, {card_type: 'r', team: data.awayfk}).length || 0;

      this.set('eventfk', data.eventfk);
      this.set('date', new Date(data.startdate));
      this.set('isFinished', data.status_type === "finished");
      this.set('type', '');

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
      teamQuery.containedIn('teamfk', [data.homefk, data.awayfk]);
      return teamQuery.find().then(function(teams) {
        this.set('home', _.find(teams, function(t) {
          return t.get('teamfk') === data.homefk;
        }));
        this.set('away', _.find(teams, function(t) {
          return t.get('teamfk') === data.awayfk;
        }));

        // return this.save();
        return Parse.Promise.as();
      }.bind(this));
  }
});

function syncMatches(events) {
  if(events.length === 0) { return Parse.Promise.resolve(); }
  var teamQuery = new Parse.Query("Team");
  return teamQuery.find().then(function(teams) {
    var teamIds = _.chain(teams).pluck('attributes').pluck('teamfk').value();
    var promises = events.filter(function(event) {
      return _.contains(teamIds, event.homefk) || _.contains(teamIds, event.awayfd);
    })
    .map(function(event){
      var matchQuery = new Parse.Query(Match);
      matchQuery.equalTo('eventfk', event.eventfk);
      return matchQuery.first().then(function(match) {
        if(!match) { match = new Match(); }
        return match.syncData(event);
      });
    });

    return Parse.Promise.when.apply(Parse.Promise, promises);
  });
}

