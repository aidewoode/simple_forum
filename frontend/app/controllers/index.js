import Ember from "ember";

export default Ember.Controller.extend({

  page: 1,
  totalPages: null,
  postArray: null,

  isEnd: function() {
    return this.get("page") === this.get("totalPages");
  }.property("page", "totalPages"),

  actions: {
    loadMore: function() {
      var page = this.get("page") + 1;
      var self = this;

      var btn = Ember.$(".load-next-button").button("loading");

      Ember.$.get("/posts?page=" + page + "&per_page=10").then(function(response) {
        self.store.pushMany("post", response.posts);
        self.get("postArray").pushObjects(response.posts);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    }
  }
});
