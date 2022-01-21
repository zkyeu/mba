<template>
	<view>
		<view class="bg">
			<image src="/static/imgs/bg.png"></image>
			
			<view class="headbox" v-if="userinfo.avatarUrl">
				<view>
					<image :src="userinfo.avatarUrl"></image>
					<view v-if="true">
						<text>
							<text style="font-size:28rpx">{{userinfo.nickName}}</text>
						</text>
					<!-- 	<text>学校 2021级</text>
						<text>MBA</text> -->
					</view>
					<view class="login" v-else>{{userinfo.nickName}} (点击完善)</view>
				</view>
				<span class="iconfont icon-arrowRight-o1 white"></span>
			</view>
				
			<view class="headbox" @click="login" v-else>
				<view>
					<image src="/static/imgs/head.png"></image>
					<view class="login">点击登录</view>
				</view>
				<span class="iconfont icon-arrowRight-o1 white"></span>
			</view>
				
			<view class="myserv" @click="no">
			 <text class="myservtit">我的服务</text>
			 <view class="servbox">
				 <view bindtap="gomyfb">
					 <image src="/static/imgs/mine/icon_1@2x.png"></image>
					 <text>我的发布</text>
				 </view>
				 <view bindtap="gocollent">
					 <image src="/static/imgs/mine/icon_2@2x.png"></image>
					 <text>我的收藏</text>
				 </view>
				 <view bindtap="gowatch">
					 <image src="/static/imgs/mine/icon_3@2x.png"></image>
					 <text>学分活动</text>
				 </view>
			 </view>
		 </view>
		</view>
		
		<view class="listbg">
		  <text class="myservtit">我的服务</text>
		  <view class="listitem">
		    <view @click="no">
					<span class="iconfont icon-shezhi1"></span>
		      <text>花名设置</text>
		    </view>
		    <span class="iconfont icon-arrowRight-o1 small"></span>
		  </view>
		  <view class="listitem">
		    <view @click="no">
					<span class="iconfont icon-liuyanban-05"></span>
		      <text>柬言献策</text>
		    </view>
		    <span class="iconfont icon-arrowRight-o1 small"></span>
		  </view>
		  <view class="listitem">
		    <view @click="no">
					<span class="iconfont icon-guanyuwomen"></span>
		      <text>关于我们</text>
		    </view>
		    <span class="iconfont icon-arrowRight-o1 small"></span>
		  </view>
		  <view class="listitem">
		    <button open-type="share"></button>
		    <view>
					<span class="iconfont icon-fenxiang1"></span>
		      <text>宣传分享</text>
		    </view>
		    <span class="iconfont icon-arrowRight-o1 small"></span>
		  </view>
		  <view class="listitem">
		    <view @click="no">
					<span class="iconfont icon-ico"></span>
		      <text>我的邀请码</text>
		    </view>
				<span class="iconfont icon-arrowRight-o1 small"></span>
		  </view>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue';
	export default {
		data() {
			return {
				title: '2022©MBA21081班委宣',
				userinfo: {}
			}
		},
		components: {},
		methods: {
			login() {
				uni.navigateTo({
				    url: `/pages/login/login`
				});
			},
			no () {
				uni.showToast({
					title: "哎呀，功能还没开始做，这位同学再耐心等待一下，终有见面时。",
					icon: 'none',
					duration: 3000,
					mask: true
				});
			},
			fetchUserInfo() {
				let openid = uni.getStorageSync("openid");
				if (!openid) return;
				uni.request({
				    url: 'https://www.sotm.cn/apiv1/getwechatuser',
				    data: {
							id: parseInt(this.aid)
				    },
						method: 'GET',
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
							console.log(res);
							this.userinfo = res.data.data;
				    }
				});
			}
		},
		mounted() {
			this.userinfo = app.globalData.userInfo;
		},
		onShow() {
		}
	}
</script>

<style lang="scss" scoped>
	.bg{
	  width: 750rpx;
	  height: 480rpx;
	  display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		position: fixed;top:0;z-index: 9;
		& > image{
			width: 100%;
			height: 100%;
			position: absolute;
		}
		.iconfont {
			&.white {
				color: #fff;
			}
			&.small {
				font-size: 24rpx!important;
			}
		}
		
	}
	
	.headbox{
		position: relative;
		z-index: 2;
		padding: 0 10px;
		height: 126rpx;
		width: 690rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.white{
			filter: grayscale(100%) brightness(200%);
		}
		.login{
			justify-content: center !important;
			font-size: 32rpx !important;
		}
		& > image{
			width: 10rpx;
			height: 20rpx;
		}
		
		& > view{
			display: flex;
			& > image{
				width: 126rpx;
				height: 126rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}
			& > view{
				height: 126rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	
	.myserv{
	  position: absolute;
	  width: 690rpx;
	  height: 310rpx;
	  background: #FFFFFF;
	  border-radius: 12rpx;
	  bottom: -200rpx;
	  box-sizing: border-box;
	  padding-top: 30rpx;
		
		.servbox{
			height: 160rpx;
			width: 580rpx;
			margin-left: 55rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			& > view {
				width: 110rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
				align-items: center;
				image {
				  width: 110rpx;
				  height: 110rpx;
				  margin-bottom: 10rpx;
				}
			}
		}
	}
	
	.myservtit{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333;
		margin-left: 30rpx;
	}
	
	.listbg{
		position: absolute;
	  width: 690rpx;
		height: 630rpx;
		background: #fff;
		border-radius: 12rpx;
		margin-top: 220rpx;
		margin-left: 30rpx;
		box-sizing: border-box;
		padding-top: 30rpx;
		top:490rpx;
		.listitem {
		  width: 630rpx;
		  margin-left: 30rpx;
		  height: 110rpx;
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  position: relative;
			button {
			  position: absolute;
			  width: 100% !important;
			  height: 100% !important;
			  opacity: 0;
			}
			& > view {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333;
				image {
				  width: 28rpx;
				  height: 28rpx;
				  margin-right: 20rpx;
				}
			}
			& > image {
			  width: 10rpx;
			  height: 20rpx;
			}
		}
	}
</style>
