import Ember from "ember";

export default Ember.Controller.extend({

  selectContent: ["test1", "test2", "test3", "test4"],
  
  actions: {
    createPost: function() {
     var post = this.store.createRecord("post", {
       title: this.get("title") ,
       body: this.get("postBody"),
       tag: this.get("tag")
     }); 

     post.save();
    }
    
  }
});
