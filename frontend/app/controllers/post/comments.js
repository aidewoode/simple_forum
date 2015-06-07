import Ember from "ember";

export default Ember.ArrayController.extend({
  needs: ["login","posts/new", "post"],

  sortProperties: ["created_at"],
  sortAscending: false,

  page: 1,
  postId: null,
  totalPages: null,

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


  actions: {
    transToCommentMode: function(atWho) {
      this.set("controllers.posts/new.isCreateComment", true);

      //reset error message.
      this.set("controllers.posts/new.hasError", false);
      this.set("controllers.posts/new.post", this.get("post"));

      if (Ember.isEmpty(atWho)) {

      //reset editor's input 
      Ember.$("textarea.comment-editor").val("");
      } else {

        // for the first time editor load, 
        // and the textarea element did't insert in DOM.
        // use posts.new controller to send the atWho value to 
        // custom-textarea view.
        this.set("controllers.posts/new.atWho", atWho);

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

      this.set("controllers.posts/new.atwhoItems", atwhoItems); 


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

        self.get("model").pushObjects(commentList);
        self.set("page", page);

        self.set("totalPages", response.meta.total_pages);
        btn.button("reset");
      });
    }

  }

});
