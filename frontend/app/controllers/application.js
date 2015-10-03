import Ember from "ember";
/* global Cookies */

export default Ember.Controller.extend({
  // need change, don't need controller anymore.
  postCommentsController: Ember.inject.controller("post.comments"),
  indexController: Ember.inject.controller("index"),
  //
  token: Cookies.get("access_token"),
  currentUserId: Cookies.get("auth_user"),

  tokenChanged: function() {
    if (Ember.isEmpty(this.get("token"))) {
      Cookies.remove("access_token", {path: "/"});
      Cookies.remove("auth_user", {path: "/"});
    } else {
      Cookies.set("access_token", this.get("token", {path: "/"}));
      Cookies.set("auth_user", this.get("currentUserId", {path: "/"}));
    }
  }.observes("token"),

  currentUser: function() {
    if (!Ember.isEmpty(this.get("currentUserId"))) {
      return this.store.find("user", this.get("currentUserId"));
    }
  }.property("currentUserId"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("currentUserId"));
  }.property("currentUserId"),

  actions: {
    login: function(response, attemptedTransition) {
      var self = this;
      this.store.find("user", response.token.user_id).then(function(user) {
        self.setProperties({
          token: response.token.access_token,
          currentUserId: user.get("id")
        });

        if (attemptedTransition) {
          attemptedTransition.retry();
        } else {
          self.transitionTo("index");
        }
      });
    },

    signup: function(response) {
      console.log(response.get("data"));
      this.setProperties({
        token: response.get("data").access_token,
        currentUserId: response.get("data").user_id
      });
    },

    logOut: function() {
      this.set("token", null);
      this.set("currentUserId", null);
    },

    deleteComment: function() {
      var commentArray = this.get("postCommentsController.commentArray");
      var commentsCount = self.get("postCommentsController.commentsCount");
      commentArray.removeObject(comment);
      self.set("postCommentsController.commentsCount", commentsCount - 1);
    },

    transRoute: function(route, option) {
      if (typeof option == "undefined") {
        this.transitionToRoute(route);
      } else {
        this.transitionToRoute(route, option);
      }
    },

    transToPostMode: function() {
      this.set("createMode", "createPost");
    }
  }

  //actions: {
  //  transToPostMode: function() {
  //    this.set("editorController.isCreateComment", false);

  //    this.set("editorController.modalTitle", "Create your new post");
  //    this.set("editorController.createMode", "createPost");
  //    this.set("editorController.buttonContent", "Create");
  //    this.set("editorController.buttonLoadContent", "Creating");

  //    // reset error message
  //    this.set("editorController.hasError", false);
  //    // reset editor's content
  //    this.set("editorController.tag", null);
  //    this.set("editorController.title", null);
  //    Ember.$("textarea.post-editor").val("");
  //  },

  //  logOut: function() {
  //    this.set("loginController.token", null);
  //    this.set("loginController.currentUser", null);
  //  },

  //  resetErrorMessage: function(item) {
  //    this.set(item +"Controller.hasError", false);
  //  }

  //}
});
