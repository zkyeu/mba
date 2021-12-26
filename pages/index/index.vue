<template>
	<view class="content">
		<notice></notice>
		<navigate></navigate>
		<!-- <articles></articles> -->
<view>
		
		
	</view>
		<image class="logo" src="/static/imgs/logo.png"></image>
		<view class="copy-right">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import notice from '@/components/notice/index.vue';
	import navigate from '@/components/navigate/navigate.vue';
	import articles from '@/components/article/article.vue';
	
	export default {
		data() {
			return {
				title: '2022©MBA21081班委宣'
			}
		},
		components: {
			notice,
			navigate,
			articles
		},
		onLoad() {

		},
		methods: {

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
