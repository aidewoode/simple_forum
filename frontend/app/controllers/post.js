import Ember from "ember";

export default Ember.Controller.extend({
  loginController: Ember.inject.controller("login"),
  editorController: Ember.inject.controller("editor"),
  deleteConfirmController: Ember.inject.controller("delete-confirm"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("loginController.currentUser"));
  }.property("loginController.currentUser"),

  isCurrentUser: function() {
    return this.get("model.user_id").toString() === this.get("loginController.currentUser");
  }.property("loginController.currentUser", "model.user_id"),

  currentUser: function() {
    if (this.get("isAuthenticated")) {
      return this.store.find("user", this.get("loginController.currentUser"));
    }
  }.property("isAuthenticated","loginController.currentUser"),

  actions: {
    editPost: function() {
      this.set("editorController.isCreateComment", false);

      this.set("editorController.modalTitle", "Update your post");
      this.set("editorController.createMode", "updatePost");
      this.set("editorController.buttonContent", "Update");
      this.set("editorController.buttonLoadContent", "Updating");

      this.set("editorController.post", this.get("model"));

      // reset error message
      this.set("editorController.hasError", false);

      this.set("editorController.title", this.get("model.title"));
      this.set("editorController.tag", this.get("model.tag"));

      Ember.$("textarea.post-editor").val(this.get("model.body"));

    },

    deletePost: function(post) {
      this.set("deleteConfirmController.deleteMode", "deletePost");
      this.set("deleteConfirmController.post", post);
    }

  },
});
