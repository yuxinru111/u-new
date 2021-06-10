<template>
  <div class="login-container">
    <div class="login-box">
      <h3>小U商城后台管理系统</h3>
      <!-- for表单，自定义效验 -->
      <el-form
        :model="loginInfo"
        :rules="rules"
        ref="fromIn"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="loginInfo.username" autocomplete="off">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginInfo.password"
            autocomplete="off"
            show-password
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 调用user组件的userLogin方法
import { userLogin } from "../request/user";
export default {
  data() {
    return {
      // 创建一个登录的实体对象
      // 登录请求体对象
      loginInfo: {
        username: "admin",
        password: "admin888",
      },

      rules: {
        //   鼠标离焦的状态
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  created() {},
  methods: {
    submitForm() {
      this.$refs.fromIn.validate((valid) => {
        if (valid) {
          userLogin(this.loginInfo).then((res) => {
            console.log(res);
            //   弹出成功提示
            // 存储localStorage
            // 跳转到布局页面
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              localStorage.setItem("userInfo", JSON.stringify(res.list));
              this.$router.push("/");
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {},
};
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  /* 登录背景图 */
  background-image: url(../assets/imgs/loginbg.jpeg);
  /* 让里面的盒子居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 10px;
  padding: 0 20px;
}
.login-box h3 {
  color: #409eff;
  text-align: center;
  margin: 35px auto;
}
.login-btn {
  width: 100%;
}
</style>