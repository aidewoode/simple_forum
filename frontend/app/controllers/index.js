import Ember from "ember"; 
import pagedArray from "ember-cli-pagination/computed/paged-array";

export default Ember.ArrayController.extend({
  sortProperties: ["last_reply_time"],
  sortAscending: false,


  queryParams: ["page", "perPage"],
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",

  page: 1,
  perPage: 10
}); 

