import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  headers: {
    "X-Parse-Application-Id": "cuynRBSgSE61Pc3XOiblptLRUMiBQ3nq7phxjYEc",
    "X-Parse-REST-API-Key": "H1SByxa5a9OhRR4RxMF5zJxiYuRD7QiULtilUFJm"
  },

  host: 'https://api.parse.com/1/classes',
  pathForType: function(modelName) {
    var capitalize = Ember.String.capitalize(modelName);
    return capitalize;
  }
});
