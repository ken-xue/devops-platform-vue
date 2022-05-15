<template>
  <el-drawer title="详情" top="3vh" :visible.sync="open" size="80%" append-to-body
             destroy-on-close @close=closeDialog :close-on-click-modal="false">
    <el-container class="flowChartWrap">
      <el-main>
        <el-container>
          <el-container>
            <!-- 2.2.1 flow面板 -->
            <el-main class="main">
              <!-- 2.2.1.1操作按钮 -->
              <div id="mainMenu" v-if="!infoVisible">
                <div class="tool-left">
                  <el-button size="small" v-text="pipelineName"></el-button>
                </div>
                <div class="tool-right">
                  <el-tooltip content="放大">
                    <el-button icon="el-icon-zoom-in" @click="zoomOut" circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="缩小">
                    <el-button icon="el-icon-zoom-out" @click="zoomIn" circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="自动布局">
                    <el-button icon="el-icon-bangzhu" circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="适应画布">
                    <el-button icon="el-icon-money" circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="全屏">
                    <el-button icon="el-icon-full-screen" circle></el-button>
                  </el-tooltip>
                </div>
              </div>
              <!-- 2.2.1.2 画布容器 -->
              <div class="mainContainer" @drop="dropHandle" @dragover="dragoverHandle">
                <div id="mainContainer" @click="clickBgHandle"></div>
              </div>
              <!--节点执行日志-->
              <log v-if="nodeExecuteLogVisible" ref="Log"></log>
              <NodeView v-if="nodeViewVisible" ref="View"></NodeView>
            </el-main>
            <!-- 2.2.2 组件属性设置 -->
<!--            <el-aside width="300px" class="right">-->
<!--              <el-container id="mainNodeInfo">-->
<!--                <el-main>-->
<!--                  <div>-->
<!--                    <div v-show="toolBarShow==='component'">-->
<!--                      <div v-show="isShowNode">-->
<!--                        <div class="title">基本信息</div>-->
<!--                        <div class="model-attr">-->
<!--                          <p>-->
<!--                            <span class="item">所属应用</span>-->
<!--                            <span class="value" v-text="applicationName">Test</span>-->
<!--                          </p>-->
<!--                          <p v-if="pipelineId">-->
<!--                            <span class="item">创建日期</span>-->
<!--                            <span class="value" v-text="">2019-04-19 12:14:39</span>-->
<!--                          </p>-->
<!--                          <p>-->
<!--                            <span class="item">流水线名称</span>-->
<!--                            <el-input size="small" v-model="pipelineName"></el-input>-->
<!--                          </p>-->
<!--                          <p>-->
<!--                            <span class="item">描述</span>-->
<!--                            <el-input type="textarea" :rows="10" size="small" v-model="description"></el-input>-->
<!--                          </p>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div v-show="isShowNodeConfig">-->
<!--                        <div class="title">节点配置</div>-->
<!--                        &lt;!&ndash;                        <div class="node-attr">&ndash;&gt;-->
<!--                        &lt;!&ndash;                          <p>&ndash;&gt;-->
<!--                        &lt;!&ndash;                            <span class="item">节点ID</span>&ndash;&gt;-->
<!--                        &lt;!&ndash;                            <span class="value">{{ currentNodeId }}</span>&ndash;&gt;-->
<!--                        &lt;!&ndash;                          </p>&ndash;&gt;-->
<!--                        &lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                        <div class="model-attr">-->
<!--                          <java-build ref="JavaBuild" v-if="javaBuildVisible"></java-build>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    &lt;!&ndash;                    <div v-show="toolBarShow==='message'">&ndash;&gt;-->
<!--                    &lt;!&ndash;                      <div class="title">执行记录</div>&ndash;&gt;-->
<!--                    &lt;!&ndash;                      <div>&ndash;&gt;-->
<!--                    &lt;!&ndash;                        <el-card class="messageInfo" v-for="(m,idx) in messagesList" :key="idx">&ndash;&gt;-->
<!--                    &lt;!&ndash;                          <p>{{ m.time }}</p>&ndash;&gt;-->
<!--                    &lt;!&ndash;                          <div>&ndash;&gt;-->
<!--                    &lt;!&ndash;                            <i class="el-icon-circle-close" style="color:red;font-size:26px;position:relative;top:5px;"></i>&ndash;&gt;-->
<!--                    &lt;!&ndash;                            {{ m.message }}&ndash;&gt;-->
<!--                    &lt;!&ndash;                          </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;                        </el-card>&ndash;&gt;-->
<!--                    &lt;!&ndash;                      </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                  </div>-->
<!--                </el-main>-->
<!--                &lt;!&ndash;                <el-aside width="32px"&ndash;&gt;-->
<!--                &lt;!&ndash;                          class="nodeInfoToolBar">&ndash;&gt;-->
<!--                &lt;!&ndash;                  <div :class="{'tool':true, 'component':true, 'acitve': toolBarShow==='component'}"&ndash;&gt;-->
<!--                &lt;!&ndash;                       @click="toolBarShow='component'">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <i class="el-icon-tickets"></i>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <span> 组件参数</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                  <div :class="{'tool':true, 'message':true, 'acitve': toolBarShow==='message'}"&ndash;&gt;-->
<!--                &lt;!&ndash;                       @click="toolBarShow='message'">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <i class="el-icon-chat-dot-round"></i>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <span> 执行记录</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                </el-aside>&ndash;&gt;-->
<!--              </el-container>-->
<!--            </el-aside>-->
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </el-drawer>
</template>
<script>
import Vue from 'vue';
import ComponentTree from '@/views/pipeline/menu.vue';
import FlowChart from '@/views/pipeline/flowchart';
import PluginFlowExec from '@/views/pipeline/pluginflowexec';
import instance from '@/views/pipeline/instance';
import JavaBuild from "@/views/pipeline/config/java-build";
import {info as loggerInfo} from '@/views/pipeline/record/record.js';
import Log from "@/views/pipeline/log/log";
import NodeView from "@/views/pipeline/node/nodeview";

