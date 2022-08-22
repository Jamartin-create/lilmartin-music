<template>
  <div class="login">
    <div class="login-container">
      <i class="iconfont icon-lil-netease"></i>
      <h1 class="title">登录网易云账号</h1>
      <div>
        <div class="qrCodeSvg">
          <img :src="qrCodeSvg" loading="lazy" />
        </div>
        <div class="qrCodeDesc">{{ qrCodeDesc }}</div>
        <div class="tips">暂不支持手机登录和邮箱登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQrCodeKey, checkQrCodeStatus } from "@/api/auth";
import { setCookies } from "@/util/auth";
import { mapActions, mapMutations } from "vuex";
import NProgress from "nprogress";
import QRCode from "qrcode";
import nprogress from "nprogress";
export default {
  name: "login-page",
  data() {
    return {
      qrCodeKey: "",
      qrCodeSvg: "",
      qrCodeDesc: "打开网易云音乐APP扫码登录",
      qrCodeCheckInterval: "", //qr状态检测定时器
    };
  },
  created() {
    this.generateQrCode();
  },
  beforeDestroy() {
    clearInterval(this.qrCodeCheckInterval);
  },
  methods: {
    //获取mutations
    ...mapMutations("user", {
      updateUserLoginMode: "UPDATE_USER_LOGIN_MODE",
    }),
    //获取actions
    ...mapActions("user", {
      fetchUserAccount: "fetchUserAccount",
      fetchUserPlayList: "fetchUserPlayList",
    }),
    //生成二维码
    generateQrCode() {
      nprogress.start();
      return getQrCodeKey().then((res) => {
        nprogress.done();
        if (res.code === 200) {
          this.qrCodeKey = res.data.unikey;
          QRCode.toString(
            `https://music.163.com/login?codekey=${this.qrCodeKey}`,
            {
              width: 180,
              margin: 0,
              color: {
                dark: "#272727",
                light: "#00000000",
              },
              type: "svg",
            }
          )
            .then((svg) => {
              this.qrCodeSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
                svg
              )}`;
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              NProgress.done();
            });
        }
        this.checkQrCodeLogin();
      });
    },
    //判断二维码状态
    checkQrCodeLogin() {
      this.qrCodeCheckInterval = setInterval(() => {
        if (this.qrCodeKey === "") return;
        checkQrCodeStatus(this.qrCodeKey).then((res) => {
          if (res.code === 800) {
            this.generateQrCode();
          } else if (res.code === 801) {
            this.qrCodeDesc = "打开网易云音乐APP扫码登录";
          } else if (res.code === 802) {
            this.qrCodeDesc = "扫描成功，请点击确认登陆";
          } else if (res.code === 803) {
            clearInterval(this.qrCodeCheckInterval);
            this.qrCodeDesc = "登录成功，请稍等...";
            res.code = 200;
            this.handleLogin(res);
          }
        });
      }, 1000);
    },
    //登陆成功回调
    handleLogin(data) {
      if (data.code === 200) {
        //添加token：注明登录状态
        setCookies(data.cookie);
        //添加标识：注明登录模式
        this.updateUserLoginMode("account");
        this.fetchUserAccount().then(() => {
          this.fetchUserPlayList().then(() => {
            this.$router.push({ name: "library" });
          });
        });
      } else {
        alert(data.msg ?? data.message ?? "登录失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.login {
  text-align: center;
  margin-top: 5%;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 120px;
      color: #d81e06;
    }
    .title {
      font-size: 30px;
      margin-bottom: 10%;
    }
    .qrCodeSvg {
      height: 220px;
      width: 220px;
      padding: 20px 20px 20px 20px;
      background-color: #dddddd;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    .qrCodeDesc {
      font-size: 16px;
      color: #627c94;
      margin-bottom: 10%;
    }
    .tips {
      font-size: 12px;
      color: #b0b0b0;
    }
  }
}
</style>