import Ember from "ember";

export default Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce("afterRender", this, this.afterRenderEvent);
  },

  afterRenderEvent: function() {
      Ember.$("textarea.comment-editor").atwho({
        at: "@",
        data: this.get("atwhoItems")
      });

      if (!Ember.isEmpty(this.get("atWho"))) {
        Ember.$("textarea.comment-editor").val("@" + this.get("atWho") + " ");
      }
  }
});
