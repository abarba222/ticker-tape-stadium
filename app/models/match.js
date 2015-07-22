import DS from 'ember-data';

export default DS.Model.extend({

    date: DS.attr('date'),//, new Date(Date.parse(mm/dd/yyyy))),

    home: DS.belongsTo('team', { async: true }),
    homeGoals: DS.attr(['array']),

    away: DS.belongsTo('team', { async: true }),
    awayGoals: DS.attr(['array']) //['awayGoals'].length())
});
