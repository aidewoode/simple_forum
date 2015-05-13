import Ember from "ember";
export default Ember.ArrayController.extend({

  queryParams: ["page", "perPage"],
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",

  page: 1,
  perPage: 10

});
