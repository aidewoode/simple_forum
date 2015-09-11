import Ember from "ember";

export default Ember.Controller.extend({
  postCommentsController: Ember.inject.controller("post.comments"),

  deleteMode: null,
  post: null,
  comment: null,

  actions: {
    deleteResource: function(mode) {
      this.send(mode);
    },

    deletePost: function() {
      var self = this;
      var btn = Ember.$("#deleteButton").button("loading");
      var post = this.get("post");

      post.destroyRecord().then(function() {
        btn.button("reset");
        Ember.$("#delete-confirm").modal("hide");
        self.transitionToRoute("index");
      });
    },

    deleteComment: function() {
      var self = this;

      var btn = Ember.$("#deleteButton").button("loading");
      var commentArray = this.get("postCommentsController.commentArray");
      var comment = this.get("comment");

      comment.destroyRecord().then(function() {
        btn.button("reset");
        Ember.$("#delete-confirm").modal("hide");
        commentArray.removeObject(comment);
        var commentsCount = self.get("postCommentsController.commentsCount");
        self.set("postCommentsController.commentsCount", commentsCount -1);
      });
    },
  }
});
