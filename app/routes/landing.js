import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  model: function() {


    return Ember.RSVP.hash({
      teams: this.store.findQuery('team', {
        limit: 10,
        order: 'value',
        descending: 'value'
      }),

      matches: this.store.findQuery('match', {
        limit: 5,
        order: 'date'
      }),

      trendingUp: this.store.findQuery('team', {
        limit: 5,
        order: 'value',
        descending: 'value'
      }),

      trendingDown: this.store.findQuery('team', {
        limit: 5,
        order: 'value',
        ascending: 'value'
      }),


     });


  }
});
