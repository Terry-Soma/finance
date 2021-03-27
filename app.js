//Screen
var uiCtrl = (function () 
{
    var DOMstr = {
        inpType : ".add__type",
        inpDescription : ".add__description",
        inpValue : ".add__value",
        addBtn : ".add__btn",
        incomeList : '.income__list',
        expenseList : '.expenses__list',
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expeseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container"



    };
   return{
        getInput:function(){
            return{
                type: document.querySelector(DOMstr.inpType).value,
                description: document.querySelector(DOMstr.inpDescription).value,
                value :parseInt(document.querySelector(DOMstr.inpValue).value)
            };
        },
        getDomstr : function(){
            return DOMstr;
        },
        clearFields: function(){
            var fields = document.querySelectorAll(DOMstr.inpDescription+ ", "+ DOMstr.inpValue);
// list to array
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(el, index,array){
                el.value ="";
                
            });
            fieldsArr[0].focus();

        },
        tusviigUzuuleh: function(tusuv){
            document.querySelector(DOMstr.tusuvLabel).textContent = tusuv.tusuv;
            if(tusuv.huvi !== 0){
                document.querySelector(DOMstr.percentageLabel).textContent = tusuv.huvi+"%";}
           else {
                document.querySelector(DOMstr.percentageLabel).textContent = tusuv.huvi+"%";
           }
            document.querySelector(DOMstr.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstr.expeseLabel).textContent = tusuv.totalExp;
        


        },
        deleteListItem: function(id){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);


        },
        addListItem: function(item,type){
            // inc or exp 
            var html,list;
            if(type ==='inc'){
                list = DOMstr.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$Description$</div><div class="right clearfix"><div class="item__value">$value$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';

            }else{
                list = DOMstr.expenseList;
                html = ' <div class="item clearfix" id="exp-%id%"><div class="item__description">$Description$</div><div class="right clearfix"><div class="item__value">$value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            html= html.replace('%id%',item.id);
            html = html.replace('$Description$',item.description);
            html = html.replace('$value$',item.value);

            document.querySelector(list).insertAdjacentHTML("beforeend",html);


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

    var calculateTotal = function(type){
       var sum = 0;
        data.allItems[type].forEach(function(el){
            sum += el.value;

        });
        data.totals[type] =sum;
    }
    var data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc:0,
            exp: 0
        },
        tusuv : 0,
        huvi: 0
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

            return item;




        },

        Analyze : function(){
            calculateTotal('inc');
            calculateTotal('exp');
            data.tusuv = data.totals.inc - data.totals.exp;

            data.huvi = Math.round((data.totals.exp / data.totals.inc)*100);
        },

        Display: function(){
            return {
                tusuv : data.tusuv,
                huvi : data.huvi,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp


            };
        },
        seeData:function(){
            return data;
        },
        deleteItem :function(type, id,){
            var ids = data.allItems[type].map(function(el){
                return el.id;
            });

            var index = ids.indexOf(id);
            if(index !== -1){
                data.allItems[type].splice(index,1);
            }


        }
    };

})();

var appCtrl = (function (uiC, fnC) {
    var crtlAddItem = function () {

        
    var inp = uiCtrl.getInput();
    if(inp.description !== "" && inp.value !== ""){

     var item = financeCtrl.addItem(inp.type,inp.description,inp.value);
     console.log(inp);
     uiCtrl.addListItem(item,inp.type);
     uiCtrl.clearFields();


     financeCtrl.Analyze();

    var tusuv =  financeCtrl.Display();

    uiCtrl.tusviigUzuuleh(tusuv);
    console.log(tusuv);


    }
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

  document.querySelector(Dom.containerDiv).addEventListener('click',function(event){
    var id  = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
    if(id){
        var arr = id.split("-");
        var type = arr[0];
        var itemId =parseInt(arr[1]);

        financeCtrl.deleteItem(type,itemId);


        uiCtrl.deleteListItem(id);

    }
  });

};
return {
    init: function(){

        console.log("App started ...");
        uiCtrl.tusviigUzuuleh({
            tusuv:0,
            huvi:0,
            totalInc:0,
            totalExp:0
        });
        setupEventListeners();
    }
};
})(uiCtrl, financeCtrl);
appCtrl.init();