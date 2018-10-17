var CountDown = require('./src/index')

countDown = new CountDown({count: 10000})
countDown.start()
countDown.on('change', function (e, remain, elapsed) {
    console.log('1---', remain)
})
// countDown.on('stop', function (event) {
//     console.log('stop')
// })
// setTimeout(function () {
//     countDown.pause()
// }, 3000)
// setTimeout(function () {
//     countDown.resume()
// }, 6000)
//
// setTimeout(function () {
//     countDown.stop()
// }, 8000)
// countDown.on('pause', function (event) {
//     console.log('pause')
// })

// var countDown2 = new CountDown({count: 60000})
// countDown2.start()
// countDown2.on('change', function (e, remain, elapsed) {
//     console.log('2---', remain)
// })

// test('加法', () => {
//     CountDown.start()
// })
