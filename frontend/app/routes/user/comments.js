import Ember from "ember";

export default Ember.Route.extend({

  model: function(params, transition) {
    var user_id = transition.params.user.id;
    return this.store.find("comment", {page: 1, per_page: 10, user_id: user_id});
  },

  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("totalPages", this.store.metadataFor("comment").total_pages);
    controller.set("userId", this.paramsFor("user").id);

    // reset page property
    controller.set("page", 1);
  }
});
