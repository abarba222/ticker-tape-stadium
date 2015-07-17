import Ember from 'ember';

export default Ember.Route.extend({
   model: function(params) {
    return Ember.RSVP.hash({
      team: this.store.find('team', params.team_id),
      recent: this.store.findQuery('match', {where: {objectId: {Home: params.team_id}}})
      // You would need to use findQuery or a Cloud function
      // to only find the correct matches
      });
  },



  // var date = Date.parse('Mon Jul 13 2015 12:46:00 GMT-0400 (EDT)');
  //
  // function format(date) {
  //   date = new Date(date);
  //
  //   var year = date.getFullYear();
  //   var month = ('0' + (date.getMonth() + 1));
  //   var day = ('0' + date.getDate());
  //
  //   return month + "/" + day + "/" + year;
  // }
  // console.log(format(date));
});
