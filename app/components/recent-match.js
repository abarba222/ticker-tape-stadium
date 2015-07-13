import Ember from 'ember';

export default Ember.Component.extend({
  date: function(){
    var date = this.get('match.date');
    // do something here to make it look right
    return date;
  }.property('match.date')
});
