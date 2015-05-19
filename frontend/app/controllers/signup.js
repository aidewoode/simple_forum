import Ember from "ember";

export default Ember.Controller.extend({
  hasError: false,
  errorMessage: null,

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
      }, function(error) {
        user.deleteRecord();

        // set error message
        self.set("errorMessage", error.responseJSON.errors);
        self.set("hasError", true);
        btn.button("reset");
      });
    } 
  }
});
