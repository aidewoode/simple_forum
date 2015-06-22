import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["post/comments"],

  deleteMode: null,
  post: null,
  comment: null,

  actions: {
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
      var commentArray = this.get("controllers.post/comments.commentArray");
      var comment = this.get("comment");

      comment.destroyRecord().then(function() {
        btn.button("reset");
        Ember.$("#delete-confirm").modal("hide");
        commentArray.removeObject(comment);
        var commentsCount = self.get("controllers.post/comments.commentsCount");
        self.set("controllers.post/comments.commentsCount", commentsCount -1);

      });
    
    },
  }
});
