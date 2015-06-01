import Ember from "ember";

export default Ember.ArrayController.extend({
  needs: ["login","posts/new"],
  page: 1,
  postId: null,
  totalPages: null,

  isEnd: function() {
    if (this.get("page") === this.get("totalPages")) {
      return true;
    } else {
      return false;
    }
  }.property("page", "totalPages"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),


  actions: {
    transToCommentMode: function() {
      this.set("controllers.posts/new.isCreateComment", true);
      this.set("controllers.posts/new.hasError", false);
    },

    loadMore: function() {
      var page = this.get("page") + 1;
      var self = this;

      var btn = Ember.$(".load-next-button").button("loading");

      Ember.$.get("/comments?page=" + page + "&per_page=10&post_id=" + this.get("postId")).then(function(response) {

        self.store.pushMany("comment", response.comments);
        self.get("model").pushObjects(response.comments);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    }

  }

});
