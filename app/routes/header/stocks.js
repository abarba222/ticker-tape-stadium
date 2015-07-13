import Ember from 'ember';

export default Ember.Route.extend({
   model: function(params) {
    return Ember.RSVP.hash({
      team: this.store.find('team', params.team_id),
      // You would need to use findQuery or a Cloud function
      // to only find the correct matches
      recent: this.store.findAll('match')
    });
  }
});
