import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('team');
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

// App.TopStocksComponent = Ember.Component.extend(Ember.SortableMixin, {
//
//   actions: {
//     sortAge: function(){
//       // sort by age
//       if(this.get('sortProperties.0') == 'age') {
//         this.toggleProperty('sortAscending');
//       }
//       this.set('sortProperties', ['age']);
//     },
//     sortName: function(){
//       // sort by name
//       if(this.get('sortProperties.0') == 'name') {
//         this.toggleProperty('sortAscending');
//       }
//       this.set('sortProperties', ['name']);
//     }
//   }
//
// });
