import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(isTop, options) {
  if (isTop) {
    return "top-post";
  } else if (options.hash["isEssence"]) {
    return "essence-post";
  } else {
    return "";
  }
});
