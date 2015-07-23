import Ember from 'ember';

export function toDollar(cents) {
  return (cents < 0 ? '-' : '') + '$' + (Math.abs(cents) / 100).toFixed(2);
}

export default Ember.HTMLBars.makeBoundHelper(toDollar);
