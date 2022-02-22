<template>
  <div style="padding-top: 20px">
    <el-row gutter="30">
      <el-col span="10">
        <el-card class="custom-tree-container">
          <el-tree
            :data="tree"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="lazyLeaf">
          <span class="custom-tree-node" slot-scope="{ node, data }">
             <span v-if="data.children.length > 0" style="color: indianred">
                <i class="el-icon-folder"></i>
               {{ node.label }}
            </span>
            <span v-if="data.children.length < 1" style="color: #67C23A">
                <i class="el-icon-tickets"></i>
               {{ node.label }}
            </span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            <i class="el-icon-plus"></i>添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            <i class="el-icon-minus"></i>修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            <i class="el-icon-minus"></i>删除
          </el-button>
        </span>
      </span>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>

    <!--添加子节点弹框-->
    <el-dialog
      title="添加节点"
      :visible.sync="addChildNodeDialog"
      width="30%"
      center>
      <el-form :model="zkNodeForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="zkNodeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="节点数据" prop="name">
          <el-input v-model="zkNodeForm.data"></el-input>
        </el-form-item>
        <el-form-item label="节点类型" prop="name">
          <el-input v-model="zkNodeForm.type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="addZkNode">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {addZkNode, connect, lazyLeaf} from "@/api/base/zk";

export default {
  name: "index",
  data() {
    return {
      tree: [],
      clickPath: '',
      nodeArray: [],
      addChildNodeDialog:false,
      addZkNodeData:{},
      zkNodeForm:{
        name:'',
        data:'',
        type: 1,
      }
    }
  },
  created() {
    let connectInfo = {
      ip: '116.198.160.39',
      port: 2182
    }
    connect(connectInfo).then(res => {
      this.tree = res.data
    }).catch(err => {
      this.$message.error(err)
    })
  },

  methods: {
    addZkNode(){
      console.log("data  "+JSON.stringify(this.addZkNodeData))
      let data = this.zkNodeForm;
      data.name = this.addZkNodeData.parentId + "/" + this.zkNodeForm.name
      addZkNode(data).then(res => {
        if (res.code === 2000){
            this.$message.success("添加成功")
            this.addChildNodeDialog = false
            this.zkNodeForm = {}
        }
      }).catch(err => {

      })
    },

    //添加节点
    append(data) {
      this.addZkNodeData = data
      this.addChildNodeDialog = true
    },

    //懒加载子节点
    lazyLeaf(nodeInfo) {
      if (nodeInfo.parentId === "/") {
        this.clickPath = nodeInfo.id
      } else {
        this.clickPath = nodeInfo.parentId
      }
      let node = {
        id: this.clickPath
      }
      lazyLeaf(node).then(res => {
        let nodeArr = res.data;
        if (nodeArr.length > 0) {
          this.nodeArray = nodeArr;
          this.iteratorTree(this.tree);
        }
      }).catch(err => {

      })
    },

    //递归节点并判断
    iteratorTree(tree) {
      for (let i = 0; i < tree.length; i++) {
        if ((tree[i].parentId === "/" ? tree[i].id : tree[i].parentId) === this.clickPath) {
          tree[i].children = this.nodeArray;
          return 1;
        } else {
          if (tree[i].children.length > 0) {
            this.iteratorTree(tree[i].children)
          }
        }
      }
    },
  },

}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
