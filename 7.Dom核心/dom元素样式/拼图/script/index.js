/**
 * 游戏配置
 */
var gameConfig = {
    width: 725,
    height: 714,
    rows: 3, //行数
    cols: 3, //列数
    isOver: false,
    imgurl: "素材/1111.png", //图片路径，注意，相对的是页面路径
    dom: document.getElementById("game") // 游戏的dom对象
};


//每一个小块的宽高
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;
//小块的数量
gameConfig.pieceNumber = gameConfig.rows * gameConfig.cols;


var blocks = []; // 包含小方块信息的数组



/**
 * 小方块的构造函数
 * @param {*} left 
 * @param {*} top 
 * @param {*} isVisible 是否可见 
 */
function Block(left, top, isVisible) {
    this.left = left; // 当前的横坐标
    this.top = top; // 当前的纵坐标
    this.correctLeft = this.left; // 正确的横坐标
    this.correctTop = this.top; // 正确的纵坐标
    this.isVisible = isVisible; // 是否可见
    this.dom = document.createElement("div");
    this.dom.style.width = gameConfig.pieceWidth + "px";
    this.dom.style.height = gameConfig.pieceHeight + "px";

    this.dom.style.background = `url("${gameConfig.imgurl}") -${this.correctLeft}px -${this.correctTop}px`;
    this.dom.style.position = "absolute";
    this.dom.style.boxSizing = "border-box";
    this.dom.style.border = "1px solid white";
    this.dom.style.cursor = "pointer";
    this.dom.style.transition = "0.5s";
    this.show = function () {
        // 根据当前的left top  重新设置div的位置
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    // 判断当前方块是否在正确的位置上
    this.isCorrect = function () {
        return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
    }
    this.show();
    gameConfig.dom.appendChild(this.dom);
    // 隐藏最后一个
    if (!isVisible) {
        this.dom.style.display = "none";
    }
}

/**
 * 判断两个数是否相等
 * @param {*} n1 
 * @param {*} n2
 */
function isEqual(n1, n2) {
    return parseInt(n1) === parseInt(n2);
}


/**
 * 初始化游戏
 */
function init() {
    // 1.初始化游戏的容器
    initGameDom();
    // 2.初始化小方块
    // 2.1 准备好一个数组，数组的每一项是一个对象，记录了每一个小方块的信息
    initBlocksArray();
    //2.2 数组洗牌
    shuffle();
    //3.注册点击事件
    regEvent();



    /**
     * 初始化游戏容器 
     */
    function initGameDom() {
        gameConfig.dom.style.width = gameConfig.width + "px";
        gameConfig.dom.style.height = gameConfig.height + "px";
        gameConfig.dom.style.border = "2px solid #ccc";
        gameConfig.dom.style.position = "relative";
    }


    /**
     * 初始化一个小方块的数组
     */
    function initBlocksArray() {
        for (var i = 0; i < gameConfig.rows; i++) {
            for (var j = 0; j < gameConfig.cols; j++) {
                // i 行号, j 列号
                var isVisible = true;
                if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                    isVisible = false;
                }
                var block = new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible);
                blocks.push(block);
            }
        }
    }

    /**
     * 随机数，能取到最大值
     * @param {*} min 
     * @param {*} max 
     */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }


    /**
     * 交换两个方块的left和top
     * @param {*} b1 
     * @param {*} b2 
     */
    function exchange(b1, b2) {
        //1.交换left
        var temp = b1.left;
        b1.left = b2.left;
        b2.left = temp;
        //2. 交换top
        temp = b1.top;
        b1.top = b2.top;
        b2.top = temp;
        b1.show();
        b2.show();
    }


    /**
     * 给数组洗牌
     */
    function shuffle() {
        for (var i = 0; i < blocks.length - 1; i++) {
            // 随机产生一个下标
            var index = getRandom(0, blocks.length - 2);
            //将数组的当前项与随机项交换left和top值
            exchange(blocks[i], blocks[index]);
        }
    }


    /**
     * 处理点击事件
     */
    function regEvent() {
        //找到看不见的方块
        var inVisibleBlock = blocks.find(function (b) {
            return !b.isVisible;
        })

        blocks.forEach(function (b) {
            b.dom.onclick = function () {
                if (gameConfig.isOver) {
                    return;
                }
                //交换是否可以交换
                if (b.top === inVisibleBlock.top && isEqual(Math.abs(b.left - inVisibleBlock.left), gameConfig.pieceWidth) ||
                    b.left === inVisibleBlock.left && isEqual(Math.abs(b.top - inVisibleBlock.top), gameConfig.pieceHeight)) {
                    // 交换当前块和看不见的方块的坐标位置
                    exchange(b, inVisibleBlock);
                }
                //游戏结束判定
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
            //游戏结束,去掉边框
            blocks.forEach(function (b) {
                b.dom.style.border = "none";
                b.dom.style.display = "block";
            })

        }

    }
}
init();