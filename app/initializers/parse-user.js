import DS from 'ember-data';
import ParseUser from 'ember-parse-adapter/models/parse-user';

export function initialize(){
  ParseUser.reopen({
    firstName: DS.attr('string'),
    lastName: DS.attr('string')
  });
}

export default {
  name: 'parse-user',
  initialize: initialize
};
