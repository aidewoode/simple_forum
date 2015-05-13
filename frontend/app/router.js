import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("posts", function() {
    this.route("new");
  });

  this.route("post",{path: "/post/:id"}, function() {
    this.route("comments" );
  });

  this.route("user", {path: "/user/:id"}, function() {
    this.route("posts");
    this.route("comments");
  });

  this.route("login");
  this.route("signup");
});
