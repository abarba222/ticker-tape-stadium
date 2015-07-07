import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('header', function() {
    this.route('portfolio');
    this.route('top-stocks');
    this.route('standings');
    this.route('stocks');
    this.route('dashboard');
    this.route('help');
  });
  this.route('portfolio');
});

export default Router;
