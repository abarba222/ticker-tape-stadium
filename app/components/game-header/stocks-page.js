import Ember from 'ember';

export default Ember.Component.extend({

quantity: 0,
isBuying: true,
// showBuy: true,
// showSell: true,


date: function(){
  var date = this.get('match.date');
  return  (moment(date).format("MMM Do YYYY"));

}.property('match.date'),

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
          alert("You don't own that many shares!");
        }
      }
    },

    buy: function(){
      this.set('isBuying', true);{
      // if(this.get('isBuying', true)){
      //   return document.getElementById("sell-color").style.color = "rgb(34, 34, 34)";
      // } else {
      //   return document.getElementById("buy-color").style.color = "rgb(34, 34, 34)";
      // }
    }
  },

    sell: function(){
      this.set('isBuying', false);{
      //   if(this.get('isBuying', false)){
      //     return document.getElementById("buy-color").style.color = "rgb(34, 34, 34)";
      //   } else {
      //     return document.getElementById("sell-color").style.color = "rgb(34, 34, 34)";
      // }
    }
  },

  //   toggleBuy: function(){
  //
  //     this.toggleProperty('showBuy');
  //     return true;
  // },
  //   toggleSell: function() {
  //     this.toggleProperty('showSell');
  //     return true;
  //   }

  },

});
