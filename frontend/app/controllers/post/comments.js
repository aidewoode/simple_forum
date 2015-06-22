import Ember from "ember";

export default Ember.ArrayController.extend({
  needs: ["login","editor", "post", "delete-confirm"],

  page: 1,
  postId: null,
  totalPages: null,
  commentArray: null,

  post: function() {
    return this.get("controllers.post.model");
  }.property("controllers.post.model"),

  commentsCount: function() {
    return this.get("controllers.post.model.commentsCount");
  }.property("controllers.post.model.commentsCount"),

  isEnd: function() {
    if (this.get("page") === this.get("totalPages")) {
      return true;
    } else {
      return false;
    }
  }.property("page", "totalPages"),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

  currentUser: function() {
    if (this.get("isAuthenticated")) {
      return this.store.find("user", this.get("controllers.login.currentUser"));
    }
  }.property("isAuthenticated","controllers.login.currentUser"),


  actions: {
    transToCommentMode: function(atWho) {
      this.set("controllers.editor.isCreateComment", true);

      this.set("controllers.editor.modalTitle", "Create your new comment");
      this.set("controllers.editor.createMode", "createComment");
      this.set("controllers.editor.buttonContent", "Create");
      this.set("controllers.editor.buttonLoadContent", "Creating");

      //reset error message.
      this.set("controllers.editor.hasError", false);
      this.set("controllers.editor.post", this.get("post"));

      if (Ember.isEmpty(atWho)) {

      //reset editor's input 
      Ember.$("textarea.comment-editor").val("");
      } else {

        // for the first time editor load, 
        // and the textarea element did't insert in DOM.
        // use posts.new controller to send the atWho value to 
        // custom-textarea view.
        this.set("controllers.editor.atWho", atWho);

        Ember.$("textarea.comment-editor").val("@" + atWho + " ");
      }

      var atwhoUserId = [];
      var atwhoUserName = [];
      var atwhoItems = [];
      this.get("model").forEach(function(item) {
        atwhoUserId.push(item.get("user_id"));
        atwhoUserName.push(item.get("commentUserName"));
      }); 

      atwhoUserId = atwhoUserId.uniq();
      atwhoUserName = atwhoUserName.uniq();


      for (var i = 0; i < atwhoUserId.length; i++) {
        atwhoItems.push({name: atwhoUserName[i], id: atwhoUserId[i] });
      }

      this.set("controllers.editor.atwhoItems", atwhoItems); 


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

    deleteComment: function(comment) {
      this.set("controllers.delete-confirm.deleteMode", "deleteComment");
      this.set("controllers.delete-confirm.comment", comment);
    },

  }
});
