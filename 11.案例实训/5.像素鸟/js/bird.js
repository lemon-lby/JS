/**
 * 得到一个计时器对象，该对象提供了两个方法
 * 1.start,启动计时器
 * 2.stop,停止计时器
 * @param {*} callback 每隔一段时间运行的函数
 *  @param {*} thisArg this指向的对象
 */
function getTimer(duration, thisArg, callback) {
    var timer;
    return {
        start: function () {
            if (timer) {
                return;
            }
            timer = setInterval(callback.bind(thisArg), duration)
        },
        stop: function () {
            clearInterval(timer);
            timer = null;
        }
    }

}



function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}



//游戏对象
var game = {
    dom: document.querySelector(".game"), //游戏dom元素
    isPause: true, //是否处于暂停状态
    isOver: false, //游戏是否结束
    overdom: document.querySelector(".game .over"), //游戏结束的dom对象
    scoredom: document.querySelector(".game .score"),
    start: function () {
        sky.timer.start(); //天空开始移动
        land.timer.start(); //大地开始移动
        bird.swingTimer.start(); //小鸟开始扇动翅膀
        bird.dropTimer.start(); //开始下落
        piprManager.produceTimer.start(); //生产柱子
        piprManager.moveTimer.start(); //移动柱子
        hitManager.timer.start(); //碰撞检测器
        this.isPause = false;
    },
    stop: function () {
        sky.timer.stop(); //天停止移动
        land.timer.stop(); //大地停止移动
        bird.swingTimer.stop(); //小鸟停止扇动翅膀
        bird.dropTimer.stop(); //停止下落
        piprManager.produceTimer.stop(); //停止生产柱子
        piprManager.moveTimer.stop(); //停止移动柱子
        hitManager.timer.stop(); //停止检测碰撞  
        this.isPause = true;
    }
}
game.width = game.dom.clientWidth; //游戏面板宽度
game.height = game.dom.clientHeight; //游戏面板高度

console.log(typeof(+game.scoredom.innerText));
 

