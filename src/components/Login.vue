<template>
  <div class="login">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      status-icon
      label-width="80px"
    >
      <img src="../assets/avatar.jpg" alt="" />
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入axios
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 发送ajax请求
          axios({
            url: "http://localhost:8888/api/private/vi/login",
            method: "post",
            data: this.form
          }).then(res => {
            if (res.data.meta.status === 200) {
              // 登录成功
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              // 要先存token再跳转，不然第一次跳转过不去
              // 存储token
              localStorage.setItem("token", res.data.data.token);
              // 跳Home组件
              this.$router.push("/home");
            } else {
              // 登录失败,重新登录
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .el-form {
    width: 400px;
    height: 200px;
    margin: 250px auto;
    padding: 75px 40px 15px;
    background-color: #fff;
    border-radius: 20px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button + .el-button {
      margin-left: 70px;
    }
  }
}
</style>
