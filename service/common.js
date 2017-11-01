// 声明项目简写
let _ = {}

_.echone = {
    _1: "参数错误"
}
/*
* 获取当前时间戳
* 0 秒级  1毫秒级 不传 毫秒级
*/
_.getNowTime  = (arg) => arg === 1 ? new Date().valueOf() : Date.parse(new Date())

/*
* 错误
*/
_.error = (msg) => console.error(msg)

/*
* 警告
*/
_.warn = (msg) => console.warn(msg)
/*
* console日志
*/
_.log = (msg) => console.log(msg)

// sql操作

// get操作
_.get = (args = []) => {
    let sql = ''
    return args instanceof Object ? args.length.length > 0 ? (function () {
        args.map(function(index, elem) {
            sql += ` ${elem} = ${index} `
            sql += args[elem + 1] !== undefined ? 'and ' : ''
        })
    })() : sql = '' : this.warn(_1)
}




module.exports = _