/**
 * 基础菜单 工作量上报总览
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作量上报详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-select v-model="formInline.startSlot" clearable placeholder="请选择开始slot" filterable>
            <el-option v-for="item in slotArr" :label="item" :key="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="formInline.endedSlot" clearable placeholder="请选择结束slot" filterable>
            <el-option v-for="item in slotArr" :label="item" :key="item" :value="item"></el-option>
        </el-select>
  
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-download" @click="callDownload">下载</el-button>
      </el-form-item>
    </el-form>
    <el-table size="small" :data="groupData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="key" label="id" width="300">
      </el-table-column>
      <el-table-column sortable prop="reportRate" label="上报成功率" width="300">
      </el-table-column>
      <el-table-column sortable prop="reporterCount" label="节点个数" width="300">
      </el-table-column>
      <el-table-column sortable prop="rate" label="占比" width="300">
      </el-table-column>
    </el-table>
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="_id" label="节点ID" width="300">
      </el-table-column>
      <el-table-column sortable prop="successCount" label="成功总数" width="100">
      </el-table-column>
      <el-table-column sortable prop="failedCount" label="失败总数" width="100">
      </el-table-column>
      <el-table-column sortable prop="totalRatio" label="上报率" width="300">
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import { slotArr, slotReporter, slotReporterDownload } from '../../api/userMG'
import Pagination from '../../components/Pagination'

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        deptId: '',
        deptName: '',
        deptNo: '',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        deptNo: [{ required: true, message: '请输入部门代码', trigger: 'blur' }]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      groupData: [],
      slotArr: [],
     
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    getdata(parameter) {
      this.loading = true

      slotReporter({
          startSlot: parameter.startSlot,
          endedSlot: parameter.endedSlot
      }).then(
          res => {
              this.listData = res.data.detail;
              this.groupData = res.data.rateGroup;
              this.loading = false
          }
      )
      slotArr().then(
          res => {
              this.slotArr = res.data;
          }
      )
      
    },

    download(parameter) {
      slotReporterDownload({
          startSlot: parameter.startSlot,
          endedSlot: parameter.endedSlot
      }).then()
      
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },

    callDownload() {
      this.download(this.formInline)
    },
    
    
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>