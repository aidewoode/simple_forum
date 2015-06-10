import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login", "signup", "editor"],

  currentUser: function() {
    if (!Ember.isEmpty(this.get("controllers.login.currentUser"))) {
      return this.store.find("user", this.get("controllers.login.currentUser"));
    }
  }.property("controllers.login.currentUser"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

  actions: {
    transToPostMode: function() {
      this.set("controllers.editor.isCreateComment", false);

      this.set("controllers.editor.modalTitle", "Create your new post");
      this.set("controllers.editor.createMode", "createPost");
      this.set("controllers.editor.buttonContent", "Create");
      this.set("controllers.editor.buttonLoadContent", "Creating");

      // reset error message
      this.set("controllers.editor.hasError", false);
      // reset editor's content
      this.set("controllers.editor.tag", null);
      this.set("controllers.editor.title", null);
      Ember.$("textarea.post-editor").val("");
    },

    logOut: function() {
      this.set("controllers.login.token", null); 
      this.set("controllers.login.currentUser", null);
    },

    resetErrorMessage: function(item) {
      this.set("controllers."+ item +".hasError", false);
    } 

  }
});
