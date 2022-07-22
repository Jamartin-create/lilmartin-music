<template>
    <div class="login">
        <div class="login-container">
            <div>
                <div class="qrCodeSvg">
                    <img :src="qrCodeSvg" loading="lazy">
                </div>
                <div class="qrCodeDesc">{{qrCodeDesc}}</div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { getQrCodeKey, checkQrCodeStatus } from '@/api/auth'
import { setCookies } from '@/util/auth'
import { mapActions, mapMutations } from 'vuex'
import NProgress from 'nprogress'
import QRCode from 'qrcode'
export default {
    name: 'login-page',
    data(){
        return {
            qrCodeKey: '',
            qrCodeSvg: '',
            qrCodeDesc: '打开网易云音乐APP扫码登录',
            qrCodeCheckInterval: '', //qr状态检测定时器
        }
    },
    created(){
        this.generateQrCode()
    },
    beforeDestroy() {
        clearInterval(this.qrCodeCheckInterval);
    },
    methods:{
        //获取mutations
        ...mapMutations('user',{
            updateUserLoginMode:'UPDATE_USER_LOGIN_MODE'
        }),
        //获取actions
        ...mapActions('user',{
            fetchUserAccount: 'fetchUserAccount',
            fetchUserPlayList: 'fetchUserPlayList',
        }),
        generateQrCode(){
            return getQrCodeKey().then(res=>{
                console.log(res)
                if(res.code === 200){
                    this.qrCodeKey = res.data.unikey
                    QRCode.toString(
                        `https://music.163.com/login?codekey=${this.qrCodeKey}`,
                        {
                            width: 192,
                            margin: 0,
                            color: {
                                dark: '#335eea',
                                light: '#00000000',
                            },
                            type: 'svg',
                        }).then(svg=>{
                            this.qrCodeSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
                                svg
                            )}`
                        }).catch(err=>{
                            console.error(err)
                        }).finally(()=>{
                            NProgress.done()
                        })
                }
                this.checkQrCodeLogin()
            })
        },
        checkQrCodeLogin(){
            this.qrCodeCheckInterval = setInterval(() => {
                if(this.qrCodeKey === '') return
                checkQrCodeStatus(this.qrCodeKey).then(res=>{
                    if(res.code===800){
                        this.generateQrCode()
                    }else if(res.code===801){
                        this.qrCodeDesc = '打开网易云音乐APP扫码登录';
                    }else if(res.code===802){
                        this.qrCodeDesc = '扫描成功，请点击确认登陆'
                    }else if(res.code===803){
                        clearInterval(this.qrCodeCheckInterval)
                        this.qrCodeDesc = '登录成功，请稍等...'
                        res.code = 200
                        this.handleLogin(res)
                    }
                })
            }, 1000);
        },
        handleLogin(data){
            if(data.code === 200){
                //添加token：注明登录状态
                setCookies(data.cookie)
                //添加标识：注明登录模式
                this.updateUserLoginMode('account')
                this.fetchUserAccount().then(()=>{
                    this.fetchUserPlayList().then(()=>{
                        this.$router.push({path: '/mine'})
                    })
                })
            }else{
                alert(data.msg??data.message??'登录失败')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .qrCodeSvg{
        height: 192px;
        width: 192px;
        padding: 20px 20px 20px 20px;
        background-color: #97afff;
        border-radius: 20px;
        margin-bottom: 10px;
    }
}
</style>