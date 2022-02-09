<template>
  <el-container class="indexWrap">
    <el-aside width="48px"
              class="fy_el-aside">
      <el-menu :default-active="sidebarComponentName"
               background-color="transparent"
               text-color="#9aaeba"
               active-text-color="#9aaeba"
               :collapse="true"
               @select="handleSelect">
        <el-menu-item index="ComponentTree">
          <div style="margin-left: 0px!important;margin-right: 40px!important;">
            <i class="el-icon-menu"> 组件</i>
            <span slot="title">组件</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div v-if="sidebarComponentName === 'home'">{{sidebarComponentName}}</div>
      <div v-if="sidebarComponentName === 'setting'">{{sidebarComponentName}}</div>
      <FlowChart v-if="isFlowChartView" :sidebarComponentName="sidebarComponentName"></FlowChart>
    </el-main>
  </el-container>
</template>

<script>
import FlowChart from './flowChartCanvas';

export default {
  name: 'flowChartIndex',
  components: { FlowChart },
  data() {
    return { sidebarComponentName: 'ExperimentTree' }; // 默认展示组件
  },
  computed: {
    isFlowChartView() {
      return ['ExperimentTree', 'ComponentTree'].includes(this.sidebarComponentName);
    },
  },
  methods: {
    handleSelect(name) {
      this.sidebarComponentName = name;
    },
  },
};
</script>

<style lang="scss">
.indexWrap{
  .fy_el-aside {
    background: #dcdee5;
    width: 148px!important;
    padding: 1px 1px!important;
    margin: 1px 1px!important;
    overflow-x: hidden;
    .el-menu--collapse {
      width: 148px;
      .el-menu-item {
        padding-left: 0 !important;
        margin-left: 0 !important;
        padding: 0px !important;
        height: 48px;
        text-align: center;
        line-height: 48px;
        &:first-child {
          i {
            color: #fff !important;
          }
        }
        &.is-active {
          .el-tooltip {
            background: #aeb0bb;
            &::after {
              content: "";
              width: 3px;
              background: #00c1de;
              height: 48px;
              display: block;
              position: absolute;
              top: 0;
            }
          }
        }
        .el-tooltip {
          padding: 0 !important;
        }
      }
    }
  }
  .el-main{
    padding: 0;
    min-height: 450px;
  }
}

</style>
