/* globals Parse */
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.afterSave("Match", function(request){
  var match = request.object;
  Parse.Promise.when(
    match.get('home') && match.get('home').fetch(),
    match.get('away') && match.get('away').fetch()
  ).then(function(home, away){
    var homeValue = 0;
    console.log(homeValue);
    var awayValue = 0;

    match.get('homeGoals').forEach(function(goalMins){
      homeValue += (100 + (90 - goalMins));
    });
    console.log(homeValue);

    match.get('awayGoals').forEach(function(goalMins){
      awayValue += (100 + (90 - goalMins));
    });

    homeValue = (homeValue - awayValue);
    awayValue = (awayValue - homeValue);
    console.log(homeValue);

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
    }

    homeValue += (match.get('homeShotsOnGoal')*5) - (match.get('homeShotsOffGoal'));
    console.log(homeValue);

    homeValue += (match.get('homeCorner') * 3) - (match.get('homeYellowCard') * 15) - (match.get('homeRedCard') * 35) - (match.get('homeFoul'));
    console.log(homeValue);

    homeValue += (match.get('homePos') - match.get('awayPos'))*2;
    console.log(homeValue);
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
