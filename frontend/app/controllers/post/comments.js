import Ember from "ember";
export default Ember.ArrayController.extend({
  needs: ["login","posts/new"],

  queryParams: ["page", "perPage"],
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

  page: 1,
  perPage: 10,

  actions: {
    transToCommentMode: function() {
      this.set("controllers.posts/new.isCreateComment", true);
      this.set("controllers.posts/new.hasError", false);
    }
  }

});
