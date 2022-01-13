<template>
	<view class="release">
		<!-- 内容输入 -->
		<view class="inputs">
		  <input type="text" v-model="title" focus class="title" maxlength="20" placeholder="快来输入标题吧（20个字以内）" />
		  <textarea class="content" v-model="content" placeholder='分享心中所想...' cols="30"  maxlength="200" rows="10"></textarea>
		  <view class="limit-text">{{200 - content.length}}字以内</view>
		</view>
		
		<!-- 上传图片 -->
		<view class="upload">
			<view v-if="imgs" v-for="(m, n) in imgs" class="imgs">
				<image :src="m"></image>
				<image src="/static/imgs/del@2x.png" class="del" @click="handleClick('delimg', n)"></image>
			</view>
			<view class="add" v-if="imgs.length < 9" @click="handleClick('upload')"> 
				<image src="/static/imgs/xiangji.png"></image>
				<text>添加照片(9张以内)</text>
			</view>
		</view>
		
		<!-- 位置&标签 -->
		<view class="tag-box">
			<view>
				<view class="address" v-if="address" @click="handleClick('pos')">
					<image style="width:18rpx" src="/static/imgs/icon_2@2x1.png"></image>
					<text>{{address}}</text>
				</view>
				<view class="address" v-else @click="handleClick('pos')">
					<image style="width:18rpx" src="/static/imgs/icon_2@2x.png"></image>
					<text>你在哪里</text>
				</view>
			</view>
			<view>
				<view class="address tag" v-if="tags.length"  v-for="(t, j) in tags">
					 <image src="/static/imgs/icon_1@2x1.png"></image>
					 <image src="/static/imgs/del@2x.png" @click="handleClick('deltag', j)"></image>
					 <text>{{t}}</text>
				</view>
				<view class="address" v-if="!tags.length" @click="handleClick('tag')">
					<image style="width:18rpx" src="/static/imgs/icon_2@2x.png"></image>
					<text>添加标签</text>
				</view>
			</view>
			
			<view class="release-info" :class="{'disable': !title || !content}" @click="handleClick('submit')">发布信息</view>

		</view>
	</view>

	
</template>

<script>
	export default {
		data() {
			return {
				typeid: null,
				title: '',
				content: '',
				address: '',
				tags: [],
				imgs:[]
			};
		},
		methods: {
			uploadImg() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						this.imgs.push(chooseImageRes.tempFilePaths)
					}
				});
				return;
				this.imgs.forEach(ele => {
						ele.forEach(item => {
								uni.uploadFile({
										url: '', //仅为示例，非真实的接口地址
										filePath: item,
										name: 'file',
										formData: {
												'user': 'test'  // 上传附带参数
										},
										success: (uploadFileRes) => {
												// 根据接口具体返回格式   赋值具体对应url
												console.log(uploadFileRes.data);
										}
								});
						})
				})

			},
			getLocation() {
				let that = this;
				uni.getLocation({
				    type: 'wgs84',
				　　 geocode:true,
				    success: function (res) {
				        console.log(res.address);
								that.address = res.address;
				    }
				});
			},
			showToast(v) {
				uni.showToast({
					title: v,
					icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
					duration: 1600    //持续时间为 2秒
				}) 
			},
			validateInfo() {
				if (!this.title) {
					this.showToast('请输入标题');
					return false;
				}
				if (!this.content) {
					this.showToast('请输入内容信息');
					return false;
				}
				return true;
			},
			submitInfo() {
				if(this.validateInfo()) {
					console.log('oooooooooo');
				}
			},
			handleClick(v, j) {
				switch(v) {
					case 'pos':
						this.getLocation();
						break;
					case 'tag':
						console.log(j);
						this.tags.push('aaa')
						break;
					case 'deltag':
						console.log(j);
						this.tags.splice(j, 1)
						break;
					case 'delimg':
						this.imgs.splice(j, 1)
						break;
					case 'upload':
						this.uploadImg();
						break;
					case 'submit':
						this.submitInfo();
						break;
					default:
				}
			}

		},
		watch:{
			content(v) {}
		},
		onLoad: function (option) {
			this.typeid = option.type;
		}
	}
</script>

<style lang="scss">
.release {
	// background-color: #ddd;
	padding: 20rpx 32rpx;
	.inputs {
		.title, .content {
			font-size: 28rpx;
			font-weight: 400;
			color: #333;
			width: calc(100vw - 84rpx);
			background-color: #f1f1f1;
			border-radius: 10rpx;
			padding: 10rpx 10rpx;
			
		}
		.title {
			height: 40rpx;
			border-radius: 10rpx;
			padding: 10rpx 10rpx;
		}
		.content {
			margin-top: 20rpx;
		}
		.limit-text {
			text-align: right;
			color: #999;
			font-size: 20rpx;
		}
	}

	.upload {
		// background-color: #fff;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.add {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border: 1rpx dashed #ccc;
			box-sizing: border-box;
			image {
				width: 60rpx !important;
				height: 53rpx !important;
				margin-bottom: 10rpx;
			}
		}
		& > view {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			width: 210rpx;
			height: 210rpx;
			margin-right: 28rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			position: relative;
			font-size: 20rpx;
			font-weight: 400;
			color: #999;
			&:nth-child(3n) {
				margin-right: 0;
			}
		}
		.imgs {
			image {
				border: solid 1px #ddd;
				width: 208rpx;
				height: 208rpx;
				border-radius: 10rpx;
			}
			.del {
				position: absolute;
				right: 2rpx;
				top: 1rpx;
				width: 28rpx;
				height: 28rpx;
				border: none;
				z-index: 99;
				background-color: rgba(0,0,0, .2);
				padding: 8rpx;
				border-radius: 20rpx;
			}
		}
	}
	.tag-box {
		width: 100%;
		height: 160rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 26rpx;
		
		& > view {
			display: flex;
			&> view {
				display: flex;
				align-items: center;
				color: #666;
				background-color: #ddd;
				border-radius: 20rpx;
				padding: 0 10rpx;
				
				&.address {
					margin-right: 40rpx;
					width: 160rpx;
					height: 36rpx;
					text {
						display: block;
						width: 140rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						
					}
					image {
						width: 28rpx;
						height: 24rpx;
						margin-right: 10rpx;
					}
					&.tag {
						position: relative;
						display: flex;
						text {
							max-width: 140rpx;
						}
						image {
							width: 26rpx;
							height: 24rpx;
							margin-right: 10rpx;
						}
						image:nth-child(2) {
							position: absolute;
							right: -20rpx;
							top: -20rpx;
							width: 26rpx;
							height: 24rpx;
							margin-right: 10rpx;
							padding: 10rpx;
						}
					}
				}
			}
		}
	}
	.bqbox{
		width: 670rpx;
		margin-left: 40rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		& > view {
			width: 150rpx;
			height: 40rpx;
			background: #F8F8F8;
			border-radius: 20rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			display: flex;
			color: #666666;
			display: flex;
			align-items: center;
			position: relative;
			margin-left: 30rpx;
			 image{
			  width: 24rpx;
			  height: 24rpx;
			
			}
		}
	}
	.release-info {
		position: absolute;
		bottom:0;
		left: 0;
		display: flex;
		justify-content: center;
		width: 100vw;
		height: 120rpx;
		line-height: 100rpx;
		font-weight: 700;
		font-size: 36rpx;
		color: #fff;
		background-color: #2483ff;
		&.disable {
			background-color: #ddd;
		}
	}
}
</style>
