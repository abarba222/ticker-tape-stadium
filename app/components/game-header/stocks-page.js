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
    quantitySubmit: function(user){
      // user.set('model.team.objectId', user.set('model.share.quantity', user.get('model.user.username')));
      // user.save();

      var prevCapital = this.get('model.user.capital');

      if(this.get('total') <= prevCapital) {
        var prevQuantity = this.get('model.myShare.quantity') || 0;
        var newQuantity = Number(this.get('quantity'));

        var total = this.get('isBuying') ? prevQuantity + newQuantity : prevQuantity - newQuantity;

        this.set('model.myShare.quantity', total);
        this.get('model.myShare').save();
      } else {
        alert('No $');
      }

      // TODO function on Cloud for Share that reduces request.user.get('capital')
    },

    buy: function(){
      this.set('isBuying', true);
    },

    sell: function(){
      this.set('isBuying', false);
    }
  }
});
