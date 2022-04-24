// ready事件

document.addEventListener("DOMContentLoaded",function(){
    var img = document.querySelector("img");
    getImgSize(img, function (size) {
        console.log(size);
    })
})

// console.log(document.readyState);
// document.addEventListener("DOMContentLoaded",function(){
//     console.log(document.readyState);
// });
// window.onload = function(){
//     console.log(document.readyState);
// }


// document.onreadystatechange = function () {
//     console.log(document.readyState);
   
// }

function getImgSize(img, callback) {
    if (img.width === 0 && img.height === 0) {
        img.onload = function () {
            callback({
                width: img.width,
                height: img.height
            })
        }
    } else {
        callback({
            width: img.width,
            height: img.height
        })
    }
}