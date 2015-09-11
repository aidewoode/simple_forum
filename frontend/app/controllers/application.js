import Ember from "ember";

export default Ember.Controller.extend({
  loginController: Ember.inject.controller("login"),
  signupController: Ember.inject.controller("signup"),
  editorController: Ember.inject.controller("editor"),

  currentUser: function() {
    if (!Ember.isEmpty(this.get("loginController.currentUser"))) {
      return this.store.find("user", this.get("loginController.currentUser"));
    }
  }.property("loginController.currentUser"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("loginController.currentUser"));
  }.property("loginController.currentUser"),

  actions: {
    transToPostMode: function() {
      this.set("editorController.isCreateComment", false);

      this.set("editorController.modalTitle", "Create your new post");
      this.set("editorController.createMode", "createPost");
      this.set("editorController.buttonContent", "Create");
      this.set("editorController.buttonLoadContent", "Creating");

      // reset error message
      this.set("editorController.hasError", false);
      // reset editor's content
      this.set("editorController.tag", null);
      this.set("editorController.title", null);
      Ember.$("textarea.post-editor").val("");
    },

    logOut: function() {
      this.set("loginController.token", null);
      this.set("loginController.currentUser", null);
    },

    resetErrorMessage: function(item) {
      this.set(item +"Controller.hasError", false);
    }

  }
});
