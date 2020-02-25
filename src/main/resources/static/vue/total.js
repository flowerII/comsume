const app = new Vue({
  data:{
	  user_name:null,
	  user_id:null,
	  activity_name:null,
	  activity_id:null,
	  teams: []
  },
  methods:{
	  comment(total){
	    	if(total > 0){
	    		return false;
	    	}else if(total<=0){
	    		return true;
	    	}
	    }  
  },
  mounted: function () {
	  this.user_name=document.getElementById('user_name').value;
	  this.user_id=document.getElementById('user_id').value;
	  this.activity_id=document.getElementById('activity_id').value;
	  this.activity_name=document.getElementById('activity_name').value;
	  axios.get('/activity/find_caculate_by_user_name_and_activity_name', {
	    	params: {
	    		user_name: document.getElementById('user_name').value,
	    		activity_name: document.getElementById('activity_name').value
		    }
		})
	  .then(response => (
  		  this.teams = response.data
  		  //console.log(response.data)
  	  ))
	  .catch(function (error) {
	    console.log(error);
	  });
  }
}).$mount('#app')
 
// 现在，应用已经启动了！