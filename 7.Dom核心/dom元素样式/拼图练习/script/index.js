var gameConfig = {
    width: 725,
    height: 714,
    rows: 3,
    cols: 3,
    isOver: false,
    imgUrl: "img/1111.png",
    dom: document.getElementById("game")
}
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;
gameConfig.pieceNumber = gameConfig.rows * gameConfig.cols;

var blocks = [];

// 完整的初始化
function init() {
    // 初始化最初界面
    initGameDom();

    function initGameDom() {
        gameConfig.dom.style.width = gameConfig.width + "px";
        gameConfig.dom.style.height = gameConfig.height + "px";
        gameConfig.dom.style.border = "1px solid black";
        gameConfig.dom.style.position = "relative";
    }

    initBlocksArray();

    function initBlocksArray() {
        for (var i = 0; i < gameConfig.rows; i++) {
            for (var j = 0; j < gameConfig.cols; j++) {
                var isVisible = true;
                if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                    isVisible = false;
                }
                var block = new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible)
                blocks.push(block);
            }
        }
    }

    shuffle();

    function shuffle() {
        for (var i = 0; i < blocks.length - 1; i++) {
            var index = getRandom(0, blocks.length - 2);
            exchange(blocks[i], blocks[index]);
        }
    }

    regEvent();

    function regEvent() {
        var inVisibleBlock = blocks.find(function (b) {
            return !b.isVisible;
        });
        blocks.forEach(function (b) {
            b.dom.onclick = function () {
                if (gameConfig.isOver) {
                    return;
                }
                if (b.left === inVisibleBlock.left && isEqual(Math.abs(b.top - inVisibleBlock.top), gameConfig.pieceHeight) || b.top === inVisibleBlock.top && isEqual(Math.abs(b.left - inVisibleBlock.left), gameConfig.pieceWidth)) {
                exchange(b, inVisibleBlock);
                }
                isWin();
            }
        })

    }
    /**
     * 游戏是否结束判定
     */
    function isWin() {

        var wrongs = blocks.filter(function (b) {
            return !b.isCorrect();
        });
        if (wrongs.length === 0) {
            gameConfig.isOver = true;
            blocks.forEach(function(b){
                b.dom.style.border = "none";
                b.dom.style.display = "block";
            })
        }

    }

}
// 小块的构造函数
function Block(left, top, isVisible) {
    this.left = left;
    this.top = top;
    this.correctLeft = this.left;
    this.correctTop = this.top;
    this.isVisible = isVisible;
    this.isOver = false;
    this.dom = document.createElement("div");
    this.dom.style.width = gameConfig.pieceWidth + "px";
    this.dom.style.height = gameConfig.pieceHeight + "px";
    this.dom.style.border = "1px solid black";
    this.dom.style.transition = "0.5s";
    this.dom.style.position = "absolute";
    this.dom.style.cursor = "pointer";
    this.dom.style.boxSizing = "border-box";
    this.dom.style.background = `url("${gameConfig.imgUrl}") -${this.correctLeft}px -${this.correctTop}px`;
    this.show = function () {
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    this.show();
    this.isCorrect = function () {
        return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
    }
    gameConfig.dom.appendChild(this.dom);
    if (!isVisible) {
        this.dom.style.display = "none";
    }
}
// 取随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
// 交换
function exchange(a, b) {
    var temp = a.left;
    a.left = b.left;
    b.left = temp;

    temp = a.top;
    a.top = b.top;
    b.top = temp;

    a.show();
    b.show();
}
// 判断两个数是否相等
function isEqual(a, b) {
    return parseInt(a) === parseInt(b);
}

init();