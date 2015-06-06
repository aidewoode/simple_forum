import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["login","posts/new"],

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get("controllers.login.currentUser"));
  }.property("controllers.login.currentUser"),

});
