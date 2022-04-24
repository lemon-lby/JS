/**
 * 初始化
 */
(function init() {
    /**
     * 配置
     */
    var config = {
        smallbg: "img/small.jpg", //小图背景路径
        bigbg: "img/big.jpg", //大图背景路径
        divSmall: document.querySelector(".small"), //小图div dom元素
        divBig: document.querySelector(".big"), //大图div dom元素
        divMove: document.querySelector(".small .move"), //可移动的div
        smallImgSize: { //小图尺寸
            width: 400,
            height: 400
        },
        divBigSize: { //大的div的尺寸
            width: 540,
            height: 540
        },
        bigImgSize: {
            width: 800,
            height: 800
        }
    };
    //计算可移动的div的宽高
    config.moveSize = {
        width: config.divBigSize.width / config.bigImgSize.width * config.smallImgSize.width,
        height: config.divBigSize.height / config.bigImgSize.height * config.smallImgSize.height
    };

    initDivBig();
    /**
     * 初始化div背景
     */
    function initDivBig() {
        config.divSmall.style.background = `url("${config.smallbg}") no-repeat left top/100% 100%`;
        config.divBig.style.background = `url("${config.bigbg}") no-repeat`;
    }

    initMoveDiv();
    /**
     * 初始化可移动的div
     */
    function initMoveDiv() {
        config.divMove.style.width = config.moveSize.width + "px";
        config.divMove.style.height = config.moveSize.height + "px";
    }

    initDivSmallEvent();
    /**
     * 初始化小图div的鼠标事件
     */
    function initDivSmallEvent() {
        config.divSmall.onmouseenter = function () {
            config.divMove.style.display = "block";
            config.divBig.style.display = "block";
        };
        config.divSmall.onmouseleave = function () {
            config.divMove.style.display = "none";
            config.divBig.style.display = "none";
        };
        config.divSmall.onmousemove = function (e) {
            var offset = getOffset(e);
            setPosition(offset);
            setBigBgPosition();
        }
        /**
         * 设置大图背景图位置
         */
        function setBigBgPosition() {
            var style = getComputedStyle(config.divMove);
            var left = parseFloat(style.left);
            var top = parseFloat(style.top);

            var bgLeft = left / config.smallImgSize.width * config.bigImgSize.width;
            var bgTop = top / config.smallImgSize.height * config.bigImgSize.height;
            config.divBig.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`;
        }
        /**
         * 根据鼠标坐标设置divMove的坐标
         * @param {*} offset 
         */
        function setPosition(offset) {
            var left = offset.x - config.moveSize.width / 2;
            var top = offset.y - config.moveSize.height / 2;
            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
            if (left > config.smallImgSize.width - config.moveSize.width) {
                left = config.smallImgSize.width - config.moveSize.width;
            }
            if (top > config.smallImgSize.height - config.moveSize.height) {
                top = config.smallImgSize.height - config.moveSize.height;
            }
            config.divMove.style.left = left + "px";
            config.divMove.style.top = top + "px";
        }
        /**
         * 根据鼠标事件参数，得到鼠标在divsmall中的坐标
         * @param {MouseEvent} e 
         */
        function getOffset(e) {
            if (e.target === config.divSmall) {
                return {
                    x: e.offsetX,
                    y: e.offsetY
                }
            } else {
                // 事件源时divMove
                var style = getComputedStyle(config.divMove);
                var left = parseFloat(style.left);
                var top = parseFloat(style.top);
                return {
                    x: e.offsetX + left + 1, //+1是因为边框
                    y: e.offsetY + top + 1
                }
            }
        }
    }
}());