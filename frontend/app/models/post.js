import DS from "ember-data";
export default DS.Model.extend({
  title: DS.attr("string"),
  body: DS.attr("string"),
  created_at: DS.attr("date"),
  updated_at: DS.attr("date"),
  tag: DS.attr("string"),
  essence: DS.attr("boolean", {defaultValue: false}),
  top: DS.attr("boolean", {defaultValue: false}),
  last_reply_time: DS.attr("date"),

  comments: DS.hasMany("comment"),
  user: DS.belongsTo("user")
});
