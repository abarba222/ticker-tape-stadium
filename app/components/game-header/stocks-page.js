import Ember from 'ember';

export default Ember.Component.extend({

quantity: 0,

total: function(){
  return this.get('model.team.value') * Number(this.get('quantity'));
}.property("model.team.value", "quantity")


});
