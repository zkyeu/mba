<template>
		<view class="content">
			<view class="item" v-for="(i, j) in typeData" :key="j" @click="navigateTo(i.id)">
				<view class="article-person">
					<view class="person">
						<image src="../../static/imgs/logo.png"></image>
						<view class="name-block">
							<view class="name">
								<view>MBA21081班</view>
								<view class="tags" v-if="translateTypeid(i.type)">{{translateTypeid(i.type)}}</view>
							</view>
							<view class="date">
								{{i.create_time.substring(0,10)}}
							</view>
						</view>
					</view>
					<view class="type">预留</view>
				</view>
				
				<view class="article-title">{{i.title}}</view>
				<view class="img-list" v-if="false">
						<image src="../../static/imgs/logo.png" v-for="i in 6"></image>
				</view>
				<view class="props">
					<span><i class="iconfont icon-icon_position" v-if="i.address">{{i.address}}</i></span>
					<span><i class="iconfont icon-pinglun">{{i.comment}}</i></span>
					<span><i class="iconfont icon-praise-o" v-if="i.like">{{i.like}}</i></span>
				</view>
			</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				typeData: [],
				typeList: []
			};
		},
		methods: {
			// 获取文章列表
			fetchList() {
				uni.request({
					url: 'https://www.sotm.cn/apiv1/get/articlelist',
					data: {
						pn: 1,
						rn: 10
					},
					method: 'POST',
					header: {
							'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
							this.typeData = res.data.data;
							this.total = res.data.count;
					}
				});
				
				uni.request({
				    url: 'https://www.sotm.cn/apiv1/get/getdiytypes', //仅为示例，并非真实接口地址。
						method: 'GET',
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
							this.typeList = res.data.data;
				    }
				});
			},
			// 标签名称
			translateTypeid(id) {
				let tag = '';
				this.typeList.map((item)=> {
					if(item.id === id) {
						return tag = item.typename;
					}
				})
				return tag;
			},
			
			// 文章详情
			navigateTo(id) {
				uni.navigateTo({
				    url: `/pages/article/article-detail?id=${id}`
				});
			}
		},
		
		created() {
			this.fetchList();
		}
	}
</script>

<style lang="scss" scoped>
.content {
		margin: 20rpx 0;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 32rpx;
		
		.item {
			margin-bottom: 40rpx;
		}
	}
	.article-person {
		display: flex;
		justify-content: space-between;
		
		.person {
			display: flex;
			margin-bottom: 16rpx;
			image {
				margin-right: 16rpx;
				border-radius: 40rpx;
				overflow: hidden;
				background-color: #ddd;
				width: 68rpx;
				height: 68rpx;
			}
			.name-block {
				display: flex;
				flex-direction: column;
				.name {
					display: flex;
					font-size: 26rpx;
					
					.tags {
						background-color: #333;
						color: #fff;
						border-radius: 12rpx;
						padding: 0 16rpx;
						height: 36rpx;
						line-height: 36rpx;
						margin-left: 16rpx;
						font-size: 20rpx;
					}
				}
				.date {
					font-size: 24rpx;
					color: #aaa;
				}
			}
		}
		
		.type {
			display: none;
		}
	}
	
	.article-title {
		font-size: 28rpx;
		margin-bottom: 12rpx;
	}
	
	.article-content{
		font-size: 26rpx;
		color: #333;
	}
	
	.img-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: flex-start;
		margin-top: 32rpx;
		image{
			width: 25vw;
			height:80px;
			
			// background-color: #f00;
			// height: 60px;
			// height: auto;
			// marin: 20px;
		}
	}
	.props {
		display: flex;
		// padding-top: 16rpx;
		justify-content: space-between;
		color: #777;
		
		span {
			display: flex;
			align-items: center;
		}
		.iconfont {
			font-size: 24rpx;
		}
	}
</style>
