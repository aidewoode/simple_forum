import Ember from "ember";

export default Ember.Controller.extend({
  needs: "login",

  currentUser: function() {
    if (!Ember.isEmpty(this.get("controllers.login.currentUser"))) {
      return this.store.find("user", this.get("controllers.login.currentUser"));
    }
  }.property("controllers.login.currentUser"),

  actions: {
    transToPost: function(notification) {

      this.transitionToRoute("post.comments",notification.get("comment").get("post"));

      notification.set("read", true);
      notification.save();
      Ember.$("#notificationCenter").modal("hide");
    },

    removeNoti: function(notification) {
      notification.destroyRecord();
    } 

  }
});
