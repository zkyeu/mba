<template>
	<view class="release">
		<view class="filter-bg"></view>
			
		<view class="content">
			<view class="fonts">
				<text>每日最多</text>
				<text>发布5条消息</text>
			</view>
			<view class="line"></view>
			
			<view class="type">
				<view @click="handleClick('news')">
					<image src="/static/imgs/1@2x.png"></image>
					<text>最新班讯</text>
				</view>
				<view @click="handleClick('notice')">
					<image src="/static/imgs/2@2x.png"></image>
					<text>资源</text>
				</view>
<!-- 				
				<view bindtap="fb" data-type="4">
					<image src="/static/imgs/3@2x.png"></image>
					<text>活动</text>
				</view>
				<view bindtap="fb" data-type="5">
					<image src="/static/imgs/4@2x.png"></image>
					<text>内推</text>
				</view> -->
				<view @click="handleClick('other')">
					<image src="/static/imgs/5@2x.png"></image>
					<text>其他</text>
				</view>
			</view>
			
			 <view class="del" @click="handleClick('index')">
			   <image src="/static/imgs/shanchu@2x.png"></image>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			handleClick (v) {
				if (v === 'index') {
					uni.switchTab({
					    url: '/pages/index/index'
					});
				} else {
					uni.navigateTo({
					    url: `/pages/release/release?type=${v}`
					});
				}
				
			}
		}
	}
</script>

<style lang="scss">
.release {
	 .filter-bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;   
		background-image: url(../../static/imgs/filterbg.jpg);
		background-size:100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
		overflow: hidden;
		filter: blur(80rpx);
		opacity: 0.4;
	 }
	 .content {
		 position: absolute;
		 left: 0;
		 top: 0;
		 width: 100vw;
		 height: 90vh;
		.fonts {
			padding: 0 110rpx;
			margin-top: 50rpx;
			text {
				display: block;
				font-size: 50rpx;
				padding: 5rpx;
			}
		}
		.line {
			width: 100rpx;
			border-top: 3rpx solid #555;
			margin-left: 110rpx;
		}
		.type{
			 width: 700rpx;
			 position: absolute;
			 height: 380rpx;
			 bottom: 200rpx;
			 z-index: 3;
			 display: flex;
			 flex-wrap: wrap;
			 & > view {
			 	height: 180rpx;
			 	width: 110rpx;
			 	margin-left: 108rpx;
			 	font-size: 26rpx;
			 	font-family: Microsoft YaHei;
			 	font-weight: 400;
			 	color: #333;
			 	display: flex;
			 	flex-direction: column;
			 	align-items: center;
			 	& > image{
			 		width: 110rpx;
			 		height: 110rpx;
			 	}
			 	& > text{
			 	  margin-top: 10rpx;
			 	}

			 }
		}
		.del{
		  width: 100vw;
		  height: 100rpx;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  position: fixed;
		  bottom: 30rpx;
		  z-index: 2;
		  image{
		    width: 28rpx;
		    height: 28rpx;
		  }
		}
	 }
}
</style>
