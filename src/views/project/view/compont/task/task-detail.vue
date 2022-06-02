<template>
  <el-dialog title="任务" top="3vh" :visible.sync="visible" width="70%" append-to-body :destroy-on-close="true" @close=closeDialog :close-on-click-modal="false">
  <div>
    <el-container>
      <el-main>Main</el-main>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
  </div>
  </el-dialog>
</template>

<script>
export default {
  name: "task-detail",
  data() {
    return {
      visible: false,
      taskDetailVisible: false,
    }
  },
  methods:{
    init(data){
      this.visible = true

    },
    closeDialog(){

    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  margin-bottom: 0px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
