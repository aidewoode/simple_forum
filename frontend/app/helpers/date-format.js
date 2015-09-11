import Ember from "ember";
/* global moment */

export default Ember.Helper.helper(function(params) {
  return moment(params[0]).startOf("hourse").fromNow();
});
