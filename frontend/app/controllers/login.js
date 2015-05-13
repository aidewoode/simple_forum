import Ember from "ember";

export default Ember.Controller.extend({
  init: function() {
    this._super();
    if (Cookies.get("access_token")) {
      Ember.$.ajaxSetup({
        headers: {"Authorization": "Bearer " + Cookies.get("access_token")}
      });
    }
  },

  attemptedTransition: null,
  token: Cookies.get("access_token"),
  currentUser: Cookies.get("auth_user"),

  tokenChanged: function() {
    if (Ember.isEmpty(this.get("token"))) {
      Cookies.remove("access_token");
      Cookies.remove("auth_user");
    } else {
      Cookies.set("access_token", this.get("token"));
      Cookies.set("auth_user", this.get("currentUser"));
    }
  }.observes("token"),


  reset: function() {
    this.setProperties({
      email: null,
      password: null,
      token: null,
      currentUser: null
    });

    Ember.$.ajaxSetup({
      headers: { "Authorization": "Bearer none"}
    });
  },

  actions:{
    
    login: function() {
      var self = this;
      var attemptedTransition = this.get("attemptedTransition");
      var data = this.getProperties("email", "password");

      this.setProperties({
        email: null,
        password: null
      });

      Ember.$.post("/session", data).then(function(response) {
        Ember.$.ajaxSetup({
          headers: {"Authorization": "Bearer " + response.token.access_token}
        });

        var key = self.store.createRecord("token", {accessToken: response.token.access_token});

        self.store.find("user", response.token.user_id).then(function(user) {
          self.setProperties({
            token: response.token.access_token,
            currentUser: user.get("email")
          });

          key.set("user", user);
          key.save();
          
          user.get("tokens").pushObject(key);

          if (attemptedTransition) {
            attemptedTransition.retry();
            self.set("attemptedTransition", null);
          } else {
            self.transitionToRoute("index");
          }
        });
      }, function(error) {
        if (error.status === 401) {
          alert("wrong user or password");
        }
      });
                                         
    }
  }

});
