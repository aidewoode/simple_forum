import Ember from "ember";

export default Ember.Controller.extend({
  needs: "login",

  currentUser: function() {
    return this.get("controller.login.currentUser");
  }.property("controller.login.currentUser"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controller.login.currentUser"));
  }.property("controller.sessions.currentUser")
});
