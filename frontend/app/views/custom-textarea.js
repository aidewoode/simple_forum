import Ember from "ember";

export default Ember.TextArea.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce("afterRender", this, this.afterRenderEvent);

  },

  afterRenderEvent: function() {
    var editor = new Simditor({
      textarea: Ember.$("#editor")
    });

    // fixed simditor toolbar's width don't compute in time ,
    // set the toolbar width to 100% maybe not a really good method to 
    // fixed the issue, When simditor update and also fixed the issue,
    // those code will don't need anymore.
    var element = Ember.$(".simditor-toolbar");
    element.css("width", "100%");
  }
});
