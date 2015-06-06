import Ember from "ember";

export default Ember.TextArea.extend({

  atwhoItems: null,

  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce("afterRender", this, this.afterRenderEvent);
  },

  afterRenderEvent: function() {
    if (!Ember.isEmpty(this.get("atwhoItems"))) {
      Ember.$("textarea.comment-editor").atwho({
        at: "@",
        insertTpl: "[${name}](/user/${id}/posts)",
        data: this.get("atwhoItems")
      });
    }
  }
});
