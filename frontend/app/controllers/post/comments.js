import Ember from "ember";
export default Ember.ArrayController.extend({
  needs: "posts/new",

  queryParams: ["page", "perPage"],
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",

  page: 1,
  perPage: 10,

  actions: {
    transToCommentMode: function() {
      this.set("controllers.posts/new.isCreateComment", true);
    }
  }

});
