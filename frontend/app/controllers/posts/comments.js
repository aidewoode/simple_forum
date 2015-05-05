import Ember from "ember";
import pagedArray from "ember-cli-pagination/computed/paged-array";

export default Ember.ArrayController.extend({
  queryParams: ["page", "perPage"],

  page: 1,
  perPage: 10,

  pagedContent: pagedArray("content", {pageBinding: "page", perPageBinding: "perPage"}),

  totalPagesBinding: "pagedContent.totalPages"

});
