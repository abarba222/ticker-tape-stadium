import Ember from 'ember';

export default Ember.Component.extend({
  showNav: false,

  actions: {
    invalidateSession: function(){
      this.sendAction('invalidateSession');
      console.log('hi');
    },


    HideContent: function(d) {
      document.getElementById(d).style.display="none";
    },
    ShowContent: function(d) {
      document.getElementById(d).style.display="block";
    },
    ReverseDisplay: function(d) {
      if (document.getElementById(d).style.display === "none") {document.getElementById(d).style.display = "block";}
      else {document.getElementById(d).style.display = "none";}
    },

  // {{#em-accordion configName='bs' selected-idx=1}}
  //   {{em-accordion-item title="abarba222"}}
  //     <h2 class="userbox-username">abarba</h2>
  //     <h3 class="userbox-capital">$100,000</h3>
  //     <h3 class="userbox-status">Amateur Investor</h3>
  //   {{/em-accordion-item}}

    // {{#em-accordion-item title="+"}}
    //   <a class="navigate-dashboard">Dashboard</a>
    //   <a class="navigate-portfolio">Portfolio</a>
    //   <a class="navigate-top-stocks">Top Stocks</a>
    //   <a class="navigate-help">Help</a>
    // {{/em-accordian-item}}


    // showOneHideTwo: function(){
    //       document.getElementById("showbox-one").style.display = "block";
    //       document.getElementById("show-box-two").style.display = "none";
    //       document.getElementById('show-box-one').onclick = function(){showOneHideTwo(); return false;}
    //   },
    //
    // showTwoHideOne: function(){
    //       document.getElementById("show-box-one").style.display = "none";
    //       document.getElementById("show-box-two").style.display = "block";
    //       document.getElementById('show-box-two').onclick = function(){showTwoHideOne(); return false;}
    //   },
      // document.getElementById('show-box-one').onclick = function(){showOneHideTwo(); return false;}
      // document.getElementById('show-box-two').onclick = function(){showTwoHideOne(); return false;}

    // toggleTable: function() {
    //   var status = this.get('user-box-show');
    //
    //   if (status === 'table') {
    //     this.set("user-box-show", "table");
    //   document.getElementById("userbox-two").onclick = function(){toggleTable(); return false;};
    //   } else {
    //     this.set("user-box-show", "none");
    //     document.getElementById("userbox-one").onclick = function(){toggleTable(); return false;};
    //   }
    // },

    toggleShow: function(){

      this.toggleProperty('showNav');
    //   var show = this.get('nav-box-show');
    //
    //   if(show === 'open'){
    //     this.set('nav-box-show', 'open');
    //     document.getElementById('navbox').style.display = 'block';
    //   } else {
    //     this.set('nav-box-show', 'closed');
    //     document.getElementById('navbox').style.display = 'none';
    // }
  }
}


});
