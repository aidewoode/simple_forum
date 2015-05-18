import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login", "posts/new"],

  currentUser: function() {
    if (!Ember.isEmpty(this.get("controllers.login.currentUser"))) {
      return this.store.find("user", this.get("controllers.login.currentUser"));
    }
  }.property("controllers.login.currentUser"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

  actions: {
    transToPostMode: function() {
      this.set("controllers.posts/new.isCreateComment", false);
    },

    logOut: function() {
      this.set("controllers.login.token", null); 
      this.set("controllers.login.currentUser", null);
    },

    resetErrorMessage: function() {
      this.set("controllers.login.hasError", false);
    }
  }
});
