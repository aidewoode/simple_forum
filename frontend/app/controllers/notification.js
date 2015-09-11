import Ember from "ember";

export default Ember.Controller.extend({
  loginController: Ember.inject.controller("login"),

  currentUser: function() {
    if (!Ember.isEmpty(this.get("loginController.currentUser"))) {
      return this.store.find("user", this.get("loginController.currentUser"));
    }
  }.property("loginController.currentUser"),

  actions: {
    transToPost: function(notification) {

      this.transitionToRoute("post.comments",notification.get("post_id"));

      notification.set("read", true);
      notification.save();
      Ember.$("#notificationCenter").modal("hide");
    },

    removeNoti: function(notification) {
      notification.destroyRecord();
    }
  }
});
