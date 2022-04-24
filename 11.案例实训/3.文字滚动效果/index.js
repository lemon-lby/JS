var ul = document.querySelector(".left ul");
var height = 30;
var curTop = 0;//由于浏览器中scrollTop取值不准确
//复制li
function cloneFirstLi() {
    var firstLi = ul.children[0].cloneNode(true);
    ul.appendChild(firstLi);

}
cloneFirstLi();
/**
 * 开始滚动
 */
function startScroll() {
    setInterval(scroll, 2000)
};

/**
 * 滚动一次
 */
function scroll() {
    var animate = new myPlugin.Animate({
        total: 500,
        begin: {
            top: curTop,
        },
        end: {
            top: curTop + height,
        },
        onmove:function(){
            curTop = this.curData.top;
            ul.scrollTop = curTop;
        },
        onover:function(){
            if(ul.scrollHeight - height === curTop){
                //滚动条回到0
                curTop = 0;
                ul.scrollTop = curTop;
            }
        }
    });
    animate.start();
}
startScroll();