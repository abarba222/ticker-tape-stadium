import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.createRecord('parseUser');
  },

  actions: {
    createUser: function(user) {
      user.save().then(function(){
        this.get('session').authenticate('authenticator:parse-token',{
          sessionToken: user.get('sessionToken')
        });
      }.bind(this));

      this.transitionTo('header.portfolio');
    }
  }
});
