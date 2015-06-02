import Ember from "ember";

export default Ember.Route.extend({

  model: function() {
    return this.store.find("post", {page: 1, per_page: 10});
  },

  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("totalPages", this.store.metadataFor("post").total_pages);

    // reset page property
    controller.set("page", 1);
  }

});
