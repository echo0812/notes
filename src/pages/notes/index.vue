<template>
  <div>
    <el-row>
      <el-col :span="3" v-for="(item, index) in noteList" :key="index">
        <el-card style="width: 90%; margin: 20px 0;">
          <img src="https://box.kancloud.cn/cover_csnikey_fe-tech.jpg-bookmiddle" class="image" @click="goDetail(item.id)">
          <div>
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <!-- <router-link :to="item.id"></router-link> -->
              <time class="time">{{ (new Date()).setTime(item.create_time).toLocaleDateString }}</time>
              <el-button type="text" class="button">{{item.description}}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      // 笔记列表
      noteList: []
    }
  },
  created() {
    this.$http.get('/api/notes/getNotes').then((response) => {
      console.log(response);
      this.noteList = response.data
    })
  },
  methods: {
    goDetail (id) {
      this.$router.push({path: '/notes/detail', query: {id: id}})
    }
  }
}

</script>
<style scoped lang="less">
/*引入css*/

@import 'http://itclubs.cn/common/markdown/editormd.css';
#markdown1 {
  width: 100%;
}

.note {
  a {
    color: #888;
    text-decoration: none;
  }
  .el-menu {
    background: #111;
    .el-submenu .el-menu-item {
      background: #111;
      color: deeppink;
    }
  }
}
.title {
  color: #333;
  font-size: 16px;
  line-height: 55px;
  font-weight: 700;
}

</style>
