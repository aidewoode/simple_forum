import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("posts",{path: "/posts/:id"}, function() {
    this.route("comments" );
  });

  this.route("users", {path: "/users/:id"}, function() {
    this.route("posts");
    this.route("comments");
  });

  this.route("login");
  this.route("signup");
});
