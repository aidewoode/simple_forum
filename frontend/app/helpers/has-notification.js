import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  if (!Ember.isEmpty(params[0])) {
    return "hasNotification";
  } else {
    return "";
  }
});
