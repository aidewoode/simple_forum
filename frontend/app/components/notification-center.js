import Ember from "ember";

export default Ember.Component.extend({
  sendActionName: null,

  actions: {
    transToPost: function(notification) {
      this.set("sendActionName", "transRoute");
      this.sendAction("sendActionName", "post.comments", notification.get("post_id"));

      notification.set("read", true);
      notification.save();
      Ember.$("#notificationCenter").modal("hide");
    },

    removeNoti: function(notification) {
      notification.destroyRecord();
    }
  }
});
