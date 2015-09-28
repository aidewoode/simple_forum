import Ember from "ember";

export default Ember.Component.extend({
  sendActionName: null,

  actions: {
    deleteResource: function() {
      this.send(this.get("mode"));
    },

    deletePost: function() {
      var self = this;
      var btn = Ember.$("#deleteButton").button("loading");
      var post = this.get("item");
      this.set("sendActionName", "transRoute");

      post.destroyRecord().then(function() {
        btn.button("reset");
        Ember.$("#delete-confirm").modal("hide");
        self.sendAction("sendActionName", "index");
      });
    },

    deleteComment: function() {
      var self = this;

      var btn = Ember.$("#deleteButton").button("loading");
      var comment = this.get("item");

      comment.destroyRecord().then(function() {
        btn.button("reset");
        Ember.$("#delete-confirm").modal("hide");
        self.sendAction("mode");
      });
    }
  }
});
