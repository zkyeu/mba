<template>
	<view class="release">
		<view class="glass">
		<!-- 			<image src="/static/imgs/1@2x.png"></image> -->
		</view>
		
		<view class="content">
			<view class="fonts">
				<text>每日最多</text>
				<text>发布3条消息</text>
			</view>
			<view class="line"></view>
		</view>
		
		<view class="box">
		   <view bindtap="fb" data-type="3">
		     <image src="/static/imgs/1@2x.png"></image>
		     <text>需求</text>
		   </view>
		   <view bindtap="fb" data-type="2">
		    <image src="/static/imgs/2@2x.png"></image>
		     <text>资源</text>
		   </view>
		   <view bindtap="fb" data-type="4">
		    <image src="/static/imgs/3@2x.png"></image>
		     <text>活动</text>
		   </view>
		   <view style="margin-top:40rpx" bindtap="fb" data-type="5">
		    <image src="/static/imgs/4@2x.png"></image>
		     <text>内推</text>
		   </view>
		   <view style="margin-top:40rpx" bindtap="fb" data-type="6">
		    <image src="/static/imgs/5@2x.png"></image>
		     <text>其他</text>
		   </view>
		  </view>
		
<!-- 		 <view class="del" bindtap="back">
		   <image src="/static/imgs/shanchu@2x.png"></image>
		 </view> -->
		
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.release {
	 width: 100vw;   
	 height: 100vh;   
	 // background: url(../../static/imgs/beijin@2x.png);   
	 background-repeat: no-repeat;   
	 background-attachment: fixed;   
	 overflow: hidden;
	 
	 .glass {
		 position: absolute;
		 left: 0;
		 top: 0;
		 width: 100vw;
		 height: 100vh;
		 background: inherit;  
		 filter: blur(5px);
		 z-index: 1;
	 }
	 
	 .content {
		 z-index: 999;
		 padding: 20px;
		 .fonts {
			 margin-top:20px;
			 text {
				 display: block;
				 font-size: 30px;
				 padding: 5px;
			 }
		 }
		 .line {
			 width: 50px;
			 border-top: 3px solid #ddd;
			 margin-left: 10px;
		 }
		 .box{
			 width: 574rpx;
			 position: absolute;
			 height: 380rpx;
			 bottom: 200rpx;
			 z-index: 3;
			 display: flex;
			 flex-wrap: wrap;
			 & > view {
			 	height: 180rpx;
			 	width: 110rpx;
			 	margin-left: 120rpx;
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
	}
}
</style>
