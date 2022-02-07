<template>
  <div>
    <el-card class="box-card">
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-position="left" label-width="98px">
        <el-form-item label="IP/服务器名" prop="applicationName">
          <el-input v-model="queryParams.applicationInfoDTO.applicationName" placeholder="请输入IP或者服务器名称" clearable size="small" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button v-permission="['sys:user:add']" type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
          <el-button v-permission="['sys:user:delete']" type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除
          </el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" prop="userId" width="55" :show-overflow-tooltip="true">
          <template slot-scope="props">
            <p v-text="props.$index+1" />
          </template>
        </el-table-column>
        <el-table-column label="服务器名" align="center" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="IP" align="center" prop="ip" :show-overflow-tooltip="true" />
        <el-table-column label="访问用户名" align="center" prop="accessUsername" width="100" />
        <el-table-column label="访问方式" align="center" prop="email" max-width="100" >
          <template slot-scope="scope">
            <el-tag  size="small" :type="item.value === 'PASSWORD' ? 'success' : 'info'" v-for="(item, index) in accessWays" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled" v-if="scope.row.accessWay===item.value">{{ item.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="gmtCreate" :show-overflow-tooltip="true" />
        <el-table-column label="更新时间" align="center" prop="gmtModified" :show-overflow-tooltip="true" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="150">
          <template slot-scope="scope">
            <el-button v-permission="['sys:user:update']" size="mini" type="text" icon="el-icon-s-platform" @click="terminal(scope.row)">终端</el-button>
            <el-button v-permission="['sys:user:update']" size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button v-permission="['sys:user:update']" size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">秘钥</el-button>
            <el-button v-permission="['sys:user:delete']" size="mini" type="text" style="color: red" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页码-->
      <pagination v-show="total>0" style="padding: 0px" :total="total" :page.sync="queryParams.pageIndex" :limit.sync="queryParams.pageSize" @pagination="getList" />
      <!-- 添加或修改对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器名" prop="applicationName">
                <el-input v-model="form.name" placeholder="请输入服务器名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务器IP" prop="applicationName">
                <el-input v-model="form.ip" placeholder="请输入服务器IP" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="访问端口" prop="port">
                <el-input v-model="form.port" placeholder="请输入访问端口" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="访问用户名" prop="accessUsername">
                <el-input v-model="form.accessUsername" placeholder="请输入用户名" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="访问方式" prop="accessWay">
                <el-radio-group v-model="form.accessWay">
                  <el-radio v-for="type in accessWays" :label="type.value" :key="type.label">{{ type.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col v-if="form.accessWay === 'PASSWORD'" :span="24">
              <el-form-item label="访问密码" prop="accessPassword">
                <el-input type="password" v-model="form.accessPassword" placeholder="请输入访问密码" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.accessWay === 'ACCESS_KEY'" :span="24">
              <el-form-item label="访问密钥" prop="accessKey">
                <el-input type="password" v-model="form.accessKey" placeholder="请输入访问密钥" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="success" @click="testConnect">测试连接</el-button>
          <el-button type="primary" @click="submitForm" :disabled="submitDisable">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { add, del, testConn, get, page, update} from '@/api/machine/machine'
import {nestedGetQuery} from "@/utils";

export default {
  name: 'MachineInfo',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      id: 0,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      submitDisable : true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      AppInfoList: [],
      roleIdList: [],
      roleList: [],
      applicationTypes: [
        { value: 'Java', label: 'Java应用' },
        { value: 'Go', label: 'Go应用' },
        { value: 'NodeJS', label: 'NodeJS应用' }
      ],
      accessWays: [
        { value: 'PASSWORD', label: '密码' },
        { value: 'ACCESS_KEY', label: '秘钥' }
      ],
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        applicationInfoDTO: {
          applicationName: ''
        }
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        ip: [{ required: true, message: 'IP不能为空', trigger: 'blur' }],
        port: [{ required: true, message: '端口不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '确认不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      page(nestedGetQuery(this.queryParams)).then(response => {
        this.userList = response.data
        this.total = response.totalCount
        this.loading = false
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
        userId: undefined,
        userName: undefined,
        userGroup: undefined,
        cronExpression: undefined,
        invokeTarget: undefined,
        args: undefined,
        misfirePolicy: 1,
        concurrent: 1,
        userType: 1,
        status: 0,
        accessWay: 'PASSWORD'
      }
      this.roleIdList = []
      this.resetForm('form')
    },
    userGroupFormat(row) {
      return this.selectDictLabel(this.userGroupOptions, row.userGroup)
    },
    statusFormat(row) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.form.status = 0
      this.open = true
      this.title = '添加服务器'
      this.form.accessWay = 'PASSWORD'
      this.form.port = 22
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.id
        get(id).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改服务器信息'
          this.isEdit = true
        })
    },
    // 终端
    terminal(row) {

    },
    // 测试连接服务器
    testConnect () {
      this.$refs['form'].validate(valid => {
        if (valid) {
            testConn({'machineInfoDTO':this.form}).then(response => {
              if (response.code === 2000) {
                this.msgSuccess('连接成功')
                this.submitDisable = false;
              } else {
                this.msgError(response.msg)
              }
            })
        }
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      console.log(this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.roleIdList = this.roleIdList
          this.form.userType = parseInt(this.form.userType)
          if (this.form.id !== undefined) {
            update({'machineInfoDTO':this.form}).then(response => {
              if (response.code === 2000) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            add({'machineInfoDTO':this.form}).then(response => {
              if (response.code === 2000) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const Ids = (row.id && [row.id]) || this.ids
      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delAppInfo({ 'ids': Ids })
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    },
    // 路由跳转到流水线
    pipeline(row){
      this.$router.push(
        {
          path: '/application/pipeline',
          query: {
            uuid: row.uuid
          }
        }
      )
    }
  }
}
</script>
