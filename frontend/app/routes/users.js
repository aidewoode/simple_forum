import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find("user", params.user_name);
  },

  serialize: function(model) {
    return {user_name: model.get("name")};
  }
});
