import Ember from "ember";

export default Ember.Controller.extend({
  needs: "index",

  selectContent: ["test1", "test2", "test3", "test4"],
  isCreateComment: false,
  hasError: false,
  errorMessage: null,
  post: null,
  
  actions: {
    createPost: function() {
      var self = this;
      var btn = Ember.$("#createButton").button("loading"); 
     var post = this.store.createRecord("post", {
       title: this.get("title") ,
       body: Ember.$("#editor").val(),
       tag: this.get("tag")
     }); 

     post.save().then(function() {
       btn.button("reset");
       Ember.$("#newPostForm").modal("hide");

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
        body: Ember.$("#editor").val(),
        post: self.get("post"),
      });

      comment.save().then(function() {
        btn.button("reset");
        Ember.$("#newPostForm").modal("hide");
      },function(error) {
        comment.deleteRecord();
        self.set("errorMessage", error.responseJSON.errors);
        self.set("hasError", true);
        btn.button("reset");
      });
    },
  }
});
