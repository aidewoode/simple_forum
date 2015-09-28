import Ember from "ember";

export default Ember.Component.extend({
  hasError: false,
  errorMessage: null,

  actions: {
    signup: function() {
      var self = this;
      var btn = Ember.$("#signupButton").button("loading");
      var user = this.get("applicationController").store.createRecord("user", {
        name: this.get("name"),
        email: this.get("email"),
        password: this.get("password"),
        password_confirmation: this.get("password_confirmation")
      });

      user.save().then(function(response) {
        user.set("password", null);
        user.set("password_confirmation", null);
        self.sendAction("action", response);
        btn.button("reset");
        Ember.$("#signupForm").modal("hide");
      }, function(error) {
        user.deleteRecord();
        // set error message
        self.set("errorMessage", error.errors[0].detail);
        self.set("hasError", true);
        btn.button("reset");
      });
    }
  }
});
