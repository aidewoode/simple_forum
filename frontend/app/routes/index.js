import Ember from "ember";

export default Ember.Route.extend({

  model: function() {
    return this.store.find("post", {page: 1, per_page: 10});
  },


  //In ember-data 1.0.0-beta.19+ longer support 
  //the pushObject ,unshiftObject and so on menthods to 
  //add Object to RecordArrays. 
  //So I use normal array to solve this problem.

  afterModel: function(posts) {
    var postArray = [];
    postArray.addObjects(posts);
    this.controllerFor("index").set("postArray", postArray);
  },


  setupController: function(controller) {
    controller.set("totalPages", this.store.metadataFor("post").total_pages);

    // reset page property
    controller.set("page", 1);
  }

});
