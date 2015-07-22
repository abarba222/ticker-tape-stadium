import Ember from 'ember';

export default Ember.Route.extend({
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

      trendingUp: [
        // limit:5,
        // order: 'value'
      ],

      trendingDown: [
        // limit: 5,
        // order: 'value'
      ],

    //   realValue: function(formatted, realValue){
    //     realValue = this.get('value'),
    //     formatted = parseFloat(realValue, 10).toFixed(2);
    //
    //   return '$' + formatted;
    // }.property('value')
     });


  }
});
