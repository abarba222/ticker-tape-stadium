import Ember from 'ember';

export default Ember.Component.extend({
  date: function(){
    var date = this.get('match.date');
    return  (moment(date).format("MMM Do YYYY"));

  }.property('match.date')
});
