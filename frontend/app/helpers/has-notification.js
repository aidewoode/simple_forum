import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(notification) {
  if (!Ember.isEmpty(notification)) {
    return "hasNotification";
  } else {
    return "";
  }
});
