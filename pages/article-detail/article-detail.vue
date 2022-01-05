<template>
	<view  class="content">
		<view class="article-person">
			<view class="person">
				<!-- <image src="../../static/imgs/logo.png" mode=""></image> -->
				<image :src="userInfo.avatarUrl"></image>
				<view class="name-block">
					<view class="name">
						<view>MBA21081班委</view>
						<!-- <view class="tags">学习园地</view> -->
					</view>
					<view class="date">
						{{ articleData.create_time }}
					</view>
				</view>
			</view>
			<!-- <view class="type">预留</view> -->
		</view>
		<view class="article-title">{{articleData.title}}</view>
		<!-- <view class="article-text" v-html="articleData.body"></view> -->
		<rich-text class="article-content" :nodes="handleContent(articleData.body)"></rich-text> 
<!-- 		<view class="img-list">
				<image :src="i" v-for="i in articleInfo.imgs"></image>
		</view> -->
		<view class="props">
			<span><i class="iconfont icon-position-o" v-if="articleData.address">{{articleData.address}}</i></span>
			<span @click="hanleBtn('comment')"><i class="iconfont icon-pinglun-tongyong">{{articleData.comment}}</i></span>
			<span @click="hanleBtn('like')"><i class="iconfont icon-praise-o" v-if="articleData.like">{{articleData.like}}</i></span>
		</view>
		<Comment />
	</view>
</template>

<script>
	import Moment from 'moment';
	import Comment from '../../components/comment/comment.vue';
	export default {
		data() {
			return {
				aid: null,
				articleData: null,
				code: '',
				userInfo: {},
				nickName: ''
			};
		},
		components:{
			Comment
		},
		methods: {
			// 获取当前页面信息
			fetchPageInfo() {
				// 获取头像，名字，标签，文章发布时间，文章信息，位置，评论，点赞
			},
				
			
			// 按钮点击交互
			hanleBtn (v) {
				console.log(v);
				switch (v){
					case 'comment':
					
					break;
					case 'like':
					
					break;
					default:
				}
			},
			handleContent (v) {
				const regex = new RegExp('<img', 'gi');
				return v.replace(regex,'<img style="max-width: 100%;"');
			},

			fetchArticle(){
				if (!this.aid) return;
				uni.request({
				    url: 'https://www.sotm.cn/apiv1/get/article',
				    data: {
							id: parseInt(this.aid)
				    },
						method: 'GET',
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
								this.articleData = res.data.data;
				    }
				});
			}
		},
		onShareAppMessage: function () {
			return {
				title: this.articleData.title,
				path:"/pages/article-detail/article-detail?id="+this.aid,
				// imageUrl:this.data.info.img?this.data.info.img[0]:''
			}
		},
		
		mounted() {
			// this.toLogin();
			this.fetchArticle();
		},
		onLoad: function (option) {
			this.aid = option.id;
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// margin: 10px 0;
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
	
	/deep/ .article-content{
		font-size: 13px;
		color: #333;
		img {
			max-width: 100%;
		}
		image {
			width: 100px;
		}
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
