<template>
  <el-dialog title="控制面板" :visible.sync="open" width="90%" append-to-body @close="cancel">
    <h1>控制面板</h1>
    <h1>命名空间</h1>
    <h1>Pod列表</h1>
  </el-dialog>
</template>

<script>
import {list as searchHostList} from "@/api/machine/machine";
import logger from "@/views/kubernetes/logger";

export default {
  name: 'control-panel',
  components: {logger},
  data() {
    return {
      // 遮罩层
      loading: true,
      open: false,
      isEdit: false,
      searchLoading: false,
      submitLoading: false,
      loggerVisible: false,
      // 类型数据字典
      typeOptions: [],
      dataList: [],
      hostList: [],
      slaveHostList: [],
      masterHostList: [],
      // 表单参数
      form: {},
      kubernetesVersions: [
        {value: '1.21', label: '1.21'},
        {value: '1.24', label: '1.24'},
      ],
      kubernetesRuntime: [
        {value: 'Docker', label: 'Docker'},
        {value: 'Containerd', label: 'Containerd'},
      ],
      // 表单校验
      rules: {
        name: [{required: true, message: '集群名称不能为空', trigger: 'blur'}],
        version: [{required: true, message: '版本不能为空', trigger: 'blur'}],
        runtime: [{required: true, message: 'Runtime不能为空', trigger: 'blur'}],
        masterHostList: [{required: true, message: '节点不能为空', trigger: 'blur'}],
        slaveHostList: [{required: true, message: '节点不能为空', trigger: 'blur'}]
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    init(row) {
      this.open = true
    },
    disableMaster(item) {
      for (let i = 0; i < this.form.slaveHostList.length; i++) {
        if (item.uuid === this.form.slaveHostList[i]) return true;
      }
      return false
    },
    disableSlave(item) {
      for (let i = 0; i < this.form.masterHostList.length; i++) {
        if (item.uuid === this.form.masterHostList[i]) return true;
      }
      return false
    },
    getHostList(name) {
      this.searchLoading = true
      searchHostList({'name': name}).then(response => {
        if (response.code === 2000) {
          this.hostList = response.data
        } else {
          this.msgError(response.msg)
        }
        this.searchLoading = false
      })
    },
    getSlaveHostList(name) {
      this.searchLoading = true
      searchHostList({'name': name}).then(response => {
        if (response.code === 2000) {
          this.slaveHostList = response.data
        } else {
          this.msgError(response.msg)
        }
        this.searchLoading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        name: undefined,
        version: undefined,
        slaveHostList: [],
        masterHostList: []
      }
      this.resetForm('form')
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.loggerVisible = true
          this.$nextTick(() => {
            this.$refs.logger.init(this.form)
          })
        }
      })
    }
  }
}
</script>
