const app = new Vue({
  data:{
	  loginForm:{
		  username:null,
		  password:null
	  }
  },
  methods:{
	  submitLoginForm(){
		  const params = new URLSearchParams();
		  params.append('username', this.loginForm.username);
		  params.append('password', this.loginForm.password);
		  axios.post('/login', params)
		  .then(function (response) {
			    console.log("hahah");
			    window.location.href='/';
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	  }
  },
  mounted: function () {
	  
  }
}).$mount('#app')
 
// 现在，应用已经启动了！