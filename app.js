//Screen
var uiCtrl = (function () 
{
    var DOMstr = {
        inpType : ".add__type",
        inpDescription : ".add__description",
        inpValue : ".add__value",
        addBtn : ".add__btn"



    };
   return{
        getInput:function(){
            return{
                type: document.querySelector(DOMstr.inpType).value,
                description: document.querySelector(DOMstr.inpDescription).value,
                value : document.querySelector(DOMstr.inpValue).value
            }
        },
        getDomstr : function(){
            return DOMstr;
        }

   };
})();
// finance

var financeCtrl = (function (){
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = valuel
    };

    var Expense =function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc:0,
            exp: 0
        }
    };
})();

var appCtrl = (function (uiC, fnC) {
    var Dom = uiCtrl.getDomstr();
  var crtlAddItem = function () {

    console.log(uiCtrl.getInput());

};
var setupEventListeners= function(){
    
var Dom = uiCtrl.getDomstr();
  document.querySelector(Dom.addBtn).addEventListener("click", function () {
    // data insert

    //save inserted data
    // display data
    // analyze
    //
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === 13 || event.which === 13) {
      crtlAddItem();
    }
  });

};
return {
    init: function(){
        console.log("App started ...");
        setupEventListeners();
    }
};
})(uiCtrl, financeCtrl);
appCtrl.init();