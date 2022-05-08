<template>
  <el-drawer title="数据探查-（仅显示前100条）" :visible.sync="nodeExecuteLogVisible" append-to-body>
    <el-table :data="gridData">
      <el-table-column property="date" label="日期" width="150"></el-table-column>
      <el-table-column property="name" label="姓名" width="200"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogTableVisible = false">复 制</el-button>
      <el-button @click="dialogTableVisible = false">取 消</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "log",
  data(){
    return{
      nodeExecuteLogVisible: false,
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }],
    }
  },
  methods: {
    init(){
      this.nodeExecuteLogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
