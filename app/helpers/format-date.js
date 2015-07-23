/* globals moment */
import Ember from 'ember';

export function formatDate(params) {
  return  (moment(params[0]).format("MMM Do YYYY"));
}


export default Ember.HTMLBars.makeBoundHelper(formatDate);
