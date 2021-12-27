<template>
	<view class="bg">
	  <image src="/static/imgs/bg.png"></image>
	  <!-- <view class="headbox"> -->
	<!--    <view >
	      <image src="{{userinfo.name_img?userinfo.name_img:userinfo.headimgurl}}"></image>
	      <view  wx:if="{{userinfo.type==2}}">
	        <text><text style="font-size:28rpx">{{userinfo.nickname}}</text>({{userinfo.name}})</text>
	        <text>{{userinfo.school?userinfo.school:''}} {{userinfo.grade?userinfo.grade:''}}</text>
	        <text>{{userinfo.major?userinfo.major:''}}</text>
	      </view>
	      <view class="login" wx:else>{{userinfo.nickname}} (点击完善)</view>
	    </view>
	    <image class="white" src="/static/img/fanhui.png"></image> -->
	  <!-- </view> -->
	
	
		<view class="content">
			<view class="headbox">
			   <view>
			     <image src="/static/imgs/head.png" @click="login"></image>
			     <view class="login" @click="login">点击登录</view>
			   </view>
			   <!-- <image class="white" src="/static/img/fanhui.png"></image> -->
			 </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				title: '2022©MBA21081班委宣',
				userinfo:{}
			}
		},
		components: {},
		methods: {
			login() {
				uni.navigateTo({
				    url: `/pages/login/login`
				});
			}
		},
		mounted() {
			
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
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		.headbox{
		  position: relative;
		  z-index: 2;
		  height: 126rpx;
		  width: 690rpx;
		  margin-top: 30rpx;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
			& > view{
				display: flex;
				.login{
				  justify-content: center !important;
				  font-size: 32rpx !important;
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
				& > image{
					width: 126rpx;
					height: 126rpx;
					border-radius: 50%;
					margin-right: 30rpx;
				}
		}
		}
	}


</style>
