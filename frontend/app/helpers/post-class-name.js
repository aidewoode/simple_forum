import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  let isTop = params[0];
  let isEssence = params[1];

  if (isTop) {
    return "top-post";
  } else if (isEssence) {
    return "essence-post";
  } else {
    return "";
  }
});
