var login={
	template:
		'<div>\
			<h1>登录</h1>\
			<input type="text" v-model="loginForm.username" placeholder="用户名"/>\
			<input type="text" v-model="loginForm.password" placeholder="密码"/>\
			<button @click="login">登录</button>\
		</div>',
	data () {
		return {
		  loginForm: {
			username: '',
			password: ''
		  }
		};
	},
	methods: {
		login () {
		  let _this = this;
		  if (this.loginForm.username === '' || this.loginForm.password === '') {
			alert('账号或密码不能为空');
		  } else {
			axios.post('login', {
                            name: this.loginForm.name,
                            age: this.loginForm.password
                          })
                          .then(res => {
                        	  console.log(res);
                              if(res.status == 200){
                            	  this.$router.push('/index');
                                  alert('登陆成功');
                              }else{
                            	  alert('账号或密码错误');
                              }
                              
                            }).catch(error => {
                              console.log(error);
                            });
		  }
		}
	}
}

var index={
	template:'<h1>main页面</h1>'
}

var header={
	template:'<h1>header页面</h1>'
}
var leftBox={
	template:'<h1>leftBox页面</h1>'
}

var mainBox={
	template:'<h1>mainBox页面</h1>'
}

var routerObj=new VueRouter({
	routes:[
	{path:'/',redirect: '/login'},
	{path:'/login',component: login},
	{
		path:'/index',components: {
			default:header,
			left:leftBox,
			main:mainBox
		}
	}
	]
})

var vm = new Vue({
	el:'#app',
	data:{},
	methods:{},
	router:routerObj
});