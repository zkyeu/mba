<template>
	<view>
		<view class="bg">
		  <image src="/static/imgs/logo.png" mode="aspectFill"></image>
		  <view>MBA21081班</view>
		  <text>登录班级，享专属校友信息</text>
		</view>
		
		<view class="btnbg" v-if="phone">
			<button type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">手机号一键登录</button>
		</view>
		
		<view class="btnbg" v-else>
			 <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">点击登录</button>
		</view>
	</view>
</template>

<script>
	import Config from '@/utils/config.js';
	export default {
        data() {
            return {
							userInfo: {},
							phone: ''
						}
        },
        onLoad() {
            // 执行查看授权选项
            this.getSettingMes();
						console.log(Config)
        },
        methods: {
            // 查看已授权选项
            getSettingMes() {
                let _this = this;
                uni.getSetting({
                    success(res) {
                        if (res.authSetting['scope.userInfo']) {
                            // 用户信息已授权，获取用户信息
                            uni.getUserInfo({
                                success(res) {
                                    console.log(res);
																		_this.userInfo = JSON.stringify(res);
                                },
                                fail() {
                                    console.log("获取用户信息失败")
                                }
                            }),
														 uni.getLocation({
														   success(res) {
																	console.log(res)
															 }
														 })
                        } else if (!res.authSetting['scope.userInfo']) {
                            console.log("需要点击按钮手动授权")
                        }
                    },
                    fail() {
                        console.log("获取已授权选项失败")
                    }
                })
            },
            // 手动授权方法
            onGotUserInfo(e) {
              let self = this;
							uni.login({
								provider: 'weixin',
								success: function (loginRes) {
									self.code = loginRes.code;
									uni.request({
											url: 'https://api.weixin.qq.com/sns/jscode2session',  
											method:'GET',  
											data: {  
													appid: Config.appid,        //你的小程序的APPID  
													secret: Config.secret,       //你的小程序的secret,  
													js_code: loginRes.code              //wx.login 登录成功后的code  
											},  
											success: (cts) => {
												console.log(cts.data)
													// 换取成功后 暂存这些数据 留作后续操作  
													// this.openid=cts.data.openid     //openid 用户唯一标识  
													// this.session_key=cts.data.session_key     //session_key  会话密钥  
											},
											fail: () => {
												console.log('fail')
											}
									}); 

									console.log('-->', loginRes);
						
									// self.loginEvent(loginRes.code, fn); //用code去创建用户信息，或者查询用户的基本信息
									uni.getUserInfo({
											provider: 'weixin',
											success: function (infoRes) {
												self.userInfo = infoRes.userInfo;
												console.log('用户昵称为：' + infoRes.userInfo.nickName);
												// console.log('wx.getUserProfile', wx.canIUse('getUserProfile'));
											},
											fail: function () {
													console.log('3333333333');
											},
											complete: function () {
													console.log('44444444444444');
											}
									});
									
									wx.getUserProfile({
										desc: '用于完善用户资料',
										lang: 'zh_CN',
										success: (res) => {
											console.log('getUserProfile',res);
										}
									});
								}
						  });
            },
            // 手机登录时获取手机号码相关信息的函数
            getPhoneNumber(e) {
								this.phone = JSON.stringify(e);
            }
        }
    }
</script>

<style lang="scss">
.bg {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
	image{
		width: 200rpx;
		height: 200rpx;
		/* border-radius: 50%; */
	}
	view {
		font-size: 36rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #004097;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	text {
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999999;
	}
	.btn{
	  width: 610rpx !important;
		height: 100rpx !important;
		border-radius: 50rpx !important;
		background: #004097;
		box-shadow: 0px 4px 6px 0px rgba(53, 68, 184, 0.4);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
	}
}
</style>
