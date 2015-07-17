import DS from 'ember-data';

export default DS.Model.extend({
    date: DS.attr('date'),
    function(){
    new Date().format("%m/%d");
  },

    home: DS.belongsTo('team', { async: true }),
    homeGoals: DS.attr('number'),

    away: DS.belongsTo('team', { async: true }),
    awayGoals: DS.attr('number')
});
