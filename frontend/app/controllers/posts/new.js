import Ember from "ember";

export default Ember.Controller.extend({

  selectContent: ["test1", "test2", "test3", "test4"],
  isCreateComment: false,
  
  actions: {
    createPost: function() {
      var btn = Ember.$("#createButton").button("loading"); 
     var post = this.store.createRecord("post", {
       title: this.get("title") ,
       body: this.get("contentBody"),
       tag: this.get("tag")
     }); 

     post.save().then(function() {
       btn.button("reset");
     }, function() {
       post.deleteRecord();
       btn.button("reset");
     });
    },

    createComment: function() {
      var comment = this.store.createRecord("comment", {
        body: this.get("contentBody")
      });

      comment.save();
    },
  }
});
