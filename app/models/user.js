import DS from 'ember-data';

export default DS.Model.extend({
  url:DS.attr('string'),
  capital: DS.attr('number'),
  worth: DS.attr('number')
});
