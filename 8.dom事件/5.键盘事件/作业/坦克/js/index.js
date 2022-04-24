var tank = {
    direction: "d",
    left: 0,
    top: 0,
    dom: document.querySelector("img"),
    show: function () {
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
        this.dom.src = "img/" + this.direction + ".png";
    }
}

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
        tank.direction = "w";
        tank.top -= 10;
    } else if (e.key === "ArrowDown") {
        tank.direction = "s";
        tank.top += 10;
    } else if (e.key === "ArrowLeft") {
        tank.direction = "a";
        tank.left -= 10;
    } else if (e.key === "ArrowRight") {
        tank.direction = "d";
        tank.left += 10;
    }
    tank.show();
})
