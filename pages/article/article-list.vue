<template>
		<view class="content">
			<view  v-for="(i, j) in typeData" :key="j" @click="navigateTo(i.id)">
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
					<span><i class="iconfont icon-position-o" v-if="i.address">{{i.address}}</i></span>
					<span><i class="iconfont icon-pinglun-tongyong" >{{i.comment}}</i></span>
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
		margin: 10px 0;
		background-color: #fff;
		border-radius: 6px;
		padding: 10px;
	}
	.article-person {
		display: flex;
		justify-content: space-between;
		
		.person {
			display: flex;
			margin-bottom: 10px;
			image {
				margin-right: 8px;
				border-radius: 20px;
				overflow: hidden;
				background-color: #ddd;
				width:34px;
				height: 34px;
			}
			.name-block {
				display: flex;
				flex-direction: column;
				.name {
					display: flex;
					font-size: 13px;
					
					.tags {
						background-color: #333;
						color: #fff;
						border-radius: 6px;
						padding: 0 8px;
						height: 18px;
						line-height: 18px;
						margin-left: 8px;
						font-size: 10px;
					}
				}
				.date {
					font-size: 12px;
					color: #aaa;
				}
			}
		}
		
		.type {
			display: none;
		}
	}
	
	.article-title {
		font-size:14px;
		margin-bottom: 6px;
	}
	
	.article-content{
		font-size: 13px;
		color: #333;
	}
	
	.img-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: flex-start;
		margin-top:16px;
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
		padding-top: 16px;
		justify-content: space-between;
		color: #777;
		
		span {
			display: flex;
			align-items: center;
		}
		.iconfont {
			font-size: 12px;
		}
	}
</style>
