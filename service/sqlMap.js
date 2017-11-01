// sql语句
let _ = require('./common.js')
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, username) values (0, ?)'
  },
  notes: {
    getNotes: 'select * from notes',
    add: `insert into notes(md, create_time) values (?, ${_.getNowTime()})`,
    getNote: 'select * from '
  }
}

module.exports = sqlMap;
