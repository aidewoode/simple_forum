import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(post) {
  if (post.get("top")) {
    return "top-post";
  } else if (post.get("essence")) {
    return "essense-post";
  } else {
    return "";
  }
});
