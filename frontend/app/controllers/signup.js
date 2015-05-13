import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    signup: function() {
      var user = this.store.createRecord("user", {
        name: this.get("name"),
        email: this.get("email"),
        password: this.get("password"),
        password_confirmation: this.get("password_confirmation")
      });

      user.save();
    } 
  }
});
