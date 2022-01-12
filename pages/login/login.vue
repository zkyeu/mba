<template>
	<view>
		<view class="bg">
		  <image src="/static/imgs/logo.png" mode="aspectFill"></image>
		  <view>{{pname}}</view>
		  <text>登录{{pname}}，享专属校友信息</text>
		</view>
		
<!-- 		<view class="btnbg" v-if="phone">
			<button type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">手机号一键登录</button>
		</view> -->
		
		<view class="btnbg">
			 <button  class="btn" @click="getUserInfo" lang="zh_CN" >点击登录</button>
			 <!-- @getuserinfo="onGotUserInfo" -->
		</view>
	</view>
</template>

<script>
	import Config from '@/utils/config.js';
	import app from '../../App.vue';
	export default {
		data() {
				return {
					userInfo: {},
					phone: '',
					pname:'',
					openid: '',
					session_key: ''
				}
		},
		onLoad() {
				this.pname = Config.name;
				this.checkUser();
				// this.onGotUserInfo();
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
																_this.userInfo = res.userInfo;
																// 根据openid获取用户信息
																_this.fetchUserinfo();
														},
														fail() {
																console.log("获取用户信息失败")
														}
												});
										} else if (!res.authSetting['scope.userInfo']) {
												console.log("需要点击按钮手动授权")
										}
								},
								fail() {
										console.log("获取已授权选项失败")
								}
						})
				},
				
				// 获取用户部分信息存储
				onGotUserInfo() {
					console.log('1');
					let self = this;
					// 获取code
					uni.login({
						providr: 'weixin',
						success: function (loginRes) {
							console.log('2');
							self.code = loginRes.code;
							// 通过code获取openid
							uni.request({
									url: 'https://api.weixin.qq.com/sns/jscode2session',  
									method:'GET',  
									data: {  
										appid: Config.appid,        // 你的小程序的APPID  
										secret: Config.secret,      // 你的小程序的secret,  
										js_code: loginRes.code      // wx.login 登录成功后的code  
									},  
									success: (cts) => {
										console.log('openid',cts.data.openid)
										console.log('session_key',cts.data.session_key)
										// uni.getUserInfo({
										// 		withCredentials: false,
										// 		success(res) {
										// 				console.log(res);
										// 				uni.request({
										// 						url: 'https://api.weixin.qq.com/cgi-bin/user/info',
										// 						data: {
										// 								code: loginRes.code,
										// 								encryptedData : res.encryptedData,
										// 								iv : res.iv,
										// 						},
										// 						success: function(ress) {
										// 								console.log(ress)
										// 						},
										// 						fail: function(res) {
										// 								console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
										// 						}
										// 				})
										// 		},
										// 		fail() {
										// 				console.log("获取用户信息失败")
										// 		}
										// });
										self.openid = cts.data.openid;     //openid 用户唯一标识
										self.session_key = cts.data.session_key;     //session_key  会话密钥
										if (uni.getStorageSync('openid') === cts.data.openid) return;
										uni.setStorageSync('openid',cts.data.openid);
										uni.setStorageSync('session_key',cts.data.session_key);
										
										self.saveNewUser({
											openid: cts.data.openid,
											...self.userInfo
										});
									},
									fail: () => {
										console.log('fail')
										uni.showToast({
											title: '授权失败',
											icon:'error',
											duration: 1000
										});
										setTimeout(() => {
											uni.navigateTo({
												url: `/pages/index/index`
											});
										}, 1000);
									}
							}); 
						}
					});
				},
				
				// 手动授权
				getUserInfo () {
					let self = this;
					wx.getUserProfile({
						desc: '用于完善用户资料',
						lang: 'zh_CN',
						success: (res) => {
							app.globalData.userInfo = res.userInfo;
							self.updateUserInfo(self.openid, res.userInfo);
						}
					});
				},
				
				// 手机登录时获取手机号码相关信息的函数
				getPhoneNumber(e) {
						this.phone = JSON.stringify(e);
						console.log(e);
				},
				
				// 保存为新用户
				saveNewUser(v) {
					delete v['language'];
					uni.request({
						url: 'https://www.sotm.cn/apiv1/addwechatuser',  
						method:'POST',  
						data: v,  
						success: (res) => {
							uni.navigateTo({
								url: '/pages/mine/mine'
							});
						},
						fail: () => {
							console.log('fail')
						}
					}); 
				},
				
				// 更新授权后信息
				updateUserInfo(id, v) {
					let self = this;
					uni.request({
						url: 'https://www.sotm.cn/apiv1/updatewechatuser',  
						method:'POST',  
						data: {
							openid: id,
							...v
						},  
						success: (res) => {
							uni.navigateTo({
								url: '/pages/mine/mine'
							});
						},
						fail: () => {
							console.log('fail')
						}
					}); 
				},
				
				// 获取存储的用户信息
				fetchUserinfo() {
					console.log('获取存储用户信息；')
				},
				
				// 查询用户openid，如果存在拉取存储信息，否则保存
				checkUser() {
					let openid = uni.getStorageSync('openid');
					console.log(openid);
					if (!openid) {
						// 获取用户openid
						console.log('获取用户openid');
						this.onGotUserInfo();
					} else {
						// 拿着openid去数据库查询用户信息
						console.log('拿着openid去数据库查询用户信息');
						// console.log(openid);
						// 查询到 返回对应数据
						uni.request({
							url: 'https://www.sotm.cn/apiv1/getwechatuser',
							data: {
								openid: openid
							},
							method: 'POST',
							success: (res) => {
								app.globalData.userInfo = res.data.data;
							},
						});
					}
				}
			}
	}
</script>

<style lang="scss" scoped>
.bg {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
	image{
		width: 300rpx;
		height: 280rpx;
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
		color: #999;
	}
}
.btn {
	  width: 610rpx !important;
		height: 100rpx !important;
		border-radius: 50rpx !important;
		background: #004097;
		box-shadow: 0px 4px 6px 0px rgba(53, 68, 184, 0.4);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
	}
</style>
