import Ember from 'ember';

export default Ember.Component.extend({

quantity: 0,
isBuying: true,

total: function(){
  return this.get('model.team.value') * Number(this.get('quantity'));
}.property("model.team.value", "quantity"),

// buy: function(){
//   return this.get('model.user.capital') - this.get('total');
// }.property("model.user.capital", "total"),
//
// sell: function(){
//   return this.get('model.user.capital') + this.get('total');
// }.property("model.user.capital", "total"),

// submit: function(){
//   return this.set('model.team.objectId') + this.set('quantity');
// }.property("model.team.objectId", "quantity")
  actions: {
    quantitySubmit: function(){
      if(this.get('isBuying')) {
        if(this.get('total') <= this.get('model.user.capital')) {
          this.sendAction('buy', this.get('model.team'), this.get('quantity'));
        } else {
          alert('Not enough $');
        }
      } else {
        if(this.get('quantity') <= this.get('model.myShare.quantity')) {
          this.sendAction('sell', this.get('model.team'), this.get('quantity'));
        } else {
          alert("You don't own that many shares");
        }
      }
    },

    buy: function(){
      this.set('isBuying', true);
    },

    sell: function(){
      this.set('isBuying', false);
    }
  },
});
