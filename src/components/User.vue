<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/user">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索功能 -->
    <div>
      <el-input placeholder="请输入关键字" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain>用户添加</el-button>
    </div>

    <!-- 表格展示功能 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="small"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            size="small"
            type="success"
            icon="el-icon-check"
            plain
            @click="handleRose(scope.$index, scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      :total="total"
      :page-size="pageSize"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 查询关键字
      query: "",
      // 总条数
      total: 10,
      // 当前页
      currentPage: 1,
      // 每页显示条数
      pageSize: 5,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  created() {
    //   发送ajax请求，获取用户列表数据
    this.getUserList();
  },

  computed: {},
  watch: {},
  methods: {
    // 封装ajax请求获取用户数据
    getUserList() {
      // axios({
      //   method: "get",
      //   url: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      //   params: {
      //     query: this.query,
      //     pagenum: this.currentPage,
      //     pagesize: this.pageSize
      //   },
      //   headers: {
      //     Authorization: localStorage.getItem("token")
      //   }
      // }).then(res => {
      //   //   console.log(res.data);
      //   if (res.data.meta.status === 200) {
      //     this.tableData = res.data.data.users;
      //     this.total = res.data.data.total;
      //   } else {
      //   }
      // });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除用户
    handleDelete(id) {
      this.$confirm("你确定要删除这个用户吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送Ajax请求删除用户
          axios({
            method: "delete",
            url: `xxxxxxxxxxxx/${id}`,
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }).then(res => {
            if (res.data.meta.status === 200) {
              // 如果当前页只有一条数据，页码-1
              if (this.userList.length === 1 && this.currentPage > 1) {
                this.currentPage--;
              }
              // 重新渲染表格
              this.getUserList();
              // 提示信息
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange(val) {
      // 修改当前页
      this.currentPage = val;
      // 重新发送ajax获取用户数据
      this.getUserList();
    },
    handleSizeChange(val) {
      // 改变每页条数的时候，把页码改成1
      this.currentPage = 1;
      this.pageSize = val;
      // 重新渲染
      this.getUserList();
    },
    search() {
      // 重新渲染
      this.currentPage = 1;
      this.getUserList();
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}
.el-input {
  width: 300px;
  margin: 20px 0;
}
</style>
