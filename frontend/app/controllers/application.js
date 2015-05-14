import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login", "posts/new"],

  currentUser: function() {
    return this.get("controllers.login.currentUser");
  }.property("controllers.login.currentUser"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.sessions.currentUser"),

  actions: {
    transToPostMode: function() {
      this.set("controllers.posts/new.isCreateComment", false);
    }
  }
});
