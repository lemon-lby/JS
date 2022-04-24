var lblPrice = document.getElementById("total");
var lblScore = document.getElementById("integral");
var table = document.getElementById("shopping");

table.onclick = function (e) {
    if (e.target.alt === "add") {
        getInpIncrease(e.target.previousElementSibling, 1);
    } else if (e.target.alt === "minus") {
        getInpIncrease(e.target.nextElementSibling, -1)
    } else if (e.target.type === "checkbox") {
        if (e.target.id === "allCheckBox") {
            var cbs = document.querySelectorAll("[name=cartCheckBox]");
            cbs.forEach(function (cb) {
                cb.checked = e.target.checked;
            })
        }
        getTotal();
    } else if (e.target.parentElement.className === "cart_td_8") {
        deleteTr(e.target.parentElement.parentElement);
    } else if (e.target.alt === "delete") {
        deleteChecked();
    }
}

/**
 * 计算input的增量
 * @param {*} inp 
 * @param {*} increase 
 */
function getInpIncrease(inp, increase) {
    var val = +inp.value + increase;
    if (val < 1) {
        val = 1;
    }
    inp.value = val;
    getAll();
}

/**
 * 计算某一行的总价
 */
function getTrTotal(tr) {
    var info = getTrInfo(tr);
    var total = info.number * info.price;
    tr.querySelector(".cart_td_7").innerText = total.toFixed(2);
}
/**
 * 得到某一行的全部信息
 */
function getTrInfo(tr) {
    var score = +tr.querySelector(".cart_td_4").innerText;
    var price = +tr.querySelector(".cart_td_5").innerText;
    var number = +tr.querySelector(".cart_td_6 input").value;
    var checked = tr.querySelector(".cart_td_1 input").checked;
    var totalPrice = +tr.querySelector(".cart_td_7").innerText;
    return {
        score,
        price,
        number,
        checked,
        totalPrice
    }
}


/**
 * 计算所有行的总价
 */
function getAllTrTotal() {
    var trs = document.querySelectorAll("tbody tr[id^=product]");
    trs.forEach(function (tr) {
        getTrTotal(tr);
    })

}

/**
 * 计算商品总价和总积分
 */
function getTotal() {
    var trs = document.querySelectorAll("tbody tr[id^=product]");
    var sum = 0;
    var score = 0;
    trs.forEach(function (tr) {
        var info = getTrInfo(tr);
        if (info.checked) {
            sum += info.totalPrice;
            score += info.score * info.number;
        }
    });
    lblPrice.innerText = sum.toFixed(2);
    lblScore.innerText = score;
}

/**
 * 计算价格
 */
function getAll() {
    getAllTrTotal();
    getTotal();
}


/**
 * 删除一行
 * @param {*} tr 
 */
function deleteTr(tr) {
    tr.previousElementSibling.remove();
    tr.remove();
    getTotal();
}
/**
 * 删除所有
 */
function deleteChecked() {
    var trs = document.querySelectorAll("tbody tr[id^=product]");
    trs.forEach(function (tr) {
        var info = getTrInfo(tr);
        if (info.checked) {
            deleteTr(tr);
        }
    })
    getTotal();
}
getAll();