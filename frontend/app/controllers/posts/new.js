import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["index", "post/comments", "post"],

  selectContent: ["test1", "test2", "test3", "test4"],

  isCreateComment: false,
  hasError: false,
  errorMessage: null,
  post: null,
  atwhoItems: null,
  atWho: null,

  actions: {
    mdPreview: function() {
      var inputContent = Ember.$("textarea.editor").val();
      var position = inputContent.indexOf("@");

      // replace atWho string to a link.
      while (position > -1 ) {
        var preChar = inputContent.charAt(position-1);
        if (preChar === "" || preChar === " "){
          var lastIndex = inputContent.indexOf(" ", position);
          var matchString = inputContent.slice(position+1, lastIndex);
          for (var i = 0; i < this.get("atwhoItems").length; i++) {
            if (matchString === this.get("atwhoItems")[i]["name"]) {
              inputContent = inputContent.replace("@"+matchString, "<a href=\"/user/" + this.get("atwhoItems")[i]["id"] + "/posts\">@ "+ matchString + "</a>");
            }
          }
          
        }
        position = inputContent.indexOf("@", position + 1)
      }

      var outputContent = marked(inputContent);
      Ember.$("div.editor-preview").html(outputContent);

    },
    
    createPost: function() {
      var self = this;
      var btn = Ember.$("#createButton").button("loading"); 
     var post = this.store.createRecord("post", {
       title: this.get("title") ,
       body: Ember.$("div.editor-preview").html(),
       tag: this.get("tag")
     }); 

     post.save().then(function(record) {
       btn.button("reset");
       Ember.$("#newPostForm").modal("hide");
       self.get("controllers.index.model").unshiftObject(record);
       self.get("controllers.index.model").popObject();

     }, function(error) {
       post.deleteRecord();
       self.set("errorMessage", error.responseJSON.errors);
       self.set("hasError", true);
       btn.button("reset");
     });
    },

    createComment: function() {
      var self = this;
      var btn = Ember.$("#createButton").button("loading"); 
      var comment = this.store.createRecord("comment", {
        body: Ember.$("div.editor-preview").html(),
        post: self.get("post"),
      });

      comment.save().then(function(record) {

        btn.button("reset");
        Ember.$("#newPostForm").modal("hide");
        self.get("controllers.post/comments.model").unshiftObject(record);


        //increase commentsCount's value 
        self.set("controllers.post.model.commentsCount", self.get("controllers.post.model.commentsCount") + 1);

        // when a post's commentsCount less than 10, 
        // don't need to remove the last comment
        // to insure have current pagination for the backend. 
        if (self.get("controllers.post.model.commentsCount") > 10) {

          self.get("controllers.post/comments.model").popObject();

          //when a post's commentsCount is 11 and the totalPages didn't change.
          //set the comments's totalPages to 2, let the user can load next page.
          if (self.get("controllers.post/comments.totalPages") === 1) {
            self.set("controllers.post/comments.totalPages", 2);
          }
        }

      },function(error) {
        comment.deleteRecord();
        self.set("errorMessage", error.responseJSON.errors);
        self.set("hasError", true);
        btn.button("reset");
      });
    },
  }
});
