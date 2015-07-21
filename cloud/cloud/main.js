/* globals Parse */
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

/*
 * Team beforeSave written by Jake Smith
 */
Parse.Cloud.beforeSave("Team", function(request, response) {
  var team = request.object;

  if(team.dirty('value')) {
    var newValue, history, twoMatchTrend, threeMatchTrend, oneAgo, twoAgo;

    newValue = team.get('value');

    history = team.get('valueHistory') || [];
    oneAgo = history[history.length - 1] === undefined ? newValue : history[history.length - 1].value;
    console.log('oneAgo ' +  oneAgo );
    twoAgo = history[history.length - 2] === undefined ? newValue : history[history.length - 2].value;
    console.log('twoAgo ' +  twoAgo );

    twoMatchTrend = newValue - oneAgo;
    console.log('twoMatchTrend ' +  twoMatchTrend );
    threeMatchTrend = newValue - twoAgo;
    console.log('threeMatchTrend ' +  threeMatchTrend );

    team.set('twoMatchTrend', twoMatchTrend);
    team.set('threeMatchTrend', threeMatchTrend);

    history.push({date: Date.now(), value: newValue});
    team.set('valueHistory', history);
  }

  response.success();
});

Parse.Cloud.afterSave("Match", function(request){
  var match = request.object;

  var fetchHomeAndAway = [];
  fetchHomeAndAway.push(match.get('home') ? match.get('home').fetch() : Parse.Promise.as());
  fetchHomeAndAway.push(match.get('away') ? match.get('away').fetch() : Parse.Promise.as());

  Parse.Promise.when(fetchHomeAndAway).then(function(home, away){
    var homeValue = 0;
    // console.log('1:' + homeValue);

    var awayValue = 0;
    // console.log('1:' + awayValue);

    match.get('homeGoals').forEach(function(goalMins){
      homeValue += (100 + (90 - goalMins));
    });
    // console.log('2:' + homeValue);

    match.get('awayGoals').forEach(function(goalMins){
      awayValue += (100 + (90 - goalMins));
    });
    // console.log('2:' + awayValue);

    homeValue = (homeValue - awayValue);
    awayValue = (awayValue - homeValue);
    // console.log('3:' + homeValue);
    // console.log('3:' + awayValue);


    if (home && away && match.get('type') === 'league'){
      var homeScore = match.get("homeGoals").length;
      var awayScore = match.get("awayGoals").length;
      if(homeScore > awayScore) {
        homeValue = homeValue * 1.1 + 20;
        awayValue = awayValue * 1.1 - 20;
      }else if(homeScore < awayScore){
        homeValue = homeValue * 1.2 - 40;
        awayValue = awayValue * 1.2 + 40;
      }else if(homeScore === awayScore){
        awayValue = awayValue + 25;
      }
      // console.log('4:' + homeValue);
      // console.log('4:' + awayValue);

    }

    if (home && away && match.get('type') === 'league'){
      var homeAdjustment = adjustmentForRank(home.get('rank'));
      var awayAdjustment = adjustmentForRank(away.get('rank'));
      var adjustment = 0;
      if(homeAdjustment > awayAdjustment) {
        adjustment = homeAdjustment - awayAdjustment;
        homeValue = homeValue * (1 + adjustment);
        awayValue = awayValue * (1 - adjustment);
      } else if(awayAdjustment > homeAdjustment) {
        adjustment = awayAdjustment - homeAdjustment;
        awayValue = awayValue * (1 + adjustment);
        homeValue = homeValue * (1 - adjustment);
      }
      // console.log('5:' + homeValue);
      // console.log('5:' + awayValue);

    }

    homeValue += (match.get('homeShotsOnGoal')*5) - (match.get('homeShotsOffGoal'));
    awayValue += (match.get('awayShotsOnGoal')*5) - (match.get('awayShotsOffGoal'));

    // console.log('6:' + homeValue);
    // console.log('6:' + awayValue);


    homeValue += (match.get('homeCorner') * 3) - (match.get('homeYellowCard') * 15) - (match.get('homeRedCard') * 35) - (match.get('homeFoul'));
    awayValue += (match.get('awayCorner') * 3) - (match.get('awayYellowCard') * 15) - (match.get('awayRedCard') * 35) - (match.get('awayFoul'));
    // console.log('7:' + homeValue);
    // console.log('7:' + awayValue);

    homeValue += (match.get('homePos') - match.get('awayPos'))*2;
    awayValue += (match.get('awayPos') - match.get('homePos'))*2;
    console.log('8:' + homeValue);
    console.log('8:' + awayValue);

    home && home.set('value', Math.round(home.get('value') + homeValue));
    away && away.set('value', Math.round(away.get('value') + awayValue));
    var saveHomeAndAway = [];
    saveHomeAndAway.push(home ? home.save() : Parse.Promise.as());
    saveHomeAndAway.push(away ? away.save() : Parse.Promise.as());
    return Parse.Promise.when(saveHomeAndAway);
  });
});

