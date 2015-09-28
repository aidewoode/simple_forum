import Ember from "ember";

export default Ember.Component.extend({
  attemptedTransition: null,
  errorMessage: "Wrong password or email",
  hasError: false,

  actions: {
    login() {
      var btn = Ember.$("#loginButton").button("loading");
      var self = this;
      var attemptedTransition = this.get("attemptedTransition");
      var data = this.getProperties("email", "password");
      console.log(this.get("store"));

      this.setProperties({
        email: null,
        password: null
      });

      Ember.$.post("/session", data).then(function(response) {
        self.sendAction("action", response, attemptedTransition);
        btn.button("reset");
        Ember.$("#loginForm").modal("hide");
      }, function(error) {

        btn.button("reset");
        if (error.status === 401) {
          self.set("hasError", true);
        }
      });

    }
  }

})
