import Ember from "ember";

export default Ember.Controller.extend({

  attemptedTransition: null,
  token: Cookies.get("access_token"),
  currentUser: Cookies.get("auth_user"),
  errorMessage: "Wrong password or email",
  hasError: false,

  tokenChanged: function() {
    if (Ember.isEmpty(this.get("token"))) {
      Cookies.remove("access_token", {path: "/"});
      Cookies.remove("auth_user", {path: "/"});
    } else {
      Cookies.set("access_token", this.get("token", {path: "/"}));
      Cookies.set("auth_user", this.get("currentUser", {path: "/"}));
    }
  }.observes("token"),


  reset: function() {
    this.setProperties({
      email: null,
      password: null,
      token: null,
      currentUser: null
    });
  },

  actions:{
    
    login: function() {
      var btn = Ember.$("#loginButton").button("loading");
      var self = this;
      var attemptedTransition = this.get("attemptedTransition");
      var data = this.getProperties("email", "password");

      this.setProperties({
        email: null,
        password: null
      });

      Ember.$.post("/session", data).then(function(response) {

        self.store.find("user", response.token.user_id).then(function(user) {
          self.setProperties({
            token: response.token.access_token,
            currentUser: user.get("id")
          });


          if (attemptedTransition) {
            attemptedTransition.retry();
            self.set("attemptedTransition", null);
          } else {
            self.transitionToRoute("index");
          }

          btn.button("reset");
          Ember.$("#loginForm").modal("hide");
        });
      }, function(error) {

        btn.button("reset");
        if (error.status === 401) {
          self.set("hasError", true);
        }
      });

                                         
    }
  }

});
