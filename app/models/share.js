import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  teamSelected: DS.belongsTo('team', { async: true }),
  userId: DS.belongsTo('parseUser', { async: true }),
  profitLoss: function() {
    return this.get('quantity') * this.get('teamSelected.twoMatchTrend');
  }.property('quantity', 'teamSelected.twoMatchTrend')
});
