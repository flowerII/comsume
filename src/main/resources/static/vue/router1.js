// 0. 如果使用模块化机制编程，导入 Vue 和 VueRouter，要调用 Vue.use(VueRouter)
 
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
Vue.filter('dateFormat',function(dateStr){
	var dt=new Date(dateStr)
	var y=dt.getFullYear()
	var m=dt.getMonth()+1
	var d=dt.getDate()
	
	return `${y}-${m}-${d}`
})

const Foo = { 
	data() {
		return {
			all_users:[],
			all_teams:[],
			formInline:{
				scale1:null,
				name:null
			},
	        ruleForm: {
	          name: null,
	          region: null,
	          date1: null,
	          avg: null,
	          users:[],
			  teams:[],
	          koufen: null,
	          items:[]
	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入活动名称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          region: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ],
	          date1: [
	            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          ],
	          avg: [
	            { required: true, message: '请选择是否计算加权平均分', trigger: 'change' }
	          ],
			  teams:[
		            { required: true, message: '请选择队伍', trigger: 'blur' }
			  ],
			  users:[
		            { required: true, message: '请选择评委', trigger: 'blur' }
			  ],
			  items:[
		            { required: true, message: '请添加评分项', trigger: 'blur' }
			  ],
	          koufen: [
		            { required: true, message: '请选择是否含扣分项', trigger: 'change' }
		      ]
	        }
	      };
    },
	template: ' \
	<div>\
		<h3 style="text-align:center">活动设计</h3>\
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> \
		  <el-form-item label="活动名称" prop="name"> \
		    <el-input v-model="ruleForm.name"></el-input> \
		  </el-form-item>\
		  <el-form-item label="活动地点" prop="region">\
			<el-input v-model="ruleForm.region"></el-input> \
		  </el-form-item>\
		  <el-form-item label="活动时间" required>\
		      <el-form-item prop="date1">\
		        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" value-formate="timestamp" style="width: 100%;"></el-date-picker>\
		      </el-form-item>\
		  </el-form-item>\
		  <el-form-item label="加权平均分" prop="avg">\
		    <el-radio-group v-model="ruleForm.avg">\
		      <el-radio label="true">计算</el-radio>\
		      <el-radio label="false">不计算</el-radio>\
		    </el-radio-group>\
		  </el-form-item>\
			<el-form-item label="含扣分项" prop="koufen">\
		    <el-radio-group v-model="ruleForm.koufen">\
		      <el-radio label="true">是</el-radio>\
		      <el-radio label="false">否</el-radio>\
		    </el-radio-group>\
		  </el-form-item>\
			<el-form-item label="队伍选择" prop="teams">\
				<el-transfer \
				filterable \
			    v-model="ruleForm.teams" \
				:titles="[\'所有队伍\', \'已选择队伍\']"\
			    :data="all_teams"> \
			  </el-transfer> \
		  	</el-form-item>\
			<el-form-item label="评委选择" prop="users">\
			  <el-transfer \
				filterable \
			    v-model="ruleForm.users" \
			    :titles="[\'所有评委\', \'已选择评委\']"\
			    :data="all_users"> \
			  </el-transfer> \
		  	</el-form-item>\
			<el-form-item label="评分项" >\
				<el-form :inline="true" :model="formInline" class="demo-form-inline"> \
				  <el-form-item label="标准"> \
				    <el-input v-model="formInline.name" placeholder="动作标准、规范"></el-input> \
				  </el-form-item> \
				  <el-form-item label="分值"> \
				  	<el-select v-model="formInline.scale1" placeholder="请选择分值"> \
						<el-option label="10" value="10"></el-option> \
						<el-option label="5" value="5"></el-option> \
					</el-select> \
				  	</el-form-item> \
				  <el-form-item> \
				    <el-button type="primary" @click="item_add">添加</el-button> \
				  </el-form-item> \
				</el-form> \
			<el-table \
	    	:data="ruleForm.items" \
			    border \
			    style="width: 100%"> \
			    <el-table-column \
			      prop="name" \
			      label="标准" \
			      width="180"> \
			    </el-table-column> \
			    <el-table-column \
			      prop="scale1" \
			      label="分数"> \
			    </el-table-column> \
			  </el-table> \
		  	</el-form-item>\
		  <el-form-item>\
		    <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>\
		    <el-button @click="resetForm(ruleForm)">重置</el-button>\
		  </el-form-item>\
		</el-form>\
	</div>\
	',
	mounted(){
		this.init()
	},
	methods: {
		submitForm(formName) {
	        this.$refs.ruleForm.validate((valid) => {
	          if (valid) {
	            console.log(this.ruleForm);
	            if(this.ruleForm.users.length<3&&this.ruleForm.avg){
	            	alert('计算加权平均需至少3个队伍!!');
		            return false;
	            }else{
	            	axios({
						  method: 'post',
						  url: '/activity/add',
						  data: {
							  name: this.ruleForm.name,
							  holdaddress: this.ruleForm.region,
							  holdtime: this.ruleForm.date1,
							  avg: this.ruleForm.avg,
							  koufen: this.ruleForm.koufen,
							  teams: this.ruleForm.teams,
							  users: this.ruleForm.users,
							  active: 1,
							  items:this.ruleForm.items
						  }
						}).then(response=>{
								console.log(response.data)
								if(response.data===1){
									alert("操作成功！")	
									this.handleSizeChange(5)
								}			
						}
				      )
				      .catch(function (error) { // 请求失败处理
				        console.log(error);
				      });
	            }
	            
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs.ruleForm.resetFields();
	      },
	      get_users(){
	    	  axios.get('/activity/init')
			  .then(response => (
				        response.data.users.forEach((user, index) => {
				        	this.all_users.push({
				            label: user.username,
				            key: user.id
				          });
				        })				        
		    	  ))
			  .catch(function (error) {
			    console.log(error);
			  });
	      },
	      get_teams(){
	    	  axios.get('/activity/init')
			  .then(response => (
				        response.data.teams.forEach((team, index) => {
				        	this.all_teams.push({
				            label: team.name,
				            key: team.id
				          });
				        })     
		    	  ))
			  .catch(function (error) {
			    console.log(error);
			  });
	      },
	      init(){
	    	  this.get_teams(),
	    	  this.get_users()
	      },
	      item_add(){
	    	  console.log(this.formInline)
	    	  var item={name:this.formInline.name,scale1:this.formInline.scale1}
	    	  this.ruleForm.items.push(item)
	    	  this.formInline.name=this.formInline.scale1=null
	      }
	  }
}
const Activity = {
	data() {
      return {
        gridData: [],
        page_size: 5,
    	current_page: 1,
    	dialogFormVisible:false,
    	dialogForm:{
    		id:null,
    		name:null
    	},
    	searchMap:{
    		username:null,
    		firstime:null,
    		endtime:null
    	},
        total:0
      };
    },
	template: ' \
	<div>\
		<br/> \
	    <el-form :inline="true"> \
	      <el-form-item label="活动名称"> \
	        <el-input v-model="searchMap.name"></el-input>  \
	      </el-form-item> \
			<el-form-item label="开始时间"> \
	        <el-input v-model="searchMap.firstime" type="date"></el-input>  \
	      </el-form-item> \
			<el-form-item label="结束时间"> \
	        <el-input v-model="searchMap.endtime" type="date"></el-input>  \
	      </el-form-item> \
	      <el-button @click="searchAcitivity()" type="primary">查询</el-button> \
	    </el-form> \
	  <el-table :data="gridData">\
		<el-table-column prop="id" label="活动ID" width="150"></el-table-column>\
		<el-table-column prop="name" label="活动名称" width="150"></el-table-column>\
		<el-table-column prop="holdaddress" label="活动地点" width="200"></el-table-column>\
		<el-table-column prop="holdtime" label="活动时间" width="200" :formatter="dateFormatter"></el-table-column>\
		<el-table-column prop="active" label="是否有效" width="150" :formatter="isActive"></el-table-column>\
		<el-table-column prop="avg" label="加权平均分" width="150" :formatter="isActive"></el-table-column>\
		<el-table-column prop="koufen" label="超时扣分" width="200" :formatter="isActive"></el-table-column>\
		<el-table-column \
		      label="操作" \
		      width="100"> \
		<template slot-scope="scope"> \
        <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button> \
      </template> \
		</el-table-column> \
	  </el-table>\
	  <div class="block">\
	    <el-pagination\
	      @size-change="handleSizeChange"\
	      @current-change="handleCurrentChange"\
	      :current-page="current_page"\
	      :page-sizes="[5, 10, 15, 20]"\
	      :page-size="page_size"\
		  background \
	      layout="total, sizes, prev, pager, next, jumper"\
	      :total="total">\
	    </el-pagination>\
	  </div>\
		<el-dialog title="详情" :visible.sync="dialogFormVisible"> \
		  <el-form :model="dialogForm"> \
		    <el-form-item label="ID"> \
		      <el-input v-model="dialogForm.id" autocomplete="off"></el-input> \
		    </el-form-item> \
		    <el-form-item label="名称"> \
			  <el-input v-model="dialogForm.name" autocomplete="off"></el-input> \
		    </el-form-item> \
		  </el-form> \
		  <div slot="footer" class="dialog-footer"> \
		    <el-button @click="dialogFormVisible = false">取 消</el-button> \
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> \
		  </div> \
		</el-dialog> \
	</div>\
	',
	mounted(){
		axios.get('/activity/admin', {
		    	params: {
		    		page_size: 5,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  this.total=response.data.total,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
	},
	methods: {
		dialogTableVisible: function () {
		  this.todos.push({
			id: this.nextTodoId++,
			title: this.newTodoText
		  })
		  this.newTodoText = ''
		},
		isActive:function(row,column){
			console.log(row.active);
		    if(row.active){
		    	return '是';
		    }
			return '否';
		},
		handleSizeChange(val) {
			axios.get('/activity/admin', {
		    	params: {
		    		page_size: val,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		handleCurrentChange(val) {
			axios.get('/activity/admin', {
		    	params: {
		    		page_size: this.page_size,
		    		current_page:val
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		searchAcitivity:function() {
			console.log(this.searchMap);
			axios({
				  method: 'get',
				  url: '/search',
				  data: {
					  name: this.searchMap.username,
					  time: this.searchMap.firstime,
					  endtime: this.searchMap.endtime
				  }
				}).then(response=>{
						console.log(response.data)
						if(response.data===1){
							alert("操作成功！")	
							this.handleSizeChange(5)
						}
						
				}
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
		},
		dateFormatter:function(row,column){
			//console.log(row);
			var datetime = row.holdtime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let y=datetime.getFullYear()+'-';
		    	let m=datetime.getMonth()+1+'-';
		    	let d=datetime.getDate();
		    	return y+m+d;
		    }
			return '';
		},
		handleEdit(row){
		   this.dialogFormVisible=true  //打开窗口
		   this.form.id=row.id
		   this.form.name=row.name
		   console.log(row);
		}
	  }
}

//team
const Team = { 
	data() {
      return {
        gridData: [],
        page_size: 5,
    	current_page: 1,
    	dialogFormVisible:false,
    	dialogForm:{
    		id:null,
    		name:null
    	},
    	addMap:{
    		name:null
    	},
        total:0
      };
    },
	template: ' \
	<div>\
		<br/> \
	    <el-form :inline="true"> \
	      <el-form-item label="队伍名称"> \
	        <el-input v-model="addMap.name"></el-input>  \
	      </el-form-item> \
	      <el-button @click="addTeam()" type="primary">添加</el-button> \
	    </el-form> \
	  <el-table :data="gridData">\
		<el-table-column prop="id" label="队伍ID" width="150"></el-table-column>\
		<el-table-column prop="name" label="队伍名称" width="200"></el-table-column>\
		<el-table-column \
		      label="操作" \
		      width="100"> \
		<template slot-scope="scope"> \
        <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button> \
      </template> \
		</el-table-column> \
	  </el-table>\
	  <div class="block">\
	    <el-pagination\
	      @size-change="handleSizeChange"\
	      @current-change="handleCurrentChange"\
	      :current-page="current_page"\
	      :page-sizes="[5, 10, 15, 20]"\
	      :page-size="page_size"\
		  background \
	      layout="total, sizes, prev, pager, next, jumper"\
	      :total="total">\
	    </el-pagination>\
	  </div>\
		<el-dialog title="详情" :visible.sync="dialogFormVisible"> \
		  <el-form :model="dialogForm"> \
		    <el-form-item label="ID"> \
		      <el-input v-model="dialogForm.id" autocomplete="off"></el-input> \
		    </el-form-item> \
		    <el-form-item label="名称"> \
			  <el-input v-model="dialogForm.name" autocomplete="off"></el-input> \
		    </el-form-item> \
		  </el-form> \
		  <div slot="footer" class="dialog-footer"> \
		    <el-button @click="dialogFormVisible = false">取 消</el-button> \
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> \
		  </div> \
		</el-dialog> \
	</div>\
	',
	mounted(){
		axios.get('/team/admin', {
		    	params: {
		    		page_size: 5,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  this.total=response.data.total,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
	},
	methods: {
		dialogTableVisible: function () {
		  this.todos.push({
			id: this.nextTodoId++,
			title: this.newTodoText
		  })
		  this.newTodoText = ''
		},
		handleSizeChange(val) {
			axios.get('/team/admin', {
		    	params: {
		    		page_size: val,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		handleCurrentChange(val) {
			axios.get('/team/admin', {
		    	params: {
		    		page_size: this.page_size,
		    		current_page:val
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		addTeam:function() {
			console.log(this.addMap);
			axios({
				  method: 'post',
				  url: '/team/add',
				  data: {
					  name: this.addMap.name
				  }
				}).then(response=>{
			    	      //this.tableData = response.data
						console.log(response.data)
						if(response.data===1){
							alert("操作成功！")	
							this.handleSizeChange(5)
						}
						
				}
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
			this.getlist();
		},
		getlist(){
			axios.get('/team/admin', {
		    	params: {
		    		page_size: 5,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  this.total=response.data.total,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		handleEdit(row){
		   this.dialogFormVisible=true  //打开窗口
		   this.form.id=row.id
		   this.form.name=row.name
		   console.log(row);
		}
	  }
}

//user
const User = { 
	data() {
      return {
        gridData: [],
        page_size: 5,
    	current_page: 1,
    	dialogFormVisible:false,
    	dialogForm:{
    		id:null,
    		name:null
    	},
    	addMap:{
    		username:null,
    		staffno:null,
    		password:null
    	},
        total:0
      };
    },
	template: ' \
	<div>\
		<br/> \
	    <el-form :inline="true"> \
	      <el-form-item label="工号"> \
	        <el-input v-model="addMap.staffno"></el-input>  \
	      </el-form-item> \
			<el-form-item label="姓名"> \
	        <el-input v-model="addMap.username"></el-input>  \
	      </el-form-item> \
			<el-form-item label="密码"> \
	        <el-input v-model="addMap.password"></el-input>  \
	      </el-form-item> \
	      <el-button @click="addUser()" type="primary">添加</el-button> \
	    </el-form> \
	  <el-table :data="gridData">\
		<el-table-column prop="id" label="编号" width="150"></el-table-column>\
		<el-table-column prop="staffno" label="工号" width="150"></el-table-column>\
		<el-table-column prop="username" label="姓名" width="200"></el-table-column>\
		<el-table-column \
		      label="操作" \
		      width="100"> \
		<template slot-scope="scope"> \
        <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button> \
      </template> \
		</el-table-column> \
	  </el-table>\
	  <div class="block">\
	    <el-pagination\
	      @size-change="handleSizeChange"\
	      @current-change="handleCurrentChange"\
	      :current-page="current_page"\
	      :page-sizes="[5, 10, 15, 20]"\
	      :page-size="page_size"\
		  background \
	      layout="total, sizes, prev, pager, next, jumper"\
	      :total="total">\
	    </el-pagination>\
	  </div>\
		<el-dialog title="详情" :visible.sync="dialogFormVisible"> \
		  <el-form :model="dialogForm"> \
		    <el-form-item label="ID"> \
		      <el-input v-model="dialogForm.id" autocomplete="off"></el-input> \
		    </el-form-item> \
		    <el-form-item label="名称"> \
			  <el-input v-model="dialogForm.name" autocomplete="off"></el-input> \
		    </el-form-item> \
		  </el-form> \
		  <div slot="footer" class="dialog-footer"> \
		    <el-button @click="dialogFormVisible = false">取 消</el-button> \
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> \
		  </div> \
		</el-dialog> \
	</div>\
	',
	mounted(){
		axios.get('/user/admin', {
		    	params: {
		    		page_size: 5,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  this.total=response.data.total,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
	},
	methods: {
		dialogTableVisible: function () {
		  this.todos.push({
			id: this.nextTodoId++,
			title: this.newTodoText
		  })
		  this.newTodoText = ''
		},
		handleSizeChange(val) {
			axios.get('/user/admin', {
		    	params: {
		    		page_size: val,
		    		current_page:1
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		handleCurrentChange(val) {
			axios.get('/user/admin', {
		    	params: {
		    		page_size: this.page_size,
		    		current_page:val
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		addUser:function() {
			console.log(this.addMap);
			axios({
				  method: 'post',
				  url: '/user/add',
				  data: {
					  username: this.addMap.username,
					  password: this.addMap.password,
					  staffno: this.addMap.staffno
				  }
				}).then(response=>{
						console.log(response.data)
						if(response.data===1){
							alert("操作成功！")	
							this.handleSizeChange(5)
						}
						
				}
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
		},
		handleEdit(row){
		   this.dialogFormVisible=true  //打开窗口
		   this.form.id=row.id
		   this.form.name=row.name
		   console.log(row);
		}
	  }
}
 
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/team', component: Team },
  { path: '/user', component: User },
  { path: '/activity', component: Activity }
]
 
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
 
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  data:{
	  username:'',
	  activities: [],
	  logout:'/logout'
  },
  mounted: function () {
	  this.username=document.getElementById('username').value;
	  axios.get('/activity/get_by_useruanme', {
	    	params: {
	    		username: document.getElementById('username').value
		    }
		})
	  .then(response => (
  		  this.activities = response.data
  		  //console.log(response.data)
  	  ))
	  .catch(function (error) {
	    console.log(error);
	  });
  },
  router
}).$mount('#app')
 
// 现在，应用已经启动了！