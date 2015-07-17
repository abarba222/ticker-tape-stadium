import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    invalidateSession: function(){
      this.sendAction();
    },

    swap: function(one, two) {
      document.getElementById(navbox).addEventListner('click', function(e){
        swap('one', 'two');
      });
      document.getElementById(navbox).addEventListener('click', function(e){
        swap('two', 'one');
      });
    },
    // toggleTable: function() {
    //   var status = this.get('user-box-show');
    //
    //   if (status === 'table') {
    //     this.set("user-box-show", "table");
    //   document.getElementById("userbox").style.display="table";
    //   } else {
    //     this.set("user-box-show", "none");
    //     document.getElementById("userbox").style.display = "none";
    //   }
    // },

    toggleShow: function(){
      var show = this.get('nav-box-show');

      if(show === 'open'){
        this.set('nav-box-show', 'open');
        document.getElementById('navbox').style.display = 'open';
      } else {
        this.set('nav-box-show', 'closed');
        document.getElementById('navbox').style.display = 'none';
    }
  }
}
});
