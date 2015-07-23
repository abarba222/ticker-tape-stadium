import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('team', {
    });
    // .then(function() {
    //   return Ember.RSVP.hash({
    //     teams: this.store.findQuery('team', {
    //       order: '-value'
    //     })
    //   });
    // });
    //this.store.findRecord('team', paramsObj.id)
    // return [
    //   {
    //     symbol: 'symbol',
    //     name: 'name',
    //     value: 'value',
    //     streak: 'streak'
    //   },
    //   {name: 'name'},
    //   {value: 'value'},
    //   {streak: 'streak'}
    // ];
  }
});

//App.TopStocksComponent = Ember.Component.extend(Ember.SortableMixin, {

//   actions: {
//     sortValue: function(){
//       // sort by value
//       if(this.get('sortProperties.0') === 'value') {
//         this.toggleProperty('sortAscending');
//       }
//       this.set('sortProperties', ['value']);
//     }
// //     sortName: function(){
// //       // sort by name
// //       if(this.get('sortProperties.0') == 'name') {
// //         this.toggleProperty('sortAscending');
// //       }
// //       this.set('sortProperties', ['name']);
// //     }
//  }
//
//  });
//     actions: {
//       sortValue: function(){
//         // sort by value
//       if(this.get('sortProperties.0') === 'value') {
//       this.toggleProperty('sortDescending');
//     }
//     this.set('sortProperties', ['value']);
//   }
// }
//order: 'value',
//sortAscending: false
