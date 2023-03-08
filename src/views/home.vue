<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="state.handleSelect"
    >
      <el-menu-item>
        <a href="/home" class="a-home"></a>
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="0">
        <template #title>
          <img :src="state.userInfo.userIco" class="user-img" alt />
          <span>{{state.userInfo.stuNo}}</span>
        </template>
        <el-menu-item index="0-1">个人中心</el-menu-item>
        <el-menu-item index="0-2">修改密码</el-menu-item>
        <el-menu-item index="0-3">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-row class="content-wrap">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="left-menu"
        default-active="1-1"
        text-color="#fff"
        @select="state.handleSelect"
      >
        <div class="user-info">
          <img :src="state.userInfo.userIco" class="user-img" alt style="width:45px;height:45px" />
          <p>
            {{state.userInfo.name}}
            <br />
            {{state.userInfo.stuNo}}
            <br />
            {{state.userInfo.grade+'级'}}
          </p>
        </div>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <document />
            </el-icon>
            <span>课题信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">我的课题</el-menu-item>
            <el-menu-item index="1-2">课题选择</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon>
            <upload />
          </el-icon>
          <span>论文上传</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <search />
          </el-icon>
          <span>成绩查询</span>
        </el-menu-item>
      </el-menu>
      <iframe class="right-content" src frameborder="0"></iframe>
    </el-row>
  </div>
  <el-dialog v-model="state.dialogVisible" title="修改密码" width="30%">
    <el-form :model="state.modifyPasswordForm" style="max-width: 460px">
      <el-form-item>
        <el-input v-model="state.modifyPasswordForm.email" placeholder="请输入邮箱地址" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="state.modifyPasswordForm.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="state.modifyPasswordForm.passwordTwice" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-col :span="16">
          <el-input v-model="state.modifyPasswordForm.code" placeholder="请输入验证码" />
        </el-col>
        <el-col :span="8">
          <el-button
            type="primary"
            style="min-width:80px;padding:0 5px"
            :disabled="state.verifyBtn.disabled"
            :loading="state.verifyBtn.loading"
            @click="state.sendVerifyCode"
          >
            <span v-if="!state.verifyBtn.disabled">发送验证码</span>
            <el-countdown format="ss" :value="state.timer" v-else />
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="state.ClickDialogConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, onBeforeMount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { Document, Upload, Search } from "@element-plus/icons-vue";
import { init, getEmailCode } from "../server/home";
import { ElMessageBox } from "element-plus";

const { getters, dispatch } = useStore();
const activeIndex = ref("1");
const route = useRoute();
const router = useRouter();
const getUserName = getters["HomePage/getUserName"];
const getUserType = getters["HomePage/getUserType"];

onBeforeMount(async () => {
  /**初始化查询个人信息 */
  const params = {
    username: state.username,
    userType: state.usertype,
  };
  try {
    const res = await init(params);
    state.userInfo = res.data;
    dispatch("HomePage/setUserInfo", res.data);
  } catch (error) {
    console.log(error);
  }
});
const state = reactive({
  username: computed(() => getUserName),
  usertype: computed(() => getUserType),
  verifyBtn: { loading: false, disabled: false },
  modifyPasswordForm: {},
  dialogVisible: false,
  timer: Date.now() + 1000 * 60,
  userInfo: {},
  handleSelect(index, indexPath, item) {
    console.log(index, indexPath);
    switch (index) {
      case "0-2":
        state.dialogVisible = true;
        break;
      case "0-3":
        state.exitLogin();
        break;

      default:
        break;
    }
  },
  /**退出登录 */
  exitLogin() {
    ElMessageBox.confirm("确定要退出登录吗", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        sessionStorage.removeItem("token");
        location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /**处理修改密码提交事件 */
  ClickDialogConfirm() {},
  /**发送验证码 */
  async sendVerifyCode() {
    state.verifyBtn.loading = true;
    const params = {
      userEmail: state.modifyPasswordForm.email,
    };
    console.log(params);
    try {
      const res = await getEmailCode(params);
    } catch (error) {
    } finally {
      state.verifyBtn.loading = false;
    }
  },
});
</script>
<style lang="less" scoped>
:deep(.el-dialog__body) {
  padding: 10px;
}
.container {
  min-height: 100vh;
  .left-menu {
    width: 200px;
    min-height: calc(100vh - 61px);
    .user-info {
      text-align: center;
      margin: 20px 0;
      p {
        line-height: 30px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .content-wrap {
    display: flex;
    .right-content {
      flex: 1;
    }
  }
}
.flex-grow {
  flex-grow: 1;
}
.a-home {
  display: inline-block;
  text-decoration: none;
  height: 58px;
  width: 58px;
  background: url("/schoolSign.webp") no-repeat center;
  background-size: 100%;
}
.user-img {
  height: 30px;
  margin-right: 5px;
}
</style>