//天空对象
var sky = {
    left: 0, //当前的横坐标
    dom: document.querySelector(".game .sky"),
};
sky.timer = getTimer(16, sky, function () {
    this.left--;
    if (this.left === -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
});


//大地  对象
var land = {
    left: 0, //当前的横坐标
    dom: document.querySelector(".game .land"),
};
land.height = land.dom.clientHeight; //大地的高度
land.top = game.height - land.height; //大地的纵坐标
land.timer = getTimer(16, land, function () {
    this.left -= 2;
    if (this.left === -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
});






//小鸟对象
var bird = {
    left: 50, //当前的横坐标
    top: 100,
    width: 34,
    height: 24,
    dom: document.querySelector(".game .bird"),
    g: 0.002, //重力加速度
    v: 0, //当前速度
    t: 16, //时间间隔
    swing: 1, //翅膀状态
    show() { //显示小鸟
        //处理翅膀
        if (this.swing === 1) {
            this.dom.style.background = `url("img/bird1.png")`;
        } else if (this.swing === 2) {
            this.dom.style.background = `url("img/bird2.png")`;
        } else if (this.swing === 3) {
            this.dom.style.background = `url("img/bird3.png")`;
        }
        //设置小鸟的位置
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    },
    setTop(top) {
        if (top < 0) {
            top = 0;
        } else if (top > land.top - this.height) {
            top = land.top - this.height;
        }
        this.top = top;
        this.show();
    },
    jump() {
        this.v = -0.5;
    }
};
bird.show();
//翅膀计时器
bird.swingTimer = getTimer(200, bird, function () {
    this.swing += 1;
    if (this.swing > 3) {
        this.swing = 1;
    }
    bird.show();
})
//下落计时器
bird.dropTimer = getTimer(bird.t, bird, function () {
    //计算移动距离
    var dis = this.v * this.t + 0.5 * this.g * this.t * this.t;
    //改变速度
    this.v += this.g * this.t;
    //改变top值
    this.setTop(this.top + dis);
});





/**
 * 柱子的构造函数
 * @param {*} dircetion  up,down
 * @param {*} height 高度
 */
function Pipe(dircetion, height) {
    this.width = Pipe.width; //方便访问，给对象加上宽度属性
    this.left = game.width;
    this.height = height;
    this.dircetion = dircetion;
    //纵坐标
    if (dircetion === "up") {
        this.top = 0;
    } else {
        this.top = land.top - this.height;
    }
    this.dom = document.createElement("div");
    this.dom.className = "pipe " + dircetion;
    this.dom.style.height = this.height + "px";
    this.dom.style.top = this.top + "px";
    this.show();
    game.dom.appendChild(this.dom);

}
//显示柱子
Pipe.prototype.show = function () {
    this.dom.style.left = this.left + "px";
}


/**
 * 一对柱子的构造函数
 */
function PipePair() {
    var minHeight = 60; //最小高度
    var gap = 150; //空隙
    var maxHeight = land.top - minHeight - gap;
    var h = getRandom(minHeight, maxHeight);
    this.up = new Pipe("up", h);
    this.down = new Pipe("down", land.top - h - gap);
    this.left = this.up.left;
}

/**
 * 显示一对柱子
 */
PipePair.prototype.show = function () {
    this.up.left = this.left;
    this.down.left = this.left;
    this.up.show();
    this.down.show();
}

PipePair.prototype.remove = function () {
    this.up.dom.remove();
    this.down.dom.remove();
}
/**
 * 柱子管理器
 */
var piprManager = {
    pairs: [], //保存所有的柱子对
};

/**
 * 生产柱子的计时器
 */
piprManager.produceTimer = getTimer(1500, piprManager, function () {
    this.pairs.push(new PipePair());
});

/**
 * 柱子移动的计时器
 */
piprManager.moveTimer = getTimer(16, piprManager, function () {
    for (var i = 0; i < this.pairs.length; i++) {
        var pair = this.pairs[i];
        pair.left -= 2;
        if(pair.left === bird.left - Pipe.width){
            getPoint();
        }
        if (pair.left <= -Pipe.width) {
            //移除柱子
            pair.remove();
            this.pairs.splice(i, 1); //从数组中移除
            i--;

        } else {
            pair.show();
        }

    }
})

Pipe.width = 52;





//碰撞检测器
var hitManager = {
    //验证是否发生碰撞，true，碰撞了；false，没碰撞
    validate: function () {
        if (bird.top >= land.top - bird.height) {
            //与大地碰撞
            return true;
        }

        //检查是否与主子发生碰撞
        for (var i = 0; i < piprManager.pairs.length; i++) {
            var pair = piprManager.pairs[i];
            if (this.validateBirddAndPipe(pair.up) || this.validateBirddAndPipe(pair.down)) {
                return true;
            }

        }
        return false;
    },
    validateBirddAndPipe(pipe) {
        //判断某根柱子是否与小鸟发生碰撞
        //bird pipe
        var bx = bird.left + bird.width / 2; //小鸟中心点x
        var by = bird.top + bird.height / 2; //小鸟中心点y
        var px = pipe.left + pipe.width / 2; //柱子中心点x
        var py = pipe.top + pipe.height / 2; //柱子中心点y
        if ((Math.abs(px - bx) <= (bird.width + pipe.width) / 2) && (Math.abs(py - by) <= (bird.height + pipe.height) / 2)) {
            return true;
        } else {
            return false;
        }
    }

};
hitManager.timer = getTimer(16, hitManager, function () {
    //检测是否碰撞
    if (this.validate()) {
        //碰撞了，游戏结束
        game.stop();
        game.overdom.style.display = "block";
        game.isOver = true;
    }
})



function getPoint(){
    var point = +game.scoredom.innerText;
    point += 100;
    game.scoredom.innerText = point;
}








//注册事件
window.onkeydown = function (e) {
    if (e.key === "Enter") {
        if (game.isOver) {
            location.reload(); //刷新页面
            return;
        }
        if (game.isPause) {
            game.start();
        } else {
            game.stop();
        }
    } else if (e.key === " ") {
        bird.jump();
    }
}