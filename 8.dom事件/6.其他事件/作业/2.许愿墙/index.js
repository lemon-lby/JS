var container = document.querySelector(".container");
var wallDiv = document.querySelector(".container .main .wall");
var btn = document.querySelector("button");
var inp = document.querySelector("input");
var zIndex = 1;
var moveDiv = [];
var config = {
    height: 200,
    width: 200,
    left: 0,
    top: 0
}

function getRandom(min, max) {
    return Math.floor(parseInt(Math.random() * (max - min) + min));
}

function initWishDiv() {
    config.dom.style.height = config.height + "px";
    config.dom.style.width = config.width + "px";
    config.dom.style.backgroundColor = `rgb(${getRandom(100,200)},${getRandom(100,200)},${getRandom(100,200)})`;
    config.dom.style.display = "inline-block";
    config.dom.style.position = "absolute";
    config.dom.style.cursor = "move";
    config.dom.classList.add("move");
    config.dom.style.left = getRandom(0, 1300) + "px";
    config.dom.style.top = getRandom(0, 500) + "px";
    config.dom.style.border = "1px solid black";
    config.dom.innerHTML = inp.value;
    // config.dom.style.overflow = "scroll";
    return config.dom;
}
btn.addEventListener("click", function () {
    if (!inp.value) {
        return;
    }
    config.dom = document.createElement("div");
    var newWish = initWishDiv();
    moveDiv.push(newWish);
    wallDiv.appendChild(newWish);
    newWish.onmousedown = function (e) {
        if (e.button !== 0) {
            return;
        }
        newWish.style.zIndex = zIndex;
        zIndex++;
        var pageX = e.pageX;
        var pageY = e.pageY;
        var style = getComputedStyle(newWish);
        var moveLeft = parseFloat(style.left);
        var moveTop = parseFloat(style.top);

        window.onmousemove = function (e) {
            var disX = e.pageX - pageX;
            var disY = e.pageY - pageY;
            var newLeft = moveLeft + disX;
            var newTop = moveTop + disY;
            if (newLeft < 0) {
                newLeft = 0;
            }
            if (newLeft > document.documentElement.clientWidth - config.width) {
                newLeft = document.documentElement.clientWidth - config.width;
            }
            if (newTop < 0) {
                newTop = 0;
            }
            if (newTop > document.documentElement.clientHeight - config.height) {
                newTop = document.documentElement.clientHeight - config.height;
            }
            newWish.style.left = newLeft + "px";
            newWish.style.top = newTop + "px";
        }
        window.onmouseup = window.onmouseleave = function (e) {
            if (e.button === 0) {
                window.onmousemove = null;
            }
        }
    }
    inp.value = "";
})


window.onresize = function () {
    for (var i = 0; i < container.children.length; i++) {
        var paper = container.children[i];

    }
}