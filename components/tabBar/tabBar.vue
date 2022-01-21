<template>
    <cover-view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
        <cover-view class="tabbar-item"
            v-for="(item, index) in list" 
            :key="index" 
            @click="tabbarChange(item.path)"
        >
            <cover-image class="item-img" :src="item.icon_a" v-if="current == index"></cover-image>
            <cover-image class="item-img" :src="item.icon" v-else></cover-image>
            <cover-view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</cover-view>
        </cover-view>
    </cover-view>
</template>

<script>
export default {
    props: {
        current: String
    },
    data() {
        return {
            paddingBottomHeight: 0,
            list: [{
                    text: '首页',  
                    icon: '/static/images/logo.png',  //未选中图标
                    icon_a: '/static/images/logo.png',  //选中图片
                    path: "/pages/index/index",  //页面路径
                },{
                    text: '分类',
                    icon: '/static/images/classify.png',
                    icon_a: '/static/images/classify_i.png',
                    path: "pages/article/article-detail",
                }
                ,{
                    text: '订单',
                    icon: '/static/images/order.png',
                    icon_a: '/static/images/order_i.png',
                    path: '/pages/index/index',
                },{
                    text: '我的',
                    icon: '/static/images/me.png',
                    icon_a: '/static/images/me_i.png',
                    path: "/pages/index/index",
                },
            ]
        };
    },
    created() {
        let that = this;
        uni.getSystemInfo({
            success: function (res) {
                let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
                model.forEach(item => {
                    //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
                    if(res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
                        that.paddingBottomHeight = 40;
                    }
                })
            }
        });
    },
    watch: {
        
    },
    methods: {
        tabbarChange(path) {
            uni.switchTab({
                url: path
            })
        }
    }
};
</script>

<style lang="scss" scoped>
    .tabbarActive{
        color: #79D5AD !important;
    }
    .tabbar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100rpx;
                background-color: #ffffff;
        .tabbar-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100rpx;
            .item-img{
                margin-bottom: 4rpx;
                width: 46rpx;
                height: 46rpx;
            }
            .item-name{
                font-size: 26rpx;
                color: #A3A3A3;
            }
        }
    }
</style>