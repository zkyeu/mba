import app from "../App.vue";
const baseUtil = {
	// 判断用户是否授权，没有授权则跳转授权页面去授权
	getSettingMes: () => {
	    let _this = this;
			console.log('a')
	    uni.getSetting({
	        success(res) {
						console.log('b')
	            if (res.authSetting['scope.userInfo']) {
	                // 用户信息已授权，获取用户信息
	                uni.getUserInfo({
	                    success(res) {
	                        console.log('c');
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
	onGotUserInfo: (appid,secret) => {
		let self = this;
		// return app.globalData.text;
		// 获取code
		uni.login({
			provider: 'weixin',
			success: (loginRes) => {
				app.globalData.code = 'rr777';
				// self.code = loginRes.code;
				// 通过code获取openid
				uni.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session',  
						method:'GET',  
						data: {  
							appid: appid,        // 你的小程序的APPID  
							secret: secret,      // 你的小程序的secret,  
							js_code: loginRes.code      // wx.login 登录成功后的code  
						},  
						success: (cts) => {
							console.log(cts.data);
							
							// self.openid = cts.data.openid;     //openid 用户唯一标识
							// self.session_key = cts.data.session_key;     //session_key  会话密钥
							return cts.data;
							// self.saveNewUser({
							// 	openid: cts.data.openid,
							// 	...self.userInfo
							// },cts.data.session_key);
							// uni.getUserInfo({
							// 		provider: 'weixin',
							// 		success: function (infoRes) {
							// 			console.log('==>',infoRes);
							// 			self.userInfo = infoRes.userInfo;
							// 			self.saveNewUser({
							// 				openid: cts.data.openid,
							// 				...self.userInfo
							// 			},cts.data.session_key);
							// 			// 换取成功后 暂存这些数据 留作后续操作
							// 			self.openid = cts.data.openid;     //openid 用户唯一标识  
							// 			self.session_key = cts.data.session_key;     //session_key  会话密钥
							// 			// console.log('用户昵称为：' + infoRes.userInfo.nickName);
							// 			// console.log('wx.getUserProfile', wx.canIUse('getUserProfile'));
							// 		},
							// 		fail: function () {
							// 				console.log('3333333333');
							// 		},
							// 		complete: function () {}
							// });
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
		return app.globalData.code;
	},
						
	
}

export default baseUtil;