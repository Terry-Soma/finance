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
        this.value = value
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
    return{
        addItem: function(type,description,value){
           var item,id;
            
           if(data.allItems[type].length === 0)id =1;
           else {
              id=  data.allItems[type][data.allItems[type].length -1 ].id +1;
           }

           if(type ==='inc'){
            item = new Income(id,description,value);
           } else{
               item = new Expense(id,description,value)

           }
            data.allItems[type].push(item);




        }
    }

})();

var appCtrl = (function (uiC, fnC) {
    var crtlAddItem = function () {

    var inp = uiCtrl.getInput();
    console.log(inp);
        financeCtrl.addItem(inp.type,inp.description,inp.value);
};
var setupEventListeners= function(){
    
var Dom = uiCtrl.getDomstr();
  document.querySelector(Dom.addBtn).addEventListener('click', function () {
    // data insert
    crtlAddItem();
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