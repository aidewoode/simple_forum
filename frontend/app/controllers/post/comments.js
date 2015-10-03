import Ember from "ember";

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller("application"),
  postController: Ember.inject.controller("post"),

  page: 1,
  postId: null,
  totalPages: null,
  commentArray: null,

  post: function() {
    return this.get("postController.model");
  }.property("postController.model"),

  commentsCount: function() {
    return this.get("postController.model.commentsCount");
  }.property("postController.model.commentsCount"),

  isEnd: function() {
    return this.get("page") === this.get("totalPages");
  }.property("page", "totalPages"),

  isAuthenticated: Ember.computed.alias("applicationController.isAuthenticated"),
  currentUser: Ember.computed.alias("applicationController.currentUser"),


  actions: {
    transToCommentMode: function() {
      this.get("applicationController").set("createMode", "createComment");
      this.get("applicationController").set("createItem", this.get("post"));
    },

    loadMore: function() {
      var page = this.get("page") + 1;
      var self = this;

      var btn = Ember.$(".load-next-button").button("loading");

      Ember.$.get("/comments?page=" + page + "&per_page=10&post_id=" + this.get("postId")).then(function(response) {

        self.store.pushMany("comment", response.comments);

        var commentList = [];
        response.comments.forEach(function(item) {
          var commentObject = Ember.Object.create(item);
          commentList.push(commentObject);
        });

        self.get("commentArray").pushObjects(commentList);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    }
  }
});