FlowChart.use(PluginFlowExec);

export default Vue.extend({
  name: 'FlowInfo',
  components: {JavaBuild, ComponentTree,Log,NodeView},
  props: {
    sidebarComponentName: String,
  },
  data() {
    return {
      isShowNode: true,
      isShowNodeConfig: false,
      open: false,
      infoVisible: false,
      nodeTreeVisible: true,
      javaBuildVisible: false,
      nodeViewVisible: false,
      nodeExecuteLogVisible: false,
      pipelineId: '',
      pipelineName: '',
      currentNodeId: '',
      isUndoDisable: true,
      isExecDisable: false,
      applicationUuid: '',
      applicationName: '',
      executeLoggerUuid: '',
      activeName: 'first',
      toolBarShow: 'component',
      modelName: '你你您',
      description: '描述',
      dialogTableVisible: false
    };
  },
  methods: {
    init(id) {
      this.open = true
      loggerInfo(id).then(response => {
        if (response.code === 2000) {
          const data = response.data
          this.executeLoggerUuid = data.uuid;
          this.pipelineName = response.data.pipelineName
          instance.reset()
          FlowChart.setContainer('mainContainer');
          FlowChart.on('commandListEmpty', () => {
            this.isUndoDisable = true;
          });
          FlowChart.on('showNodeLogger', (nodeId) => {
            this.showNodeExecuteLog(nodeId)
          });
          FlowChart.on('showNodeData', (nodeId) => {
            this.showNodeExecuteView(nodeId)
          });
          FlowChart.on('addCommand', () => {
            this.isUndoDisable = false;
          });
          FlowChart.on('selectNode', (data) => {
            this.isShowNode = false
            this.isShowNodeConfig = true
            this.currentNodeId = data;
            let nodeData = FlowChart.getNodeDataByNodeId(data)
            console.log('data=' + JSON.stringify(nodeData))
            const name = nodeData.name;
            console.log('click node =' + name)
            switch (name) {
              case 'JAVA_BUILD':
                this.javaBuildVisible = true
                this.$nextTick(() => {
                  this.$refs.JavaBuild.init(this.currentNodeId)
                })
                this.isShowNode = false
                break;
              default:
                this.isShowNode = true;
                this.isShowNodeConfig = false
            }
          });
          FlowChart.loadData(JSON.parse(response.data.graphContent))
        } else {
          this.msgError(response.msg)
        }
      });
    },
    dragoverHandle(ev) {
      ev.preventDefault();
    },
    dropHandle(ev) {
      FlowChart.addNode({pageX: ev.pageX, pageY: ev.pageY}, ev.dataTransfer.getData('target'));
    },
    clickBgHandle() {
      this.isShowNode = true
      this.isShowNodeConfig = false
    },
    zoomOut() {
      FlowChart.zoomOut();
    },
    zoomIn() {
      FlowChart.zoomIn();
    },
    undo() {
      FlowChart.undo();
    },
    closeDialog() {
      this.$emit('refreshDataList')
    },
    //查看当前节点的执行日志
    showNodeExecuteLog(nodeId) {
      this.nodeExecuteLogVisible = true
      this.$nextTick(() => {
        this.$refs.Log.init(nodeId,this.executeLoggerUuid)
      })
    },
    showNodeExecuteView(nodeId){
      this.nodeViewVisible = true
      this.$nextTick(() => {
        this.$refs.View.init(nodeId,this.executeLoggerUuid)
      })
    }
  },
});
</script>

