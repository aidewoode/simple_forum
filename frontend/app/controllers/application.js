import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login", "signup", "posts/new"],

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
      // reset error message
      this.set("controllers.posts/new.hasError", false);
    },

    logOut: function() {
      this.set("controllers.login.token", null); 
      this.set("controllers.login.currentUser", null);
    },

    resetErrorMessage: function(item) {
      this.set("controllers."+ item +".hasError", false);
    } 

  }
});
