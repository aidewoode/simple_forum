import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login","editor"],

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

  isCurrentUser: function() {
    return this.get("model.user_id").toString() === this.get("controllers.login.currentUser")
  }.property("controllers.login.currentUser", "model.user_id"),

  actions: {
    editPost: function() {
      this.set("controllers.editor.isCreateComment", false);

      this.set("controllers.editor.modalTitle", "Update your post");
      this.set("controllers.editor.createMode", "updatePost");
      this.set("controllers.editor.buttonContent", "Update");
      this.set("controllers.editor.buttonLoadContent", "Updating");

      this.set("controllers.editor.post", this.get("model"));

      // reset error message
      this.set("controllers.editor.hasError", false);

      this.set("controllers.editor.title", this.get("model.title"));
      this.set("controllers.editor.tag", this.get("model.tag"));

      Ember.$("textarea.post-editor").val(this.get("model.body"));

    }
  }
    

});
