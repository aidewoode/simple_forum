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
  commentsCount: DS.attr("number"),
  userAvatar: DS.attr("string"),
  postUserName: DS.attr("string"),
  lastCommentUserName: DS.attr("string"),

  comments: DS.hasMany("comment", {async: true}),
  user: DS.belongsTo("user", {async: true})
});
