<template>
  <div style="width: 100%" v-if="visible">
    <el-form ref="form" :model="form" :rules="rules" label-position="top" size="mini">
      <el-row>
        <el-col :span="24">
          <el-form-item label="下载路径" prop="packagePath">
                <span slot="label">
                  下载路径
                  <el-tooltip placement="top">
                    <div slot="content">
                      下载路径示例：/home/admin/cicd_platform
                    </div>
                    <i class="el-icon-question"/>
                  </el-tooltip>
                </span>
            <el-input v-model="form.packagePath" placeholder="请输入下载路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="部署脚本" prop="deployScript">
            <div style="width: 100%;overflow-x: scroll">
              <AceEditor
                width="100%"
                height="150px"
                :fontSize="14"
                :showPrintMargin="true"
                :showGutter="true"
                :highlightActiveLine="true"
                mode="sh"
                theme="monokai"
                :onChange="onChange"
                v-model="form.deployScript"
                name="editor"
                :editorProps="{$blockScrolling: true}"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="通知" prop="notice">
            <el-select v-model="form.notice" placeholder="请选择通知方式" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in noticeWays" :key="index" :label="item.label" :value="item.value"
                         :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </div>
</template>

<script>
// see https://www.npmjs.com/package/vue2-brace-editor
import {Ace as AceEditor, Split as SplitEditor} from 'vue2-brace-editor';

import 'brace/mode/sh';
import 'brace/theme/monokai';

import {nodeInfo, addNodeInfo, updateNodeInfo} from '@/api/app/pipeline'

export default {
  name: "host-deploy",
  components: {
    AceEditor,
    SplitEditor,
  },
  data() {
    return {
      visible: false,
      nodeUuid: '',
      form: {
        deployScript: '# 解压缩到指定目录中，再执行启动脚本（通常在代码中维护，如示deploy.sh \n\n # tar zxvf /home/admin/app/package.tgz -C /home/admin/app/\n # sh /home/admin/app/deploy.sh restart\n '
      },
      radio: 1,
      JDKVersions: [
        {value: 'JDK 1.7', label: 'JDK 1.7'},
        {value: 'JDK 1.8', label: 'JDK 1.8'},
        {value: 'JDK 1.9', label: 'JDK 1.9'},
        {value: 'OPENJDK 10', label: 'OPENJDK 10'},
        {value: 'OPENJDK 11', label: 'OPENJDK 11'},
        {value: 'JDK 17', label: 'JDK 17'},
      ],
      mavenVersions: [
        {value: 'MAVEN 3.6', label: 'MAVEN 3.6'},
        {value: 'MAVEN 3.7', label: 'MAVEN 3.7'},
      ],
      noticeWays: [
        {value: 'DING_DING', label: '钉钉'},
        {value: 'EMAIL', label: '邮件'},
      ],
      rules: {
        jdk: [{required: true, message: 'jdk版本不能为空', trigger: 'blur'}],
        mvn: [{required: true, message: 'maven版本不能为空', trigger: 'blur'}],
        deployScript: [{required: true, message: '构建命令不能为空', trigger: 'blur'}],
        packagePath: [{required: true, message: '打包路径不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    init(nodeUuid) {
      // TODO: need reset form
      this.nodeUuid = nodeUuid
      nodeInfo(nodeUuid).then(response => {
        if (response.data) {
          this.form = JSON.parse(response.data.info)
        }
        this.visible = true
      })
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 构建数据json
          let info = {
            'nodeUuid': this.nodeUuid,
            'info': JSON.stringify(this.form)
          }
          if (this.form.id !== undefined) {
            updateNodeInfo({'pipelineNodeInfoDTO': info}).then(response => {
              if (response.code === 2000) {
                this.msgSuccess('修改成功')
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addNodeInfo({'pipelineNodeInfoDTO': info}).then(response => {
              if (response.code === 2000) {
                this.msgSuccess('新增成功')
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    onChange(){

    }
  }
}
</script>

<style scoped>

</style>
