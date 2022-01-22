<!-- 横向选项卡（水平滚动导航栏） -->
<template>
	<view class="article">
		
		<!-- 顶部导航栏 -->
		<view class="horizonal-tab">
			<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
				<block v-for="(item,index) in tabBars" :key="index">
					<view class="scroll-tab-item" :class="{'active': tabIndex==index}" 
					@tap="toggleTab(index)">
						{{item.name}}
						<view class="scroll-tab-line"></view>
					</view>
				</block>
			</scroll-view>
		</view>
		<alist></alist>
	</view>
</template>
 
<script>
	import alist from './article/article-list.vue';
	
	export default {
		data () {
			return {
				tabIndex: 0,
				tabBars:[
					{
						name: '最新班讯',
						id: 'guanzhu'
					},
					// {
					// 	name: '学习园地',
					// 	id: 'tuijian'
					// },
					// {
					// 	name: '班级生活',
					// 	id: 'redian'
					// },
					// {
					// 	name: '年级活动',
					// 	id: 'tiyu'
					// },
					// {
					// 	name: '其他',
					// 	id: 'caijing'
					// }
				]
			}
		},
		components: {
			alist
		},
		methods:{
			//切换选项卡
			toggleTab (index) { 
				this.tabIndex = index;
			},
			//滑动切换swiper
			tabChange (e) { 
				this.tabIndex = e.detail.current;
			}

		},
		created() {

		}
	}
	
</script>
 
<style lang="scss" scoped>
	.horizonal-tab .active{
		color: red;
	}
	.scroll-tab{
		white-space: nowrap; /* 必要，导航栏才能横向*/
		border-bottom: 1rpx solid #eee;
		text-align: center;
	}
	.scroll-tab-item{
		display: inline-block; /* 必要，导航栏才能横向*/
		margin: 20rpx 30rpx 0 30rpx;
	}
	.active .scroll-tab-line{
		border-bottom: 5rpx solid red;
		border-top: 5rpx solid red;
		border-radius: 20rpx;
		/* width: 70rpx; */
		
	}
</style>