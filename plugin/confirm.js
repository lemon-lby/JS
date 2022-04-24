if (!window.myPlugin) {
    window.myPlugin = {};
}
window.myPlugin.openConfirm = (function () {
    var divModal, //朦层
        divCenter,
        options,
        spanTitle,
        spanClose,
        divContent,
        btnConfirm,
        btnCancel,
        isRegEvent = false; //是否注册事件
    /**
     * 打开一个确认对话框
     */
    function openConfirm(opts) {
        if (!opts) {
            opts = {}; //默认为一个空对象
        }
        options = opts;
        initModal();
        initDivCenter();
        RegEvent();
    }
    /**
     * 初始化朦层
     */
    function initModal() {
        if (!divModal) {
            divModal = document.createElement("div");
            divModal.style.position = "fixed";
            divModal.style.background = "rgba(0,0,0,.5)";
            divModal.style.width = divModal.style.height = "100%";
            divModal.style.left = divModal.style.top = 0;
            document.body.appendChild(divModal);
        }
        divModal.style.display = "block";
    }


    //初始化中间的div
    function initDivCenter() {
        if (!divCenter) {
            divCenter = document.createElement("div");
            divCenter.style.position = "absolute";
            divCenter.style.width = "260px";
            divCenter.style.height = "160px";
            divCenter.style.background = "white";
            divCenter.style.left = divCenter.style.right = divCenter.style.top = divCenter.style.bottom = 0;
            divCenter.style.margin = "auto";

            initDivCenterContent();
            divModal.appendChild(divCenter);
            btnCancel = divCenter.querySelector("[data-myplungin-id=cancel]");
            btnConfirm = divCenter.querySelector("[data-myplungin-id=confirm]");
            spanTitle = divCenter.querySelector("[data-myplungin-id=title]");
            spanClose = divCenter.querySelector("[data-myplungin-id=close]");
            divContent = divCenter.querySelector("[data-myplungin-id=content]");
        }
        //设置配置的内容

        spanTitle.innerHTML = options.title || "提示";
        divContent.innerHTML = options.content || "";
        btnConfirm.className = options.confirmClass || "";
        btnConfirm.innerText = options.confirmText || "确定";
        btnCancel.className = options.confirmClass || "";
        btnCancel.innerText = options.cancelText || "取消";
    }
    /**
     * 初始化div内部的东西
     */
    function initDivCenterContent() {
        //创建内部的标题div
        var div = document.createElement("div");
        div.style.height = "40px";
        div.style.background = "#eee";
        div.style.boxSizing = "border-box";
        div.style.padding = "10px 20px 0";
        div.innerHTML = `
            <span style="float:left" data-myPlungin-id="title"></span>
            <span style="float:right;cursor:pointer" data-myPlungin-id="close">
                <img style="width:18px;height:18px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApJJREFUaEPt2P9rT1Ecx/Hn/hN/ir/AL74X5ktbRBGzLMKyrK2JIiIiq2kTTUQS0URiizYj8i2iFJFvEdGp96lrfT73nnPe7zt9cu9vnz7nnvt6nPM+535posGPpgbPTwX41zNYzUA1A8oR+G9KaAbwE3ilHLCY02cCt4EveSeFzsAzwCHmAKdiUiS23Q5sA9qAXRYA3+EvQQwnBgs5zV/rPjAPmLQAuD58xz8EcTYkTWSbqPCu79AS8jn8Bb4J4nxkwLzm0eFTANmZ+CyIiwaIpPCpgCziIzAbuKxAJIfXALKI94K4moBQhdcCsoi3Uk4jEQi3TTpA0G5Tr9/YRVyrHz+KbwRxIwBhEt5iBqbuTu5O7W52t3IQZuEtAdlyeiFrYrQGwjS8NSCLeCqIuxmEefgyAFnEY0GMy3ONesHWKkuLRZy3sB8CgwJQ7TZl7kL1+va7k/u/lPBllZAHdQJb5ccDebKcCNhio5qUVUJdwGYZ+ZNyw3okiHtRCQsalwHoBjZNKZstwA7giSDGrBDWgF5gY52a7wB2As8F4V4X1YclwL36rS9YsO1AD/ASmA/c1AqsAHuAtYG7zQagD3gtiOsahAVgH7A6MLzPug7YDbinWPfeey0VoQUcAFZGhvdZ1wB7gXeCuJKC0AAOAS2J4X3WVcB+4IMgLsUiUgFHgOXK8D5rK3AQ+CRr4kIMIgVwDGg2Cu+zrgAOA18FcS4UEQvoBxYZh/dZlwJHge+COBOCiAGcABaUFN5nXQwcl++w7j5xuggRChgC5pYc3mddCAwAv4FZQG45hQLuSO9Lir5VFo1Y4P/u3uDeI5YBbs3VPUIBgded/mYVYPrH/O8rVjNQzYByBKoSUg6g+vSGn4E/Gu2sMfq9PGMAAAAASUVORK5CYII=" />
            </span>
        `
        divCenter.appendChild(div);

        //创建提示文本div
        div = document.createElement("div");
        div.dataset.myplunginId = "content";
        div.style.height = "70px";
        div.style.boxSizing = "border-box";
        div.style.padding = "20px 20px";
        div.innerHTML = ``;
        divCenter.appendChild(div);

        //创建按钮div
        div = document.createElement("div");
        div.style.height = "50px";
        div.style.boxSizing = "border-box";
        div.style.padding = "10px 20px";
        div.style.textAlign = "right";
        div.innerHTML = `
            <button data-myPlungin-id="confirm"></button>
            <button data-myPlungin-id="cancel"></button>
        `;
        divCenter.appendChild(div);



    }


    // 注册事件
    function RegEvent() {
        if (!isRegEvent) {
            isRegEvent = true;
            spanClose.onclick = function () {
                divModal.style.display = "none";
            }
            divModal.onclick = function (e) {
                if (e.target === this) {
                    divModal.style.display = "none";
                }
            }
            btnConfirm.onclick = function () {
                if (options.onConfirm) {
                    options.onConfirm();
                }
                divModal.style.display = "none";
            }
            btnCancel.onclick = function () {
                if (options.onCancel) {
                    options.onCancel();
                }
                divModal.style.display = "none";
            }
        }
    }


    return openConfirm;
}());