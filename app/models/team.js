import DS from 'ember-data';

export default DS.Model.extend({
  Teams: DS.attr('string'),
  symbol: DS.attr('string'),
  value: DS.attr('number'),// ('value').length()),
  streak: DS.attr('number'),
  rank: DS.attr('number'),
  Name: DS.attr('string'),
  twoMatchTrend: DS.attr('number')
});
