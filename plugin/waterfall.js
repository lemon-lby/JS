if (!window.myPlugin) {
    window.myPlugin = {};
}

/**
 * 创建一个图片瀑布流
 */
window.myPlugin.createWaterFall = function (option) {
    var defaultOption = {
        minGap: 10, //最小间隙
        imgSrcs: srcs, //图片路径
        imgWidth: 220, //单张图片宽度
        container: document.body, //容器
    };
    var option = Object.assign({}, defaultOption, option);
    var imgs = []; //存放所有的图片元素


    //处理父元素
    handleParent();
    //创建图片元素
    createImgs();


    //窗口尺寸变化事件
    var debounce = myPlugin.debounce(setImgPosition,300);
    window.onresize = debounce;

    /**
     * 设置每一张图片的坐标
     */
    function setImgPosition() {
        var info = getHorizontalInfo();
        var arr = new Array(info.number); //存放每一列下一张图片的top值
        arr.fill(0);
        imgs.forEach(function (img) {
            //设置图片坐标
            var minTop = Math.min.apply(null, arr);
            img.style.top = minTop + "px";
            var index = arr.indexOf(minTop); //找到对应的列编号
            arr[index] += img.clientHeight + info.gap;

            //横坐标

            img.style.left = index * (option.imgWidth + info.gap) + "px";
        });
        //设置容器高度
        var maxTop = Math.max.apply(null,arr);
        option.container.style.height = maxTop - info.gap + "px";
    }

    function getHorizontalInfo() {
        var obj = {};
        //容器宽度
        obj.containerWidth = option.container.clientWidth;
        //计算一行图片的数量
        obj.number = (obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap);
        obj.number = Math.floor(obj.number); //每行的图片只能少，不能多
        //计算水平空隙
        obj.gap = (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1);
        return obj;
    }

    /**
     * 创建图片
     */
    function createImgs() {
        var debounce = myPlugin.debounce(setImgPosition,50);

        //循环图片路径数组
        for (var i = 0; i < option.imgSrcs.length; i++) {
            var img = document.createElement("img");
            img.src = option.imgSrcs[i];
            img.style.width = option.imgWidth + "px";
            img.style.position = "absolute";
            img.style.transition = ".5s";//实现过渡
            imgs.push(img);
            img.onload = debounce;//函数防抖

            option.container.appendChild(img);
        }
    }


    /**
     * 处理父元素，因为图片都是绝对定位，父元素必须是一个定位元素
     */
    function handleParent() {
        //如果父元素不是一个定位元素，则将其设置为相对定位
        var style = getComputedStyle(option.container);
        if (style.position === "static") {
            option.container.style.position = "relative";
        }
    }
}