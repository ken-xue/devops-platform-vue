<template>
  <el-drawer title="数据" size="75%"  :visible.sync="nodeViewVisible" append-to-body :destroy-on-close="true">
    <el-card class="box-card">
      <div style="height: calc(100vh - 50px)">
        <h1>Node View</h1>
      </div>
    </el-card>
  </el-drawer>
</template>

<script>
export default {
  name: "node-view",
  data(){
    return{
      nodeViewVisible: false
    }
  },
  methods: {
    init(nodeUUID, executeLoggerUUID) {
      this.nodeViewVisible = true
      //查询节点数据
    }
  }
}
</script>

<style scoped>

</style>
