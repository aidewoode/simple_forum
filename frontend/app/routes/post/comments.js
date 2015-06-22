import Ember from "ember";

export default Ember.Route.extend({
  model: function(params, transition) {
    var post_id = transition.params.post.id;
    return this.store.find("comment", {page: 1, per_page: 10, post_id: post_id});
  },

  //In ember-data 1.0.0-beta.19+ longer support 
  //the pushObject ,unshiftObject and so on menthods to 
  //add Object to RecordArrays. 
  //So I use normal array to solve this problem.

  afterModel: function(comments) {
    var commentArray = [];
    commentArray.addObjects(comments);
    this.controllerFor("post/comments").set("commentArray", commentArray);
  },

  setupController: function(controller) {

    controller.set("totalPages", this.store.metadataFor("comment").total_pages);
    controller.set("postId", this.paramsFor("post").id);

    // reset page property
    controller.set("page", 1);
  }

});
