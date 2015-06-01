import Ember from "ember";
export default Ember.ArrayController.extend({
  page: 1,
  userId: null,
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

      Ember.$.get("/comments?page=" + page + "&per_page=10&user_id=" + this.get("userId")).then(function(response) {

        self.store.pushMany("comment", response.comments);
        self.get("model").pushObjects(response.comments);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    }
  }

});
