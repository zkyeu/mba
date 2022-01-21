<template>
	<view class="notice">
		<view class="header">
			<span class="notice-title"><i class="iconfont icon-notice"> 班级通知</i></span>
			<span class="iconfont icon-arrowRight-o1 greey"></span>
		</view>
		<view class="list">
			<text v-for="i in noticeData" class="line-list" @click="navigateTo(i.id)">• {{ i.title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeData: []
			};
		},
		components:{},
		methods: {
			fetchList() {
				uni.request({
				    url: 'https://www.sotm.cn/apiv1/get/articlelist', //仅为示例，并非真实接口地址。
				    data: {
							type: 35,
							pn: 1,
							rn: 3
				    },
						method: 'POST',
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
								this.noticeData = res.data.data;
				    }
				});
			},
			navigateTo(id) {
				uni.navigateTo({
				    url: `/pages/article/article-detail?id=${id}`
				});
			}
		},
		mounted() {
			this.fetchList();
		}
		
	}
</script>

<style lang="scss" scoped>
	// @import '@/common/icon/iconfont.css'
.notice{
	background-color: #fff;
	border-radius: 6px;
	padding:10px;
	
	.greey {
		color: #666 !important;
	}
	
	.header {
		display: flex;
		justify-content: space-between;
		
		.split {
		margin-right:10px;
		}
		
		span {
			font-weight: 700;
			color: #D97409;
		}
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top:5px;
		.line-list {
			text-indent: 1em;
			font-size: 12px;
			height: 20px;
			line-height: 20px;
			overflow: hidden;
			white-space:nowrop;
			text-overflow: ellipsis;
		}
	}
}
.arrowRight-o {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: #F00;
  overflow: hidden;
}
</style>
