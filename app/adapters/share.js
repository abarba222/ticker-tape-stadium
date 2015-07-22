import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function() {
    return this._super.apply(this, arguments) + "?include=teamSelected";
  }
});
