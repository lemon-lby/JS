//单对象模式,也叫做命名空间模式
var MyFunctions = {

    /**
     * 判断是不是奇数
     * @param {*} n 要判断的数
     * @returns {boolean}
     */
    isOdd: function (n) {
        return n % 2 !== 0;
    },

    /**
     * 判断是否为素数
     * @param {*} n 要判断的数 
     * @returns {boolean}
     */
    isPrime: function (n) {
        if (n < 2) {
            return false;
        }
        for (var i = 2; i < n - 1; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    },

    /**
     * 数组求和
     * @param {*} arr 要求和的数组 
     * @returns 
     */
    sumOfArray: function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    },

    /**
     * 得到数组中的最大值,如果数组长度为0,则返回undefined
     * @param {*} arr 数组
     * @returns 
     */
    maxOfArray: function (arr) {
        if (arr.length === 0) {
            return undefined;
        }
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    },

    /**
     * 得到数组中的最小值
     * @param {*} arr 数组
     * @returns 
     */
    minOfArray: function (arr) {
        if (arr.length === 0) {
            return undefined;
        }
        var min = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;

    },


    /**
     * 判断数组是否为稀松数组
     * @param {*} arr 
     * @returns 
     */
    hasEmptyInArray: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (!(i in arr)) {
                return true;
            }
        }
        return false;
    },

    /**
     * 判断是否为闰年
     * @param {*} n 年份
     * @returns 
     */
    isLeap: function (n) {
        // if ((n % 4 === 0 && n % 100 !== 0) || n % 400 === 0) {
        //     return true;
        // }
        // return false;
        return n % 4 === 0 && n % 100 !== 0 || n % 400 === 0;
    },

    /**
     * 得到某年某月的天数
     * @param {*} a 年份 
     * @param {*} b 月份
     * @returns 
     */
    getDays: function (a, b) {
        if (b === 2) {

            return this.isLeap(a) ? 29 : 28;
        } else if (b < 8 && this.isOdd(b) || b >= 8 && !this.isOdd(b)) {
            return 31;
        } else {
            return 30;
        }
    },

    /**
     * 得到某个数字数组种出现次数最多的数字和频率
     * @param {*} arr 数组
     * @returns 
     */
    getTopFreqInArray: function (arr) {
        var record = {}; //记录出现频率
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            if (record[n]) {
                record[n]++;
            } else {
                record[n] = 1;
            }
        }
        var result; //记录最终结果的对象
        for (var prop in record) {
            if (!result || record[prop] > result.frequency) {
                result = {
                    number: prop,
                    frequency: record[prop]
                };
            }
        }
        return result;

    },


    /**
     * 给指定的数组升序排序
     * @param {*} arr 
     * @param {function} compare 比较大小,该函数有两个参数,代表数组中的两个元素,该函数返回一个数字,如果是正数,则第一个元素比第二个元素大;如果是0则相等;如果是负数,则第一个元素比第二个元素小
     */
    sort: function (arr, compare) {
        if (!compare) {
            compare = function (a, b) {
                if (a > b) {
                    return 1;
                } else if (a === b) {
                    return 0;
                } else {
                    return -1;
                }
            }
        }
        for (var i = 1; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i; j++) {
                if (compare(arr[j], arr[j + 1]) > 0) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    },
    /**
     * 筛选数组
     * @param {*} arr 
     * @param {*} choose 回调函数,接受两个参数,
     * 分别表示数组的某一项和其下标,返回一个Boolean
     * 满足返回true,不满足返回false 
     * @returns 
     */
    filter: function (arr, choose) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (choose(arr[i], i)) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },

    /**
     * 从指定数组中查找第一个满足条件的元素
     * @param {*} arr 
     * @param {*} callback 回调函数,接受两个参数,
     * 分别表示数组的某一项和其下标
     * 满足直接返回,找不到返回undefined 
     */
    find: function (arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                return arr[i];
            }
        }
    },


    /**
     * 按照指定的条件,得到某个数组中满足条件的元素数量
     * @param {*} arr 
     * @param {*} callback 回调函数,返回满足条件元素的个数
     * @returns 
     */
    count: function (arr, callback) {
        var num = 0;
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                num++;
            }
        }
        return num;
    },
    /**
     * 得到一个最大值与最小值之间的随机数
     * @param {*} min 最小值
     * @param {*} max 最大值(取不到最大值)
     */
    getRandom: function (min, max) {
        return Math.floor(parseInt(Math.random() * (max - min) + min));
    },
    /**
     * 友好的日期字符串
     * @param {*} date 
     * @returns 
     */
     getDateString: function (date) {
        var year = date.getFullYear().toString().padStart(4, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var day = (date.getDate()).toString().padStart(2, "0");

        var hour = date.getHours().toString().padStart(2, "0");
        var minute = date.getDate().toString().padStart(2, "0");
        var second = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    /**
     * 根据出生日期得到年龄
     * @param {*} year 年
     * @param {*} month 月
     * @param {*} day 日
     */
    getAge: function (year, month, day) {
        //得到当前日期
        var now = new Date();
        var dec = now.getFullYear() - year;
        //处理闰年
        if (month === 2 && day === 29 && !this.isLeap(now.getFullYear())) {
            day = 28;
        }
        // 得到今年的生日
        var birthdayThisYear = new Date(now.getFullYear(), month - 1, day);
        // 检查
        // console.log(this.getDateString(birthdayThisYear));
        // console.log(this.getDateString(now));
        if (birthdayThisYear > now) {
            dec--;
        }
        return dec;
    },
    
}

//测试用例1
// var arr = [{
//         name: "张三",
//         age: "18",
//         weight: 60
//     },
//     {
//         name: "李四",
//         age: "17",
//         weight: 70
//     },
//     {
//         name: "王五",
//         age: "20",
//         weight: 65
//     },
// ];
// var arr1 = [5, 8, 4, 1, 2];
// MyFunctions.sort(arr, function (a, b) {
//     return a.weight - b.weight;
// });
// MyFunctions.sort(arr1);
// console.log(arr);
// console.log(arr1);


//测试用例2
// var arr = [-1, -5, 1, 2, 3];
// var newArr = MyFunctions.filter(arr, function (item, index) {
//     return item % 2 !== 0;
// });
// console.log(newArr);


//测试用例3
// var arr = [2,3,4,5];
// console.log(MyFunctions.find(arr,MyFunctions.isOdd));


//测试用例4
// var arr = [1, 2, 3, 4, 5, 6, 7];
// var elm = MyFunctions.count(arr, MyFunctions.isOdd);
// console.log(elm);