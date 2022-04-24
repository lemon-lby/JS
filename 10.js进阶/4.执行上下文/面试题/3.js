console.log(foo);//fnc
var foo = "A";
console.log(foo);//"A"
var foo = function(){
    console.log("B");
}
console.log(foo);//fnb
foo();//b
function foo(){
    console.log("C");
}
console.log(foo);//fnb
foo();//b