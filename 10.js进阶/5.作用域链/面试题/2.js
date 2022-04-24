var food = "rice";
var eat = function(){
    console.log(`eat ${food}`);
};
(function(){
    var food = "noddle";
    eat();//eat rice
})();                                                     