import DS from "ember-data";
export default DS.Model.extend({
  read: DS.attr("boolean",{defaultValue: false}),
  atwho: DS.attr("boolean", {defaultValue: false}),
  user_name: DS.attr("string"),
  post_name: DS.attr("string"),
  created_at: DS.attr("date"),
  updated_at: DS.attr("date"),
  post_id: DS.attr("number"),

  user: DS.belongsTo("user"),
  comment: DS.belongsTo("comment", {async: true})

});
