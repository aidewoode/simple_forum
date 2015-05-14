import Ember from "ember";

export default Ember.Controller.extend({
  needs: "posts/new",

  actions: {
    transToCommentMode: function() {
      this.set("controllers.posts/new.isCreateComment", true);
    }
  }
});
