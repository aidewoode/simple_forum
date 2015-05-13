import Ember from "ember";
import PagedRemoteArray from "ember-cli-pagination/remote/paged-remote-array";

export default Ember.Route.extend({
  model: function(params, transition) {
    var user_id = transition.params.user.id;
    return PagedRemoteArray.create({modelName: "post",
                                   store: this.store,
                                   page: 1,
                                   perPage: 10,
                                   otherParams: {user_id: user_id}
    });
  },

});
