import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    //return Ember.RSVP.hash({
      return this.store.findAll('team', params.length=5),

      this.store.findAll('match', params.length=5);
  //  });
  }
});
