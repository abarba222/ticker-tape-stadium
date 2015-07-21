import Ember from 'ember';

export default Ember.Route.extend({
   model: function(params) {
    return Ember.RSVP.hash({
      user: this.get('session.currentUser'),
      team: this.store.find('team', params.team_id),
      recent: this.store.findQuery('match', {
        where: {
          $or: [
            {
              home: {
                __type: "Pointer",
                className: "Team",
                objectId: params.team_id
              }
            },
            {
              away: {
                __type: "Pointer",
                className: "Team",
                objectId: params.team_id
              }
            }
          ]
        }
      }),
      myShare: this.store.findQuery('share', {
        where: {
          userId: {
            __type: "Pointer",
            className: "_User",
            objectId: this.get('session.currentUser.id')
          },
          teamSelected: {
            __type: "Pointer",
            className: "Team",
            objectId: params.team_id
          }
        }
      }).then(function(shares){
        return Ember.get(shares, 'firstObject');
      })
      // You would need to use findQuery or a Cloud function
      // to only find the correct matches
    }).then(function(model) {
      console.log(model);
      if(!model.myShare) {
        model.myShare = this.store.createRecord('share', {
          teamSelected: model.team,
          userId: this.get('session.currentUser')
        });
      }
      return model;
    }.bind(this));
  },

  actions: {
    buy: function(team, quantity) {
      this.runCloud('buyShares', {quantity: quantity, teamId: team.id}).then(function(response){
        this.modelFor(this.routeName).myShare.set('quantity', response.result.quantity);
      }.bind(this));
    },
    sell: function(team, quantity) {
      this.runCloud('sellShares', {quantity: quantity, teamId: team.id}).then(function(response){
        this.modelFor(this.routeName).myShare.set('quantity', response.result.quantity);
      }.bind(this));
    }
  },

  runCloud: function(func, params) {
    var adapter = this.store.adapterFor('application');
    return adapter.ajax("https://api.parse.com/1/functions/" + func, "POST", {
      data: params
    });
  }



  // var date = Date.parse('Mon Jul 13 2015 12:46:00 GMT-0400 (EDT)');
  //
  // function format(date) {
  //   date = new Date(date);
  //
  //   var year = date.getFullYear();
  //   var month = ('0' + (date.getMonth() + 1));
  //   var day = ('0' + date.getDate());
  //
  //   return month + "/" + day + "/" + year;
  // }
  // console.log(format(date));
});
