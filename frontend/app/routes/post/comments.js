import Ember from "ember";

export default Ember.Route.extend({
  model: function(params, transition) {
    var post_id = transition.params.post.id;
    return this.store.find("comment", {page: 1, per_page: 10, post_id: post_id});
  },

  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("totalPages", this.store.metadataFor("comment").total_pages);
    controller.set("postId", this.paramsFor("post").id);

    // reset page property
    controller.set("page", 1);
  }

});
