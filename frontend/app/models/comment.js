import DS from 'ember-data';

export default DS.Model.extend({
  body:      DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  post:      DS.belongsTo('post'),
  user:      DS.belongsTo('user')
});
