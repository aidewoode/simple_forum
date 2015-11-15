import DS from 'ember-data';

export default DS.Model.extend({
  title:         DS.attr('string'),
  body:          DS.attr('string'),
  tag:           DS.attr('string'),
  createdAt:     DS.attr('date'),
  updatedAt:     DS.attr('date'),
  commentsCount: DS.attr('number'),

  comments:  DS.hasMany('comment'),
  user:      DS.belongsTo('user')
});
