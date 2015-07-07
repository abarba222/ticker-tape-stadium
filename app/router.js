import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('header', function() {
    this.route('portfolio');
  });
  this.route('portfolio');
});

export default Router;
