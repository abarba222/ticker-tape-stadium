import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model: function() {
    return new Ember.RSVP.hash({
      myShares: this.store.findQuery('share', {
        where: {
          userId: {
            __type: "Pointer",
            className: "_User",
            objectId: this.get('session.currentUser.id')
          },
          
        }
      })
    });
  }
});
