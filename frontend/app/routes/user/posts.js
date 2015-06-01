import Ember from "ember";

export default Ember.Route.extend({
  model: function(params, transition) {
    var user_id = transition.params.user.id;
    return this.store.find("post", {page: 1, per_page: 10, user_id: user_id});
  },

  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("totalPages", this.store.metadataFor("post").total_pages);
    controller.set("userId", this.paramsFor("user").id);
    controller.set("page", 1);
  }

});
