import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login","posts/new"],

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

  actions: {
    transToCommentMode: function(post) {
      this.set("controllers.posts/new.isCreateComment", true);
      // reset error message
      this.set("controllers.posts/new.hasError", false);

      console.log(post);
      this.set("controllers.posts/new.post", post);
    },

  }
});
