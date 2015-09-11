import Ember from "ember";

export default Ember.Route.extend({

  model: function(params, transition) {
    var user_id = transition.params.user.id;
    return this.store.query("comment", {page: 1, per_page: 10, user_id: user_id});
  },

  afterModel: function(comments) {
    this.controllerFor("user/comments").set("totalPages", comments.get("meta").total_pages);
  },

  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("userId", this.paramsFor("user").id);

    // reset page property
    controller.set("page", 1);
  }
});
