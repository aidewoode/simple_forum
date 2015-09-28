import Ember from "ember";

export default Ember.Controller.extend({
  loginController: Ember.inject.controller("login"),
  editorController: Ember.inject.controller("editor"),
  postController: Ember.inject.controller("post"),
  deleteConfirmController: Ember.inject.controller("delete-confirm"),

  page: 1,
  postId: null,
  totalPages: null,
  commentArray: null,

  post: function() {
    return this.get("postController.model");
  }.property("postController.model"),

  commentsCount: function() {
    return this.get("postController.model.commentsCount");
  }.property("postController.model.commentsCount"),

  isEnd: function() {
    return this.get("page") === this.get("totalPages");
  }.property("page", "totalPages"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("loginController.currentUser"));
  }.property("loginController.currentUser"),

  currentUser: function() {
    if (this.get("isAuthenticated")) {
      return this.store.find("user", this.get("loginController.currentUser"));
    }
  }.property("isAuthenticated","loginController.currentUser"),


  actions: {
    transToCommentMode: function(atWho) {
      this.set("editorController.isCreateComment", true);

      this.set("editorController.modalTitle", "Create your new comment");
      this.set("editorController.createMode", "createComment");
      this.set("editorController.buttonContent", "Create");
      this.set("editorController.buttonLoadContent", "Creating");

      //reset error message.
      this.set("editorController.hasError", false);
      this.set("editorController.post", this.get("post"));

      if (Ember.isEmpty(atWho)) {

      //reset editor's input
      Ember.$("textarea.comment-editor").val("");
      } else {

        // for the first time editor load,
        // and the textarea element did't insert in DOM.
        // use posts.new controller to send the atWho value to
        // custom-textarea view.
        this.set("editorController.atWho", atWho);

        Ember.$("textarea.comment-editor").val("@" + atWho + " ");
      }

      var atwhoUserId = [];
      var atwhoUserName = [];
      var atwhoItems = [];
      this.get("commentArray").forEach(function(item) {
        atwhoUserId.push(item.get("user_id"));
        atwhoUserName.push(item.get("commentUserName"));
      });

      atwhoUserId = atwhoUserId.uniq();
      atwhoUserName = atwhoUserName.uniq();


      for (var i = 0; i < atwhoUserId.length; i++) {
        atwhoItems.push({name: atwhoUserName[i], id: atwhoUserId[i] });
      }

      this.set("editorController.atwhoItems", atwhoItems);


        Ember.$("textarea.comment-editor").atwho({
          at: "@",
          data: atwhoItems
        });
    },

    loadMore: function() {
      var page = this.get("page") + 1;
      var self = this;

      var btn = Ember.$(".load-next-button").button("loading");

      Ember.$.get("/comments?page=" + page + "&per_page=10&post_id=" + this.get("postId")).then(function(response) {

        self.store.pushMany("comment", response.comments);

        var commentList = [];
        response.comments.forEach(function(item) {
          var commentObject = Ember.Object.create(item);
          commentList.push(commentObject);
        });

        self.get("commentArray").pushObjects(commentList);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    },

    setDeleteMode: function(mode, item) {
      this.set("deleteMode", mode);
      this.set("deleteItem", item);
    }
  }
});
