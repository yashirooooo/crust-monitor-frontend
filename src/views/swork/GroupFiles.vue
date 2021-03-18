/**
 * 基础菜单 group总览
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>group总览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      size="small"
      :data="groupData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%"
      ref="table"
      :tree-props="{children: 'detail', hasChildren: 'hasChildren'}">
    >
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="ownerId" label="ownerId" width="300">
      </el-table-column>
      <el-table-column sortable prop="totalStorage" label="totalStorage(GB)" width="300">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.members" border stripe style="width: 100%">
            <el-table-column prop="nodeId" label="nodeId"></el-table-column>
            <el-table-column prop="storage" label="storage(GB)"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-table :data="scope.row.files" border stripe style="width: 100%">
                        <el-table-column prop="cid" label="文件cid"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { groupFiles } from "../../api/userMG";
import Pagination from "../../components/Pagination";

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "添加",
      editForm: {
        deptId: "",
        deptName: "",
        deptNo: "",
        token: localStorage.getItem("logintoken"),
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        deptNo: [
          { required: true, message: "请输入部门代码", trigger: "blur" },
        ],
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken"),
      },
      // 删除部门
      seletedata: {
        ids: "",
        token: localStorage.getItem("logintoken"),
      },
      userparm: [], //搜索权限
      groupData: [],
      slotArr: [],
    };
  },
  // 注册组件
  components: {
    Pagination,
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    getdata(parameter) {
      this.loading = true;

      groupFiles({
        startSlot: parameter.startSlot,
        endedSlot: parameter.endedSlot,
      }).then((res) => {
        this.groupData = res.data;
        this.loading = false;
      });
    },

    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline);
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },

    callDownload() {
      this.download(this.formInline);
    },

    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
    }
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>