import Ember from "ember";

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller("application"),
  editorController: Ember.inject.controller("editor"),
  deleteConfirmController: Ember.inject.controller("delete-confirm"),

  isAuthenticated: Ember.computed.alias("applicationController.isAuthenticated"),

  isCurrentUser: function() {
    return this.get("model.user_id").toString() === this.get("applicationController.currentUserId");
  }.property("applicationController.currentUser", "model.user_id"),

  currentUser: Ember.computed.alias("applicationController.currentUser"),

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
  },
});
