if (!this.myPlugin) {
    this.myPlugin = {};
}
this.myPlugin.Animate = function (option) {
    var defaultOption = {
        duration: 60,
        total: 1000,
        begin: {},
        end: {}
    };
    this.option = myPlugin.mixin(defaultOption, option);
    this.timer = null;
    this.number = Math.ceil(this.option.total / this.option.duration);
    this.curNumber = 0;
    this.curData = myPlugin.clone(this.option.begin);
    this.distance = {};
    this.everyDistance = {};
    for (var prop in this.option.begin) {
        this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
        this.everyDistance[prop] = this.distance[prop] / this.number;
    }
}
this.myPlugin.Animate.prototype.start = function () {
    if (this.timer || this.curNumber === this.number) {
        return;
    }
    if(this.option.onstart){
        this.option.onstart.call(that);
    }
    var that = this;
    this.timer = setInterval(function () {
        that.curNumber++;
        for (var prop in that.curData) {
            if (that.curNumber === that.number) {
                that.curData[prop] = that.option.end[prop];
            } else {
                that.curData[prop] += that.everyDistance[prop];
            }
        }
        if (that.option.onmove) {
            that.option.onmove.call(that);
        }
        if (that.curNumber === that.number) {
            that.stop();
        }

    }, this.option.duration)

}
this.myPlugin.Animate.prototype.stop = function () {
    clearInterval(this.timer);
    this.timer = null;
}  