function adjustmentForRank(rank) {
  if(rank >= 1 && rank <= 4) {
    return 0;
  } else if(rank >= 5 && rank <= 8) {
    return 0.125;
  } else if(rank >= 9 && rank <= 12){
    return 0.25;
  }else if (rank >= 13 && rank <= 16){
    return 0.375;
  }else if (rank >= 17 && rank <= 20){
    return 0.5;
  }
}

var Share = Parse.Object.extend("Share");

Parse.Cloud.define("buyShares", function(request, response) {
  Parse.Cloud.useMasterKey();

  var user = request.user;
  var quantity = Number(request.params.quantity);
  var teamId = request.params.teamId;

  var teamQuery = new Parse.Query("Team");
  teamQuery.get(teamId).then(function(team) {
    var prevCapital = user.get('capital');
    var total = team.get('value') * quantity;
    if(total <= prevCapital) {
      var shareQuery = new Parse.Query("Share");
      shareQuery.equalTo('userId', user);
      shareQuery.equalTo('teamSelected', team);
      shareQuery.first().then(function(share){
        if(share) {
          var prevQuanity = share.get('quantity');
          share.set('quantity', prevQuanity + quantity);
        } else {
          share = new Share({
            teamSelected: team,
            userId: user,
            quantity: quantity
          });
        }

        var newCapital = prevCapital - total;
        user.set('capital', Math.round(newCapital));

        Parse.Promise.when(
          user.save(),
          share.save()
        ).then(function(){
          response.success({quantity: share.get('quantity')});
        }, function(error){
          response.error(JSON.stringify(error));
        });
      });
    } else {
      response.error("Not enough capital");
    }
  });
});

Parse.Cloud.define("sellShares", function(request, response) {
  Parse.Cloud.useMasterKey();

  var user = request.user;
  var quantity = Number(request.params.quantity);
  var teamId = request.params.teamId;

  var teamQuery = new Parse.Query("Team");
  teamQuery.get(teamId).then(function(team) {
    var prevCapital = user.get('capital');
    var total = team.get('value') * quantity;

    var shareQuery = new Parse.Query("Share");
    shareQuery.equalTo('userId', user);
    shareQuery.equalTo('teamSelected', team);
    shareQuery.first().then(function(share){
      if(share && (share.get('quantity') >= quantity)) {
        var prevQuanity = share.get('quantity');
        share.set('quantity', prevQuanity - quantity);
      } else {
        return response.error("Not enough shares to sell");
      }

      var newCapital = prevCapital + total;
      user.set('capital', Math.round(newCapital));

      Parse.Promise.when(
        user.save(),
        share.save()
      ).then(function(){
        response.success({quantity: share.get('quantity')});
      }, function(error){
        response.error(JSON.stringify(error));
      });
    });
  });
});

Parse.Cloud.define('resetTeams', function(request, response){
  var query = new Parse.Query("Team");
  query.each(function(team){
    team.set('value', 10000);
    team.set('valueHistory', []);
    team.set('twoMatchTrend', 0);
    team.set('threeMatchTrend', 0);
    return team.save();
  }).then(function(){
    response.success("Done");
  });
});
