import Ember from "ember";

export default Ember.Controller.extend({

  selectContent: ["test1", "test2", "test3", "test4"],
  isCreateComment: false,
  hasError: false,
  errorMessage: null,
  
  actions: {
    createPost: function() {
      var self = this;
      var btn = Ember.$("#createButton").button("loading"); 
     var post = this.store.createRecord("post", {
       title: this.get("title") ,
       body: this.get("contentBody"),
       tag: this.get("tag")
     }); 

     post.save().then(function() {
       btn.button("reset");
       Ember.$("signupForm").modal("hidden");
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
        body: this.get("contentBody")
      });

      comment.save().then(function() {
        btn.button("reset");
        Ember.$("signupForm").modal("hidden");
      },function(error) {
        comment.deleteRecord();
        self.set("errorMessage", error.responseJSON.errors);
        self.set("hasError", true);
        btn.button("reset");
      });
    },
  }
});
