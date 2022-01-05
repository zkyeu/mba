<template>
	<view class="comment bor">
		<view class="photo">
			<image src="../../static/imgs/logo.png"></image>
		</view>
		<view class="to-comment">
			<input type="text" placeholder="请输入文本" />
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
.comment {
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	padding-top: 20rpx;
	z-index: 99;
	background: #fff;
	width: 100vw;
	height: 170rpx;

	&.bor::after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1px;
		background-image: linear-gradient(0deg, #ddd 50%, transparent 50%);
	}
	
	.photo {
		width: 30rpx;
		height: 30rpx;
		image {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20px;
		}
	}
	.to-comment {
		flex: 1;
		background: #f8f8f8;
		border-radius: 10px;
		height: 50rpx;
		width: 70vw;
	}
	.iphone {
		width: 100vw;
		height: 50rpx;
	}
}
</style>
