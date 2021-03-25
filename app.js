//Screen 
var uiCtrl= (function(){

})();
// finance

var financeCtrl = (function(){

})();

var appCtrl = (function(uiC,fnC){

    var crtlAddItem = function(){
console.log("jak");
    };

    document.querySelector('.add__btn').addEventListener('click',function(){
        
        // data insert 
crtlAddItem();

        //save inserted data 
        // display data
        // analyze 
        // 
    });

    document.addEventListener("keypress",function(event){
        if(event.key ===13 || event.which === 13){
         crtlAddItem();
        }
    

    });

})(uiCtrl, financeCtrl);