import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      team: this.store.findQuery('team', {
        limit: 10,
        order: 'value'
      }),

      match: this.store.findQuery('match', {
        limit: 5,
        order: 'date'
      })
    });

  }
});
