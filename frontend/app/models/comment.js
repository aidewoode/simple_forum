import DS from "ember-data";
export default DS.Model.extend({
  body: DS.attr("string"),
  created_at: DS.attr("date"),
  updated_at: DS.attr("date"),
  userAvatar: DS.attr("string"),
  commentUserName: DS.attr("string"),

  post: DS.belongsTo("post"),
  user: DS.belongsTo("user"),
  notifications: DS.hasMany("notification")
  
});
