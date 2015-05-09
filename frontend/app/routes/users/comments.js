import Ember from "ember";
import PagedRemoteArray from "ember-cli-pagination/remote/paged-remote-array";

export default Ember.Route.extend({
  model: function(params, transition) {
    var user_name = transition.params.users.user_name;
    return PagedRemoteArray.create({modelName: "comment",
                                   store: this.store,
                                   page: 1,
                                   perPage: 10,
                                   otherParams: {user_name: user_name}
    });
  }
});
