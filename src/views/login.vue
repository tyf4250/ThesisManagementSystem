<template>
  <div class="wrap">
    <el-card class="box-card">
      <div class="login-img">
        <p class="title">hrbust 论文管理系统</p>
      </div>
      <div class="login-box">
        <div class="login-form-img"></div>
        <el-form
          label-width="70px"
          :model="formData"
          :rules="rules"
          style="max-width: 460px"
          ref="loginForm"
        >
          <el-form-item label="账 号" prop="username">
            <el-input v-model="formData.username" placeholder="请输入账号" clearable />
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="验证码" prop="validkey">
            <el-input v-model="formData.validkey" error="123" placeholder="请输入验证码" clearable>
              <template #append>
                <canvas id="canvas" @click="state.handleCanvasClick"></canvas>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="state.submitForm(loginForm)"
              :loading="state.isLoading"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import getVerifyCode from "../assets/js/verifyCode";
import { ElMessage } from "element-plus";
import { login } from "../server/login";
const { getters, dispatch } = useStore();

const getUserName = getters["HomePage/getUserName"];
const router = useRouter();
const loginForm = ref();
const rules = reactive({
  username: { required: true, message: "请输入账号", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  validkey: { required: true, message: "请输入验证码", trigger: "blur" },
});
const formData = reactive({ username: "", password: "", validkey: "" });

onMounted(() => {
  state.validInput = getVerifyCode([]);
});
const state = reactive({
  isLoading: false,
  validInput: "",
  handleCanvasClick() {
    state.validInput = getVerifyCode([]);
  },
  submitForm() {
    loginForm.value.validate(async (valid) => {
      if (valid) {
        if (
          state.validInput.toLowerCase() === formData.validkey.toLowerCase()
        ) {
          try {
            state.isLoading = true;
            const res = await login(formData);
            dispatch("HomePage/setUserName", res.data.username);
            dispatch("HomePage/setUserType", res.data.userType);
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            router.push("home");
          } catch (err) {
            console.log(err);
          } finally {
            state.isLoading = false;
          }
        } else {
          ElMessage({
            message: "验证码输入有误",
            type: "error",
          });
        }
      }
    });
  },
});
</script>
<style lang="less" scoped>
/deep/ .el-input-group__append {
  padding: 0 10px;
}
/deep/ .el-card__body {
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.wrap {
  width: 100vw;
  height: 100vh;
  background: url("/school1.jpg") no-repeat center;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box-card {
    border: none;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    width: 800px;
    height: 350px;
    .login-img {
      width: 530px;
      height: 100%;
      background: url("/school4.jpg") no-repeat center;
      background-size: 100%;
      .title {
        color: #fff;
        font-size: 24px;
        text-align: center;
        margin-top: 20px;
      }
    }
    .login-box {
      height: 100%;
      width: 270px;
      box-sizing: border-box;
      padding: 10px;
      .login-form-img {
        background: url("/schoolSign.webp") no-repeat center;
        background-size: 40%;
        width: 100%;
        height: 100px;
      }
    }
  }
}
</style>