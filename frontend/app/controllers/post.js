import Ember from "ember";

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller("application"),

  isAuthenticated: Ember.computed.alias("applicationController.isAuthenticated"),

  isCurrentUser: function() {
    return this.get("model.user_id").toString() === this.get("applicationController.currentUserId");
  }.property("applicationController.currentUser", "model.user_id"),

  currentUser: Ember.computed.alias("applicationController.currentUser"),

  actions: {
    editPost: function() {
      this.get("applicationController").set("createMode","updatePost");
      this.get("applicationController"). set("createItem", this.get("model"));
    },
  },
});
