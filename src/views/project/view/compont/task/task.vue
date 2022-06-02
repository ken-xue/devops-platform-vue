<template>
  <div class="task-row">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>任务组1</span>
        <el-popover
          placement="bottom"
          title="操作"
          width="200"
          trigger="manual"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          v-model="visible">
          <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-more-outline" slot="reference"
                     @click="visible = !visible"></el-button>
        </el-popover>
      </div>
      <div class="text item">
        <el-card shadow="never" class="task-card">
          <div>
            <div>
              <div style="display: inline;line-height: 30px">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
              <div style="display: inline">
                <span class="task-title">开发项目管理模块</span>
              </div>
              <div style="display: inline;float:right;margin-top: 0px;">
                <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
            </div>
            <div class="task-line">
              开始时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              截止时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              <div style="display: inline">
                <span>完成量：4/8</span>
              </div>
              <div style="float:right;display: inline">
                <el-icon name="chat-dot-square"></el-icon><span style="margin-left: 8px;margin-right: 3px">33</span>
              </div>
            </div>
            <div class="task-line">
            </div>
            <div class="task-line">标签
              <el-tag size="mini" style="margin-left: 3px">标签一</el-tag>
              <el-tag size="mini" type="success" style="margin-left: 3px">标签二</el-tag>
              <el-tag size="mini" type="info" style="margin-left: 3px">标签三</el-tag>
            </div>
          </div>
          <el-progress style="margin-bottom: 0px" :percentage="50" format="0"></el-progress>
        </el-card>
          <el-button @click="detail" icon="el-icon-circle-plus-outline" style="width: 100%;">添加新任务</el-button>
      </div>
    </el-card>

