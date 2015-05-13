import Ember from "ember";
import PagedRemoteArray from "ember-cli-pagination/remote/paged-remote-array";

export default Ember.Route.extend({
  model: function(params, transition) {
    var post_id = transition.params.post.id;
    return PagedRemoteArray.create({modelName: "comment",
                                   store: this.store,
                                   page: 1,
                                   perPage: 10,
                                   otherParams: {post_id: post_id}
    });
  }

});
