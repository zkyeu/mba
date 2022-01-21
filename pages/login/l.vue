<template>
	<view  class="content">
		<view class="article-person">
			<view class="person">
				<!-- <image src="../../static/imgs/logo.png" mode=""></image> -->
				<image :src="userInfo.avatarUrl"></image>
				<view class="name-block">
					<view class="name">
						<view>你的名字叫什么</view>
						<view class="tags">学习园地</view>
					</view>
					<view class="date">
						{{articleData.create_time.subString(0,10)}}
					</view>
				</view>
			</view>
			<view class="type">预留</view>
		</view>
		<view class="">
			{{code}}-{{userInfo.nickName}}
		</view>
		<view class="article-title">{{articleData.title}}</view>
		<view class="article-text">
			{{ articleData.content }}
			</view>
<!-- 		<view class="img-list">
				<image :src="i" v-for="i in articleInfo.imgs"></image>
		</view> -->
		<view class="props">
			<span><i class="iconfont icon-notice" v-if="articleData.address">{{articleData.address}}</i></span>
			<span @click="hanleBtn('comment')"><i class="iconfont icon-notice" v-if="articleData.comment">{{articleData.comment}}</i></span>
			<span @click="hanleBtn('like')"><i class="iconfont icon-notice" v-if="articleData.like">{{articleData.like}}</i></span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aid: null,
				articleData: null,
				code: '',
				userInfo: {},
				nickName: '',
				articleInfo: {
					title: '这是新闻标题名字',
					content:'这是新闻标题名字,这是新闻标题名字,这是新闻标题名字,这是新闻标题名字',
					imgs: ['../../static/imgs/logo.png','../../static/imgs/logo.png','../../static/imgs/logo.png'],
					location: '北京市海淀区',
					comment: 123,
					like: 112
				}
			};
		},
		methods: {

			toLogin(fn){
				let self = this;
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						// 获取临时登陆凭证code
						self.code = loginRes.code;
						
						uni.request({
								url: 'https://api.weixin.qq.com/sns/jscode2session',  
								method:'GET',  
								data: {  
										appid: 'wx356ca2b65ef949c3',        //你的小程序的APPID  
										secret: '309afe02fd373f3fd007bbbb7b49f9f7',       //你的小程序的secret,  
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
			fetchArticle(){
				if (!this.aid) return;
				uni.request({
				    url: 'https://www.sotm.cn/apiv1/get/article', //仅为示例，并非真实接口地址。
				    data: {
							id: parseInt(this.aid)
				    },
						method: 'GET',
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
								this.articleData = res.data.data;
				    }
				});
			}
		},
		mounted() {
			// this.toLogin();
			this.fetchArticle();
		},
		onLoad: function (option) {
				this.aid = option.id;
		}
	}
</script>

<style lang="scss">
	.content {
		// margin: 10px 0;
		background-color: #fff;
		border-radius: 6px;
		padding: 10px;
	}
	.article-person {
		display: flex;
		justify-content: space-between;
		
		.person {
			display: flex;
			margin-bottom: 10px;
			image {
				margin-right: 8px;
				border-radius: 20px;
				overflow: hidden;
				background-color: #ddd;
				width:34px;
				height: 34px;
			}
			.name-block {
				display: flex;
				flex-direction: column;
				.name {
					display: flex;
					font-size: 13px;
					
					.tags {
						background-color: #333;
						color: #fff;
						border-radius: 6px;
						padding: 0 8px;
						height: 18px;
						line-height: 18px;
						margin-left: 8px;
						font-size: 10px;
					}
				}
				.date {
					font-size: 12px;
					color: #aaa;
				}
			}
		}
		
		.type {
			display: none;
		}
	}
	
	.article-title {
		font-size:14px;
		margin-bottom: 6px;
	}
	
	.article-text{
		font-size: 13px;
		color: #333;
		// line-height: 12px;
	}
	
	.img-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: flex-start;
		margin-top:16px;
		image{
			width: 25vw;
			height:80px;
		}
	}
	
	.props {
		display: flex;
		padding-top: 16px;
		justify-content: space-between;
		color: #777;
		
		span {
			display: flex;
			align-items: center;
		}
		.iconfont {
			font-size: 12px;
		}
	}
</style>