<!--    模拟-->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>任务组1</span>
        <el-popover
          placement="bottom"
          title="操作"
          width="200"
          trigger="manual"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          v-model="visible">
          <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-more-outline" slot="reference"
                     @click="visible = !visible"></el-button>
        </el-popover>
      </div>
      <div class="text item">
        <el-card shadow="never" class="task-card">
          <div>
            <div>
              <div style="display: inline;line-height: 30px">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
              <div style="display: inline">
                <span class="task-title">开发项目管理模块</span>
              </div>
              <div style="display: inline;float:right;margin-top: 0px;">
                <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
            </div>
            <div class="task-line">
              开始时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              截止时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              <div style="display: inline">
                <span>完成量：4/8</span>
              </div>
              <div style="float:right;display: inline">
                <el-icon name="chat-dot-square"></el-icon><span style="margin-left: 8px;margin-right: 3px">33</span>
              </div>
            </div>
            <div class="task-line">
            </div>
            <div class="task-line">标签
              <el-tag size="mini" style="margin-left: 3px">标签一</el-tag>
              <el-tag size="mini" type="success" style="margin-left: 3px">标签二</el-tag>
              <el-tag size="mini" type="info" style="margin-left: 3px">标签三</el-tag>
            </div>
          </div>
          <el-progress style="margin-bottom: 0px" :percentage="50" format="0"></el-progress>
        </el-card>
        <el-card class="task-card" shadow="never">
          <div>
            <div>
              <div style="display: inline;line-height: 30px">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
              <div style="display: inline">
                <span class="task-title">开发项目管理模块</span>
              </div>
              <div style="display: inline;float:right;margin-top: 0px;">
                <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
            </div>
            <div class="task-line">
              开始时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              截止时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              <div style="display: inline">
                <span>完成量：4/8</span>
              </div>
              <div style="float:right;display: inline">
                <el-icon name="chat-dot-square"></el-icon><span style="margin-left: 8px;margin-right: 3px">33</span>
              </div>
            </div>
            <div class="task-line">
            </div>
            <div class="task-line">标签
              <el-tag size="mini" style="margin-left: 3px">标签一</el-tag>
              <el-tag size="mini" type="success" style="margin-left: 3px">标签二</el-tag>
              <el-tag size="mini" type="info" style="margin-left: 3px">标签三</el-tag>
            </div>
          </div>
          <el-progress style="margin-bottom: 0px" :percentage="50" format="0"></el-progress>
        </el-card>
        <el-card class="task-card" shadow="never">
          <div>
            <div>
              <div style="display: inline;line-height: 30px">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
              <div style="display: inline">
                <span class="task-title">开发项目管理模块</span>
              </div>
              <div style="display: inline;float:right;margin-top: 0px;">
                <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
            </div>
            <div class="task-line">
              开始时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              截止时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              <div style="display: inline">
                <span>完成量：4/8</span>
              </div>
              <div style="float:right;display: inline">
                <el-icon name="chat-dot-square"></el-icon><span style="margin-left: 8px;margin-right: 3px">33</span>
              </div>
            </div>
            <div class="task-line">
            </div>
            <div class="task-line">标签
              <el-tag size="mini" style="margin-left: 3px">标签一</el-tag>
              <el-tag size="mini" type="success" style="margin-left: 3px">标签二</el-tag>
              <el-tag size="mini" type="info" style="margin-left: 3px">标签三</el-tag>
            </div>
          </div>
          <el-progress style="margin-bottom: 0px" :percentage="50" format="0"></el-progress>
        </el-card>
          <el-button @click="detail" icon="el-icon-circle-plus-outline" style="width: 100%;">添加新任务</el-button>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>任务组1</span>
        <el-popover
          placement="bottom"
          title="操作"
          width="200"
          trigger="manual"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          v-model="visible">
          <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-more-outline" slot="reference"
                     @click="visible = !visible"></el-button>
        </el-popover>
      </div>
      <div class="text item">
        <el-card shadow="never" class="task-card">
          <div>
            <div>
              <div style="display: inline;line-height: 30px">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
              <div style="display: inline">
                <span class="task-title">开发项目管理模块</span>
              </div>
              <div style="display: inline;float:right;margin-top: 0px;">
                <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
            </div>
            <div class="task-line">
              开始时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              截止时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              <div style="display: inline">
                <span>完成量：4/8</span>
              </div>
              <div style="float:right;display: inline">
                <el-icon name="chat-dot-square"></el-icon><span style="margin-left: 8px;margin-right: 3px">33</span>
              </div>
            </div>
            <div class="task-line">
            </div>
            <div class="task-line">标签
              <el-tag size="mini" style="margin-left: 3px">标签一</el-tag>
              <el-tag size="mini" type="success" style="margin-left: 3px">标签二</el-tag>
              <el-tag size="mini" type="info" style="margin-left: 3px">标签三</el-tag>
            </div>
          </div>
          <el-progress style="margin-bottom: 0px" :percentage="50" format="0"></el-progress>
        </el-card>
        <el-card class="task-card" shadow="never">
          <div>
            <div>
              <div style="display: inline;line-height: 30px">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
              <div style="display: inline">
                <span class="task-title">开发项目管理模块</span>
              </div>
              <div style="display: inline;float:right;margin-top: 0px;">
                <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
            </div>
            <div class="task-line">
              开始时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              截止时间:2022-06-02 14:46:35
            </div>
            <div class="task-line">
              <div style="display: inline">
                <span>完成量：4/8</span>
              </div>
              <div style="float:right;display: inline">
                <el-icon name="chat-dot-square"></el-icon><span style="margin-left: 8px;margin-right: 3px">33</span>
              </div>
            </div>
            <div class="task-line">
            </div>
            <div class="task-line">标签
              <el-tag size="mini" style="margin-left: 3px">标签一</el-tag>
              <el-tag size="mini" type="success" style="margin-left: 3px">标签二</el-tag>
              <el-tag size="mini" type="info" style="margin-left: 3px">标签三</el-tag>
            </div>
          </div>
          <el-progress style="margin-bottom: 0px" :percentage="50" format="0"></el-progress>
        </el-card>
        <el-button @click="detail" icon="el-icon-circle-plus-outline" style="width: 100%;">添加新任务</el-button>
      </div>
    </el-card>

    <!--    新增列表-->
    <el-card shadow="never" class="create-box-card">
      <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-button icon="el-icon-circle-plus-outline" style="width: 100%">新建任务列表</el-button>
    </el-card>
    <task-detail v-if="taskDetailVisible" ref="TaskDetail"></task-detail>
  </div>
</template>

<script>
import TaskDetail from "@/views/project/view/compont/task/task-detail";
export default {
  name: "task",
  components: {TaskDetail},
  data() {
    return {
      visible: false,
      taskDetailVisible: false,
    }
  },
  methods:{
    detail(id){
      this.taskDetailVisible = true
      this.$nextTick(() => {
        this.$refs.TaskDetail.init(id)
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  display: inline-grid;
  width: 280px;
  margin-left: 20px;
}

.create-box-card {
  display: inline-grid;
  width: 280px;
  margin-left: 20px;
}

.task-row {
  white-space: nowrap;
  overflow-x: scroll;
  height: calc(100vh - 95px);
}

.task-title {
  font-weight: 800;
  margin-left: 8px;
}

.task-line {
  margin: 8px 0;
}

.task-card {
  margin-bottom: 30px;
}
</style>
