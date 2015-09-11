import Ember from "ember";

export default Ember.Route.extend({

  model: function() {
    return this.store.query("post", {page: 1, per_page: 10});
  },


  //In ember-data 1.0.0-beta.19+ no longer support 
  //the pushObject ,unshiftObject and so on menthods to 
  //add Object to RecordArrays. 
  //So I use normal array to solve this problem.

  afterModel: function(posts) {
    var postArray = [];
    postArray.addObjects(posts);
    this.controllerFor("index").set("postArray", postArray);
    this.controllerFor("index").set("totalPages", posts.get("meta").total_pages);
  },


  setupController: function(controller) {
    // reset page property
    controller.set("page", 1);
  }

});
