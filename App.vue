<script>
	export default {
		globalData: {  
			text: '345678',
			code: '',
			openid: ''
		}, 
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onShareAppMessage: function () {
			console.log('1111')
		    // return custom share data when user share.
		  },
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/reset.scss");
	/* @import 'iconfont.css' */
	@import url("./common/icon/iconfont.css");
</style>
