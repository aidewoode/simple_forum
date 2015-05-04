import Ember from "ember"; 
export default Ember.ArrayController.extend({
  sortProperties: ["last_reply_time"],
  sortAscending: false,
}); 

