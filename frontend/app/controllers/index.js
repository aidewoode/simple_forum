import Ember from "ember"; 

export default Ember.ArrayController.extend({
  sortProperties: ["last_reply_time"],
  sortAscending: false,

  page: 1,
  totalPages: null,

  isEnd: function() {
    if (this.get("page") === this.get("totalPages")) {
      return true;
    } else {
      return false;
    }
  }.property("page", "totalPages"),

  actions: {
    loadMore: function() {
      var page = this.get("page") + 1;
      var self = this;

      var btn = Ember.$(".load-next-button").button("loading");

      Ember.$.get("/posts?page=" + page + "&per_page=10").then(function(response) {
        self.store.pushMany("post", response.posts);
        self.get("model").pushObjects(response.posts);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    }
  }
}); 

