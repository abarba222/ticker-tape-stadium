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
    this.route('stocks', {path: 'stocks/:team_id'});
    this.route('dashboard');
    this.route('help');
    this.route('userbox');
  });

  this.route('landing', {path: ''});

  this.route('sessions', function() {
    this.route('create');
  });

  this.route('users', function() {
    this.route('create', {path: 'header/help'});
    this.route('show', {path: ':parse-user_id'});
  });
  this.route('users.current', {path: 'header/portfolio'});
});

export default Router;
