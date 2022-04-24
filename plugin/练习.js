if (!window.myPlugin) {
    window.myPlugin = {};
}
window.myPlugin.createWaterFall = function (opt) {
    //设置默认配置
    var defaultOpt = {
        imgWidth: 220,
        minGap: 10,
        src: [],
        container: document.body
    }
    //对象混合
    var option = Object.assign({}, defaultOpt, opt);
    var imgs = [];
    handleParent();
    createImgs();

    //设置窗口变化事件
    var debounce = myPlugin.debounce(setImgPosition, 300);
    window.onresize = debounce;


    //创建图片
    function createImgs() {
        var debounce = myPlugin.debounce(setImgPosition, 50);
        for (var i = 0; i < option.src.length; i++) {
            var img = document.createElement("img");
            img.src = option.src[i];
            img.style.width = option.imgWidth + "px";
            img.style.position = "absolute";
            img.style.transition = ".5s";
            imgs.push(img);
            img.onload = debounce;
            option.container.appendChild(img);

        }
    }

    //处理父元素
    function handleParent() {
        var style = getComputedStyle(option.container);
        if (style.position === "static") {
            option.container.style.position = "relative";
        };
    }

    function setImgPosition() {
        var info = getHorizontalInfo();
        var arr = new Array(info.number);
        arr.fill(0);
        imgs.forEach(function (img) {
            //设置图片坐标
            var minTop = Math.min.apply(null, arr);
            img.style.top = minTop + "px";
            var index = arr.indexOf(minTop);
            arr[index] += img.clientWidth + info.gap;

            //横坐标
            img.style.left = index * (option.imgWidth + info.gap) + "px";
        });

        var maxTop = Math.max.apply(null, arr);
        option.container.style.height = maxTop - info.gap + "px";

    }

    function getHorizontalInfo() {
        var obj = {};
        //容器宽度
        obj.containerWidth = option.container.clientWidth;
        //计算一行图片的数量
        obj.number = (obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap);
        obj.number = Math.floor(obj.number);
        //计算空隙
        obj.gap = (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1);
        return obj;
    }
}


