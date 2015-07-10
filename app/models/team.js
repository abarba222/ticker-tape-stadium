import DS from 'ember-data';

export default DS.Model.extend({
  Teams: DS.attr('string'),
  symbol: DS.attr('string'),
  value: DS.attr('number'),
  streak: DS.attr('number')
});
