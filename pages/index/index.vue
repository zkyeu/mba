<template>
	<view class="content">
		<notice></notice>
		<types></types>
		<image class="logo" src="/static/imgs/logo.png"></image>
		<view class="copy-right">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import Config from '@/utils/config.js';
	import notice from '@/pages/notice/index.vue';
	import types from '@/pages/article/types.vue';
	
	export default {
		data() {
			return {
				title: '2022©MBA21081班委宣'
			}
		},
		components: {
			notice,
			types
		},
		onLoad() {

		},
		methods: {

		},
		onShareAppMessage: function () {
			return {
				title: 'MBA21081班',
				path: 'pages/index/index',
			}
		},
		mounted() {
			
		},
		onShow() {
		            // uni.hideTabBar({
		            //     animation: false
		            // })
		        }
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		padding: 0 10px;

		// align-items: center;
		// justify-content: center;
	}

	.logo {
		height: 220rpx;
		width: 230rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.copy-right {
		display: flex;
		justify-content: center;
		.title {
			font-size: 36rpx;
			color: #8f8f94;
			padding-bottom: 30px;
		}
	}


</style>
