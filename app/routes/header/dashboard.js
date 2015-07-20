import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      teams: this.store.findQuery('team', {
        limit: 10,
        order: 'value'
      }),

      matches: this.store.findQuery('match', {
        limit: 5,
        order: 'date'
      })
     });

  }
});
