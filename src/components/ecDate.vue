<template>
  <div class="date">
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 80%; margin: 50px auto;">
      <table class="el-table">
        <thead class="el-table__header">
          <tr>
            <th class="is-leaf"><div>周一</div></th>
            <th class="is-leaf"><div>周二</div></th>
            <th class="is-leaf"><div>周三</div></th>
            <th class="is-leaf"><div>周四</div></th>
            <th class="is-leaf"><div>周五</div></th>
            <th class="is-leaf"><div>周六</div></th>
            <th class="is-leaf"><div>周日</div></th>
          </tr>
        </thead>
        <tbody class="el-table__body-wrapper">
          <tr v-for="(item, index) in dataForm">
            <td><div>{{item.Mon}}</div></td>
            <td><div>{{item.Tue}}</div></td>
            <td><div>{{item.Wed}}</div></td>
            <td><div>{{item.Thu}}</div></td>
            <td><div>{{item.Fri}}</div></td>
            <td><div>{{item.Sat}}</div></td>
            <td><div>{{item.Sun}}</div></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ecDate',
  data () {
    return {
      dataForm: []
    }
  },
  created () {
    this.getDay('2018-01-01')
  },
  methods: {
    /*
    * @parames time 2017-11-01
    */
    getMonthDay (time) {
      let date = time ? new Date(time) : new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = 31
      if (month === 3 || month === 5 || month === 8 || month === 10) day = 30
      if (month === 1) year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? day = 29 : day =  28
      return day
    },
    /*
    * 获取当前时间是星期几，不传入则为当前时间
    * time 2017-11-01
    */
    delFirstDay (time) {
      let date = time ? new Date(time) : new Date()
      date.setDate(1)
      console.log(date.getDay())
      return date.getDay()
    },
    /*
    * 获取时间数组
    */
    getDay (time) {
      var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      var weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      var temp = {
        Mon: '-',
        Tue: '-',
        Wed: '-',
        Thu: '-',
        Fri: '-',
        Sat: '-',
        Sun: '-'
      }
      // 坑逼的数组 坑爹的双向绑定
      var tempArr = JSON.parse(JSON.stringify((new Array(6).fill(temp))))
      var fisrDay = this.delFirstDay(time)
      tempArr[0][week[fisrDay]] = 1
      var num = 0
      if (fisrDay === 0) {
        num = 1
      }
      for (var i = 2; i <= this.getMonthDay(time); i++) {
        tempArr[num][weeks[fisrDay]] = i
        fisrDay++
        if (fisrDay === 7) {
          num++
          fisrDay = 0
        }
      }
      this.dataForm = tempArr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table th>.cell {
    text-align: center;
  }
</style>
