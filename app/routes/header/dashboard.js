import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {


    return Ember.RSVP.hash({
      teams: this.store.findQuery('team', {
        limit: 10,
        order: '-value',
      }),

      matches: this.store.findQuery('match', {
        limit: 10,
        order: '-date'
      }),

      trendingUp: this.store.findQuery('team', {
        limit: 5,
        order: '-value'
      }),

      trendingDown: this.store.findQuery('team', {
        limit: 5,
        order: 'value'
      }),

    //   realValue: function(formatted, realValue){
    //     realValue = this.get('value'),
    //     formatted = parseFloat(realValue, 10).toFixed(2);
    //
    //   return '$' + Number(formatted);
    // }.property('value')
     });


  }
});
