'use strict';
/**
 * count-down
 * @description 倒计时
 * @author mack wang
 * @website yurencloud.com
 */
var object = require('yu.object')
var eventBus = require('yu.event-bus')

var COUNT_DOWN_DEFAULT = 0
var COUNT_DOWN_START = 1
var COUNT_DOWN_STOP = 2
var COUNT_DOWN_PAUSE = 3

var DEFAULT_OPTIONS = {
    count: 3000, // 起始时间ms毫秒
    interval: 1000, // 时间间隔ms毫秒
}

var DEFAULT_STATUS = {
    remain: 0,
    elapsed: 0
}

var CountDown = function (options) {
    this.options = object.assign({}, DEFAULT_OPTIONS, options)
}

var proto = CountDown.prototype

proto.handle = undefined
proto.status = DEFAULT_STATUS


proto.start = function () {
    var options = this.options
    var time = options.count
    var that = this
    this.handle = setInterval(() => {
        if (time <= 0) {
            this.stop()
            return
        }
        time = time - options.interval
        that.status.remain = time
        that.status.elapsed = options.count - time
        eventBus.emit("change", this, that.status.remain, that.status.elapsed)
    }, options.interval)
}

proto.stop = function () {
    clearInterval(this.handle)
    eventBus.emit("stop", this, this.status)
    console.log(eventBus.get())
}

proto.pause = function () {
    clearInterval(this.handle)
    eventBus.emit("pause", this, this.status.remain, this.status.elapsed)
}

proto.resume = function () {
    var options = this.options
    var time = this.status.remain
    var that = this
    this.handle = setInterval(function () {
        if (time <= 0) {
            this.stop()
            return
        }
        time = time - options.interval
        that.status.remain = time
        that.status.elapsed = options.count - time
        eventBus.emit("change", this, that.status.remain, that.status.elapsed)
    }, options.interval)
    eventBus.emit("resume", this, this.status.remain, this.status.elapsed)
}

proto.on = function (type, callback) {
    this.options.eventType = type
    eventBus.add(type, callback)
}

module.exports = CountDown
