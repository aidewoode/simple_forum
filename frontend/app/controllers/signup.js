import Ember from "ember";

export default Ember.Controller.extend({
  hasError: false,

  actions: {
    signup: function() {
      var self = this;
      var btn = Ember.$("#signupButton").button("loading");
      var user = this.store.createRecord("user", {
        name: this.get("name"),
        email: this.get("email"),
        password: this.get("password"),
        password_confirmation: this.get("password_confirmation")
      });

      user.save().then(function() {
        btn.button("reset");
        Ember.$("signupForm").modal("hidden");
      }, function() {
        user.deleteRecord();
        btn.button("reset");
      });
    } 
  }
});