<style lang="scss" scoped>
.flowChartWrap {
  height: 650px;

  .left {
    border-right: 1px solid #e5e5e5;
    height: 100%;

    .el-tree {
      height: calc(100% - 40px);
      overflow-y: auto;
    }
  }

  .right {
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    margin-bottom: 0px;
  }

  .el-main {
    padding: 0px !important;
  }

  .main {
    #mainMenu {
      height: 41px;
      border-bottom: 1px solid #e1e1e1;
      border-top: 1px solid #e1e1e1;

      .tool-left {
        float: left;

        .el-button {
          &:first-child {
            margin-left: 10px;
          }

          border: none;
          margin-top: 4px;
        }
        span {
          margin-left: 10px;
          border: none;
          margin-top: 4px;
        }
      }

      .tool-right {
        float: right;

        .el-button {
          position: relative;
          border: none;
          margin: 3px 0 0 0;

          &:last-child {
            margin-right: 10px;
          }

          background: transparent;
        }
      }
    }

    .mainContainer {
      height: calc(100% - 42px);
      position: relative;
      overflow: hidden;
      outline: none !important;

      #mainContainer {
        outline: none !important;
        height: 100%;
        width: 100%;
        position: relative;
      }
    }
  }

  #mainNodeInfo {
    .nodeInfoToolBar {
      margin-bottom: 0px;
      border-left: 1px solid #e5e5e5;
      overflow: hidden;

      .tool {
        padding: 8px 0;
        writing-mode: vertical-rl;
        line-height: 32px;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        &.acitve {
          background: #eee;
        }

        span {
          margin: 5px 0;
        }
      }
    }

    .title {
      border-bottom: 1px solid #e5e5e5;
      height: 40px;
      font-size: 12px;
      // color: #999;
      line-height: 40px;
      text-align: center;
    }

    .model-attr {
      padding: 10px;

      .item {
        font-size: 12px;
      }

      .value {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
      }

      .el-input {
        margin-top: 5px;
      }

      textarea {
        margin-top: 5px;
        font-family: inherit;
      }
    }

    .node-attr {
      padding: 10px;

      .item {
        font-size: 12px;
      }

      .value {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
      }
    }

    .messageInfo {
      padding: 0px;
      margin: 10px;
      color: #333;
      font-size: 14px;

      .el-card__body {
        padding: 10px;
      }

      p {
        padding: 0;
        margin: 0;
        font-size: 12px;
      }
    }
  }

  .el-aside {
    background: #f8f8f8;
    padding: 0px 0px;

    .search {
      height: 42px;
      background-color: #f3f3f3;
      //padding: 8px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;

      .el-input {
        height: 24px;

        .el-input__inner {
          height: 42px;
        }
      }

      .el-input__prefix {
        top: 5px;
      }

      .el-input--small .el-input__icon {
        line-height: 24px;
      }
    }

    .el-tree {
      background: transparent;
    }
  }

  .el-container {
    height: 100%;
  }

  .tabsNav {
    padding: 0;

    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-top: 3px solid #01c1de;
      border-radius: 0;
    }

    .el-tabs__item.is-active {
      color: #333 !important;
    }

    .el-tabs__item {
      font-size: 12px;
    }

    .el-tabs__item:focus.is-active.is-focus:not(:active) {
      box-shadow: none !important;
    }
  }

  .el-tree-node__content,
  .el-tree-node {
    min-height: 38px !important;
  }

  .leafNode {
    .node::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 3px;
      border-radius: 2px;
      padding: 13px 2px;
      background: transparent;
    }

    &:hover span.node {
      border: 1px solid #1c9bec !important;
      background: #fff;

      &::before {
        background: #1c9bec;
      }
    }
  }
}
</style>
