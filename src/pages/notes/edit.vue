<template>
  <div>
    <el-row>
      <div class="title" style="height: 48px; line-height： 48px; text-align: left; padding: 0 .8em;">
        AXIOS使用手册
      </div>
      <span></span>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="note" :style="{width: '100%', background: '#111', height: mdHeight - 48 + 'px'}">
          <el-menu style="text-align: left;" v-for="(item, index) in navList" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu :index="index.toString()">
              <template slot="title">
                <!-- <i class="el-icon-message"></i> -->
                <span slot="title">{{item.label}}</span>
              </template>
              <el-menu-item :index="index + '-'+ index1" v-for="(item1, index1) in item.children">
                <!-- 跳转到对应位置 -->
                <a href="javascript:void(0)" @click="goAnchor(item1.label)">{{item1.label}}</a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div id="markdown1">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      md: '',
      mdHeight: document.documentElement.clientHeight,
      // markdown主题切换
      mdTheme: {
        theme: "dark",
        previewTheme: "dark",
        editorTheme: "pastel-on-dark"
      },
      isCollapse: false,
      Editor: '',
      radio: 1,
      navList: []
    }
  },
  mounted() {
    let _this = this
    _this.testEditor = editormd("markdown1", {
      width: "100%",
      height: _this.mdHeight - 1 -48,
      path: 'http://itclubs.cn/common/markdown/lib/',
      // theme : "dark",
      markdown: _this.md,
      codeFold: true,
      theme: _this.mdTheme.theme,
      previewTheme: _this.mdTheme.previewTheme,
      editorTheme: _this.mdTheme.editorTheme,
      //syncScrolling : false,
      saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
      searchReplace: true,
      watch: true, // 关闭实时预览
      htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启
      toolbar: false, //关闭工具栏
      //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
      emoji: true,
      taskList: true,
      tocm: true, // Using [TOCM]
      tex: true, // 开启科学公式TeX语言支持，默认关闭
      flowChart: true, // 开启流程图支持，默认关闭
      sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
      onload: function() {
        _this.$http.get('http://itclubs.cn/test.md').then(result => {
          if (result.status === 200) {
            _this.md = result.data
            this.setMarkdown(result.data)
            this.previewing()
            _this.delMd()
            setTimeout(() => {
              $('#markdown1 h2').each(function(index, el) {
                $(this).find('a').attr('id',$(this).find('a').attr('name'))
              });
            }, 1000)
          } else {
            _this.$message.error('network error, please try to refresh window or click F5....')
          }
        }).catch(error => console.log(error))
      }
    })
  },
  created() {
    console.log('created')
  },
  methods: {
    submitData() {
      let md = this.testEditor.getMarkdown()
      this.$http.post('/api/notes/addNotes', {
        md: md,
      }).then((response) => {
        console.log(response);
      })
    },
    choseTheme(value) {
      console.log(this.radio)
    },
    delMd() {
      let temp = []
      let num = -1
      if (this.md !== '') {
        var pattern = /#(.+?)\n/g;
        var arr = this.md.match(pattern)
        if (arr.length > 0) {
          for (let i in arr) {
            let len = arr[i].split('#').length
            // 匹配h1
            if (len === 2) {
              num++
              temp[num] = {
                label: arr[i].replace(/#|\r\n/g, ''),
                value: arr[i].replace(/#|\r\n/g, ''),
                children: []
              }
            }
            // 匹配h2
            if (len === 3) {
              if (temp[num].children !== undefined) {
                temp[num].children.push({
                  label: arr[i].replace(/#|\r\n/g, ''),
                  value: arr[i].replace(/#|\r\n/g, ''),
                })
              }
            }
          }
        }
      }
      this.navList = temp
    },
    // 获取字符串中某个字符的个数
    getStringOfNum() {
      var str = "abbbbbsdsdsdasdlsfj";
      var c = "b"; // 要计算的字符
      var regex = new RegExp(c, 'g'); // 使用g表示整个字符串都要匹配
      var result = str.match(regex);
      var count = !result ? 0 : result.length;
      console.log(c + " 的数量为 " + count);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goAnchor(selector) {
      var targetOffset = $('#' + selector).offset().top
      $('.editormd-preview').animate({
        scrollTop: targetOffset
      },800);
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
    .el-submenu .el-menu-item{
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
