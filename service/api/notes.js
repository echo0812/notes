var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// 连接数据库
var conn = mysql.createConnection(models);

conn.connect();
var $sql = require('../sqlMap');
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.post('/addNotes', (req, res) => {
  var sql = $sql.notes.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.md], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 增加用户接口
router.get('/getNotes', (req, res) => {
  conn.query ($sql.notes.getNotes, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
module.exports = router;
