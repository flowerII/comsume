// 0. 如果使用模块化机制编程，导入 Vue 和 VueRouter，要调用 Vue.use(VueRouter)
function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

var validPhone=(rule, value,callback)=>{
  if (!value){
      callback(new Error('请输入电话号码'))
  }else  if (!isvalidPhone(value)){
    callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
}
 
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
Vue.filter('dateFormat',function(dateStr){
	var dt=new Date(dateStr)
	var y=dt.getFullYear()
	var m=dt.getMonth()+1
	var d=dt.getDate()
	
	return `${y}-${m}-${d}`
})

//机房增加
const AddLab = { 
	data() {
		return {
			classes:[],
			flag: null,
	        ruleForm: {
	          labcode: null,
	          labname: null,
	          location: null,
	          labclass: null,
			  room: null,
	          managername: null,
	          managerphone:null
	        },
	        rules: {
	          labcode: [
	            { required: true, message: '请填写机房编码', trigger: 'blur' }
	          ],
	          labname: [
	        	{ required: true, message: '请填写机房名称', trigger: 'blur' }
	          ],
	          location: [
	            { required: true, message: '请填写机房位置', trigger: 'blur' }
	          ],
	          labclass: [
	            { required: true, message: '请选择机房所属分类', trigger: 'blue' }
	          ],
			  room:[
		        { required: true, message: '请填写课室', trigger: 'blur' }
			  ],
			  managername:[
		        { required: true, message: '请填写机房负责人', trigger: 'blur' }
			  ],
			  managerphone:[
		        { required: true, message: '请填写机房负责人联系电话', validator: validPhone }
			  ]
	        }
	      };
    },
	template: ' \
	<div>\
		<h3 style="text-align:center">机房新增</h3>\
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" class="demo-ruleForm"> \
		  <el-form-item label="机房编码" prop="labcode"> \
		    <el-input v-model="ruleForm.labcode"></el-input> \
		  </el-form-item>\
		  <el-form-item label="机房名称" prop="labname">\
			<el-input v-model="ruleForm.labname"></el-input> \
		  </el-form-item>\
			<el-form-item label="机房位置" prop="location"> \
			    <el-input v-model="ruleForm.location"></el-input> \
			</el-form-item>\
			<el-form-item label="科室" prop="room"> \
			    <el-input v-model="ruleForm.room"></el-input> \
			</el-form-item>\
			<el-form-item label="所属分类"> \
				<el-select v-model="ruleForm.labclass" clearable filterable placeholder="请选择">\
			    <el-option \
			      v-for="item in classes" \
			      :key="item.id" \
			      :label="item.classname" \
			      :value="item.classname"> \
			    </el-option> \
			  </el-select> \
		      </el-form-item> \
			<el-form-item label="室责任人" prop="managername"> \
		    <el-input v-model="ruleForm.managername"></el-input> \
		  </el-form-item>\
		  <el-form-item label="联系电话" prop="managerphone">\
			<el-input v-model="ruleForm.managerphone"></el-input> \
		  </el-form-item>\
		  <el-form-item>\
		    <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>\
		    <el-button @click="resetForm(ruleForm)">重置</el-button>\
		  </el-form-item>\
		</el-form>\
	</div>\
	',
	mounted(){
		axios.get('/labs/classes')
		  .then(response => (
	    		  this.classes = response.data,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
	},
	methods: {
		isUsed(){
			var flag;
			axios.get('/labs/findByCode', {
		    	params: {
		    		labcode: this.ruleForm.labcode
			    }
			})
		    .then(response => (
				  this.flag = response.data,
	    		  console.log(response.data)
	    	  ))
		    .catch(function (error) {
		      console.log(error);
		    });
		},
		submitForm(formName) {
	        this.$refs.ruleForm.validate((valid) => {
	          if (valid) {
	            console.log(this.ruleForm);

	            	axios({
						  method: 'post',
						  url: '/labs/add',
						  data: {
							  labcode: this.ruleForm.labcode,
							  labname: this.ruleForm.labname,
							  labclass: this.ruleForm.labclass,
							  location: this.ruleForm.location,
							  managername: this.ruleForm.managername,
							  managerphone: this.ruleForm.managerphone,
							  room: this.ruleForm.room
						  }
						}).then(response=>{
								console.log(response.data)
								if(response.data.flag===true){
									this.$alert(response.data.message, '系统提示', {
								          confirmButtonText: '确定',
								          callback: action => {
								            this.$message({
								              type: 'info',
								              message: `action: ${ action }`
								            });
								          }
								        });
									this.handleSizeChange(5)
								}else{
									this.$alert(response.data.message, '系统提示', {
								          confirmButtonText: '确定',
								          callback: action => {
								            this.$message({
								              type: 'info',
								              message: `action: ${ action }`
								            });
								          }
								        });
								}			
						}
				      )
				      .catch(function (error) { // 请求失败处理
				        console.log(error);
				      });
	            
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs.ruleForm.resetFields();
	      }
	  }
}
//机房
const Labs = {
	data() {
      return {
        gridData: [],
        classes: [],
        page_size: 5,
    	current_page: 1,
    	dialogFormVisible:false,
    	dialogForm:{
    		labname:null,
    		labclass:null,
    		managername:null,
    		managerphone:null
    	},
    	searchMap:{
    		name:null,
    		class1:null
    	},
        total:0
      };
    },
	template: ' \
	<div>\
		<h3 style="text-align:center">机房查询</h3>\
		<br/> \
	    <el-form :inline="true"> \
	      <el-form-item label="机房名称"> \
	        <el-input v-model="searchMap.name"></el-input>  \
	      </el-form-item> \
			<el-form-item label="机房所属分类"> \
				<el-select v-model="searchMap.class1" clearable filterable placeholder="请选择">\
			    <el-option \
			      v-for="item in classes" \
			      :key="item.id" \
			      :label="item.classname" \
			      :value="item.classname"> \
			    </el-option> \
			  </el-select> \
		      </el-form-item> \
	      <el-button @click="searchLabs()" type="primary">查询</el-button> \
	    </el-form> \
	  <el-table :data="gridData">\
		<el-table-column prop="labname" label="机房名称" width="120"></el-table-column>\
		<el-table-column prop="location" label="位置" width="100"></el-table-column>\
		<el-table-column prop="labclass" label="所属分类" width="100" ></el-table-column>\
		<el-table-column prop="room" label="课室" width="100" ></el-table-column>\
		<el-table-column prop="managername" label="负责人姓名" width="100"></el-table-column>\
		<el-table-column prop="managerphone" label="负责人联系电话" width="100"></el-table-column>\
		<el-table-column prop="createtime" label="创建时间" width="100" :formatter="dateFormatter"></el-table-column>\
		<el-table-column label="状态" width="80"> \
			<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ isUsed(props.row.used) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column> \
		<el-table-column \
		      label="详情" \
		      width="100"> \
			  <template slot-scope="scope"> \
		        <el-button @click="handleEdit(scope.row)" type="button" size="small">查看</el-button> \
		      </template> \
		</el-table-column> \
		<el-table-column \
	      label="操作" \
	      width="100"> \
		<template slot-scope="scope"> \
			<el-switch \
				v-model="scope.row.used"\
				active-color="#13ce66"\
				inactive-color="#ff4949" @change="changeLabUsed(scope.row.id)"> \
			</el-switch> \
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
		    <el-form-item label="机房名称"> \
		      <el-input v-model="dialogForm.labname" autocomplete="off"></el-input> \
		    </el-form-item> \
		    <el-form-item label="所属分类"> \
			  <el-input v-model="dialogForm.labclass" autocomplete="off"></el-input> \
		    </el-form-item> \
			<el-form-item label="负责人姓名"> \
			  <el-input v-model="dialogForm.managername" autocomplete="off"></el-input> \
		    </el-form-item> \
			<el-form-item label="负责人电话"> \
			  <el-input v-model="dialogForm.managerphone" autocomplete="off"></el-input> \
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
		axios.get('/labs/admin', {
		    	params: {
		    		page_size: 5,
		    		name:this.searchMap.name,
		    		//name:'光学',
		    		class1:this.searchMap.class1,
		    		//class1:'物理',
		    		current_page:2
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
		
		axios.get('/labs/classes')
		  .then(response => (
	    		  this.classes = response.data,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
	},
	methods: {
		isUsed(flag){
			if (flag===true) {
	          return '在用';
	        } else if (flag===false) {
	          return '停用';
	        }
	        return '';
		},
		changeLabUsed(lab_id){
			console.log(lab_id);
			var lab_id=lab_id;
			axios
		      .get('/labs/change',{
	    		    params: {
	    		    	id: lab_id
	    		    }
		      })
		      .then(response => (
		    		  console.log("change success")
		    	  )
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
		},
		handleSizeChange(val) {
			axios.get('/labs/admin', {
		    	params: {
		    		page_size: val,
		    		name:this.searchMap.name,
		    		class1:this.searchMap.class1,
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
			axios.get('/labs/admin', {
		    	params: {
		    		page_size: this.page_size,
		    		name:this.searchMap.name,
		    		class1:this.searchMap.class1,
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
		searchLabs:function() {
			console.log(this.searchMap);
			axios.get('/labs/admin', {
		    	params: {
		    		page_size: this.page_size,
		    		name:this.searchMap.name,
		    		class1:this.searchMap.class1,
		    		current_page:this.current_page
			    }
			})
		  .then(response => (
	    		  this.gridData = response.data.list,
	    		  this.total= response.data.total,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
		},
		dateFormatter:function(row,column){
			//console.log(row);
			var datetime = row.createtime;
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
		   console.log(row);
		   this.dialogFormVisible=true  //打开窗口
		   this.dialogForm.labname=row.labname
		   this.dialogForm.labclass=row.labclass
		   this.dialogForm.managername=row.managername
		   this.dialogForm.managerphone=row.managerphone
		}
	  }
}

//申请
const Make = { 
	data() {
		return {
			labs: [],
			userUrl: '',
			promiseUrl: '',
	        ruleForm: {
	          applyname: null,
	          labcode: null,
	          usereason: null,
	          labname: null,
	          applydate: null,
	          starttime: null,
			  endtime: null,
	          userinfo: null,
	          promise:null
	        },
	        rules: {
	          labcode: [
	            { required: true, message: '请选择机房', trigger: 'blur' }
	          ],
	          usereason: [
		        { required: true, message: '请填写申请原因', trigger: 'blur' }
		      ],
	          applydate: [
	            { type: 'date',required: true, message: '申请日期', trigger: 'blur' }
	          ],
	          starttime: [
	            { type: 'date',required: true, message: '开始时间', trigger: 'blue' }
	          ],
	          endtime:[
		        { type: 'date',required: true, message: '结束时间', trigger: 'blur' }
			  ],
			  userinfo:[
		        { required: true, message: '请上传申请人正将', trigger: 'blur' }
			  ],
			  promise:[
		        { required: true, message: '请上传纸板申请书', trigger: 'blur' }
			  ]
	        }
	      };
    },
	template: ' \
	<div>\
		<h3 style="text-align:center">机房预约申请单</h3>\
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" class="demo-ruleForm"> \
		  <el-form-item label="申请人" prop="applyname"> \
			<el-col :span="12"> \
		    	<el-input v-model="ruleForm.applyname" disabled></el-input> \
			</el-col :span="12"> \
		  </el-form-item>\
		<el-form-item label="申请原因" prop="usereason"> \
			<el-col :span="12"> \
		    	<el-input v-model="ruleForm.usereason"></el-input> \
			</el-col :span="12"> \
		  </el-form-item>\
		  <el-form-item label="申请机房" prop="labcode">\
			<el-col :span="12"> \
				<el-select v-model="ruleForm.labcode" clearable filterable placeholder="请选择">\
			    <el-option \
			      v-for="item in labs" \
			      :key="item.labcode" \
			      :label="item.labname" \
			      :value="item.labcode"> \
			    </el-option> \
			  </el-select> \
			</el-col :span="12"> \
		  </el-form-item>\
			<el-form-item label="申请日期" prop="applydate"> \
				<el-col :span="12"> \
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.applydate" style="width: 100%;"></el-date-picker>\
				</el-col :span="12"> \
			</el-form-item>\
			<el-form-item label="开始时间" prop="room"> \
				<el-col :span="12"> \
						<el-time-picker placeholder="选择时间" v-model="ruleForm.starttime" style="width: 100%;"></el-time-picker>\
				</el-col :span="12"> \
			</el-form-item>\
				<el-form-item label="结束时间" prop="room"> \
				<el-col :span="12"> \
						<el-time-picker placeholder="选择时间" v-model="ruleForm.endtime" style="width: 100%;"></el-time-picker>\
				</el-col :span="12"> \
			</el-form-item>\
			<el-form-item label="申请人证件" prop="userinfo"> \
				<el-upload \
				class="avatar-uploader" \
				  action="/apply/userinfo" \
		          name="userinfo" \
				  :show-file-list="false" \
				  :on-success="handleUserinfo" \
				  :before-upload="beforeAvatarUpload"> \
				  <img v-if="userUrl" :src="userUrl" class="avatar"> \
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i> \
				</el-upload>\
			</el-form-item>\
			<el-form-item label="承诺书" prop="promise">\
				<el-upload \
				class="avatar-uploader" \
				  action="/apply/promise" \
		          name="promise" \
				  :show-file-list="false" \
				  :on-success="handlePromise" \
				  :before-upload="beforeAvatarUpload"> \
				  <img v-if="promiseUrl" :src="promiseUrl" class="avatar"> \
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i> \
				</el-upload>\
			</el-form-item>\
			<el-form-item>\
			    <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>\
			    <el-button @click="resetForm(ruleForm)">重置</el-button>\
			</el-form-item>\
		</el-form>\
	</div>\
	',
	mounted(){
		this.ruleForm.applyname=document.getElementById('username').value;
		
		axios.get('/labs/all')
		  .then(response => (
	    		  this.labs = response.data,
	    		  console.log(response.data)
	    	  ))
		  .catch(function (error) {
		    console.log(error);
		  });
	},
	methods: {
		submitForm(formName) {
	        this.$refs.ruleForm.validate((valid) => {
	          if (valid) {
	            console.log(this.ruleForm);

	            	axios({
						  method: 'post',
						  url: '/apply/add',
						  data: {
							  applyname: this.ruleForm.applyname,
							  labcode: this.ruleForm.labcode,
							  usereason: this.ruleForm.usereason,
							  applydate: this.ruleForm.applydate,
							  starttime: this.ruleForm.starttime,
							  endtime: this.ruleForm.endtime,
							  userinfo: this.ruleForm.userinfo,
							  promise: this.ruleForm.promise
						  }
						}).then(response=>{
								console.log(response.data)
								if(response.data.flag===true){
									this.$alert(response.data.message, '系统提示', {
								          confirmButtonText: '确定',
								          callback: action => {
								            this.$message({
								              type: 'info',
								              message: `action: ${ action }`
								            });
								          }
								        });
									//this.handleSizeChange(5)
								}else{
									this.$alert(response.data.message, '系统提示', {
								          confirmButtonText: '确定',
								          callback: action => {
								            this.$message({
								              type: 'info',
								              message: `action: ${ action }`
								            });
								          }
								        });
								}			
						}
				      )
				      .catch(function (error) { // 请求失败处理
				        console.log(error);
				        alert("admin没有权限！");
				      });
	            
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs.ruleForm.resetFields();
	    },
	    handleUserinfo(res, file) {
	          this.userUrl = URL.createObjectURL(file.raw);
	          this.ruleForm.userinfo=res;
	          console.log(res);
        },
        handlePromise(res, file) {
	          this.promiseUrl = URL.createObjectURL(file.raw);
	          this.ruleForm.promise=res;
	          console.log(res);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
	  }
}
//预约
const Applys = {
	data() {
      return {
        gridData: [],
        user: null,
        page_size: 5,
    	current_page: 1,
        total:0
      };
    },
	template: ' \
	<div>\
		<h3 style="text-align:center">预约查询</h3>\
		<br/> \
	  <el-table :data="gridData">\
		<el-table-column prop="labname" label="预约机房" width="120"></el-table-column>\
		<el-table-column prop="applydate" label="预约日期" width="180"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter1(props.row.applydate) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="starttime" label="开始时间" width="150" :formatter="dateFormatter1"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter2(props.row.starttime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="endtime" label="结束时间" width="150" :formatter="dateFormatter1"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter2(props.row.endtime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="createtime" label="创建时间" width="150" :formatter="dateFormatter"></el-table-column>\
		<el-table-column prop="canceltime" label="取消时间" width="180"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter1(props.row.canceltime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="confiretime" label="审核时间" width="180"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter1(props.row.confiretime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="passtime" label="退回时间" width="180"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter1(props.row.passtime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="passreason" label="退回原因" width="200"></el-table-column>\
		<el-table-column label="状态" width="120"> \
			<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ checkStatus(props.row.status) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column> \
		<el-table-column \
		      label="操作" \
		      width="100"> \
			  <template slot-scope="props"> \
		        <el-button @click="cancelApply(props.row.id)" type="warning" size="small" v-show="showCancel(props.row.status)">取消预约</el-button> \
		      </template> \
		</el-table-column> \
	  </el-table>\
	  <div class="block">\
	    <el-pagination\
	      @size-change="handleSizeChange"\
	      @current-change="handleCurrentChange"\
	      :current-page="current_page"\
	      :page-sizes="[1, 5, 10, 15, 20]"\
	      :page-size="page_size"\
		  background \
	      layout="total, sizes, prev, pager, next, jumper"\
	      :total="total">\
	    </el-pagination>\
	  </div>\
	</div>\
	',
	mounted(){
		this.user=document.getElementById('username').value;
		axios.get('/apply/admin', {
		    	params: {
		    		page_size: 5,
		    		name:this.user,
		    		//class1:'物理',
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
		checkStatus(flag){
			if (flag==='1') {
	          return '审核中';
	        } else if (flag==='2') {
	          return '已取消';
	        } else if (flag==='3') {
	          return '已审核';
	        } else if (flag==='4') {
	          return '未通过';
	        }
	        return '';
		},
		showCancel(flag){
			console.log(flag)
			if (flag==='1') {
	          return true;
	        } else if(flag==='2'){
	          return false;
	        } else if(flag==='3'){
	          return false;
	        } else if(flag==='4'){
	          return false;
	        } 
	        return '';
		},
		cancelApply(apply_id){
			console.log(apply_id);
			var apply_id=apply_id;
			axios
		      .get('/apply/cancel',{
	    		    params: {
	    		    	apply_id: apply_id
	    		    }
		      })
		      .then(response => {
		    		  if(response.data.flag===true){
							this.$alert(response.data.message, '系统提示', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.$message({
						              type: 'info',
						              message: `action: ${ action }`
						            });
						          }
						        });
							//this.handleSizeChange(5)
						}else{
							this.$alert(response.data.message, '系统提示', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.$message({
						              type: 'info',
						              message: `action: ${ action }`
						            });
						          }
						        });
						}
					}
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
		},
		handleSizeChange(val) {
			axios.get('/apply/admin', {
		    	params: {
		    		page_size: val,
		    		name:this.user,
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
			axios.get('/apply/admin', {
		    	params: {
		    		page_size: this.page_size,
		    		name:this.user,
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
		dateFormatter:function(row,column){
			//console.log(row);
			var datetime = row.createtime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let y=datetime.getFullYear()+'-';
		    	let m=datetime.getMonth()+1+'-';
		    	let d=datetime.getDate();
		    	return y+m+d;
		    }
			return '';
		},
		dateFormatter1(datetime){
			//console.log(row);
			var datetime = datetime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let y=datetime.getFullYear()+'-';
		    	let m=datetime.getMonth()+1+'-';
		    	let d=datetime.getDate();
		    	return y+m+d;
		    }
			return '';
		},
		dateFormatter2(datetime){
			//console.log(row);
			var datetime = datetime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let h=datetime.getHours()+':';
		    	let m=datetime.getMinutes()+':';
		    	let s=datetime.getSeconds();
		    	return h+m+s;
		    }
			return '';
		}
	  }
}
//审核
const Confirm = {
	data() {
      return {
    	dialogFormVisible:false,
    	form:{
    		apply_id:null,
	    	passreason:null
    	},
        gridData: [],
        page_size: 5,
    	current_page: 1,
        total:0
      };
    },
	template: ' \
	<div>\
		<h3 style="text-align:center">预约审批</h3>\
		<br/> \
	  <el-table :data="gridData">\
		<el-table-column type="expand">\
	      <template slot-scope="props">\
	        <el-form label-position="left" inline class="demo-table-expand">\
	          <el-form-item label="申请人信息">\
	            <span><a v-bind:href="props.row.userinfo" target="_blank">{{ props.row.userinfo }}</a></span>\
	          </el-form-item>\
	          <el-form-item label="纸板承诺书">\
	            <span><a v-bind:href="props.row.promise" target="_blank">{{ props.row.promise }}</a></span>\
	          </el-form-item>\
			</el-form>\
	      </template>\
	    </el-table-column>\
		<el-table-column prop="id" label="ID" width="120"></el-table-column>\
		<el-table-column prop="applyname" label="申请人" width="120"></el-table-column>\
		<el-table-column prop="labname" label="预约机房" width="120"></el-table-column>\
		<el-table-column prop="applydate" label="预约日期" width="180"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter1(props.row.applydate) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="starttime" label="开始时间" width="150" :formatter="dateFormatter1"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter2(props.row.starttime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="endtime" label="结束时间" width="150" :formatter="dateFormatter1"> \
				<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ dateFormatter2(props.row.endtime) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column>\
		<el-table-column prop="createtime" label="申请时间" width="150" :formatter="dateFormatter"></el-table-column>\
		<el-table-column label="状态" width="120"> \
			<template slot-scope="props">\
		        <el-form label-position="left" inline class="demo-table-expand">\
		          <el-form-item>\
		            <span>{{ checkStatus(props.row.status) }}</span>\
		          </el-form-item>\
				</el-form>\
			</template>\
		</el-table-column> \
		<el-table-column \
		      label="操作" \
		      width="100"> \
			  <template slot-scope="props"> \
					<el-button @click="confirmApply(props.row.id)" type="button" size="small" v-show="showConfire(props.row.status)" style="display:inline-block;">通过</el-button> \
		      </template> \
		</el-table-column> \
		<el-table-column \
	      label="操作" \
	      width="100"> \
		  <template slot-scope="props"> \
					<el-button @click="showPassDialog(props.row.id)" type="button" size="small" v-show="showPass(props.row.status)" style="display:inline-block;">退回</el-button> \
	      </template> \
		</el-table-column> \
	  </el-table>\
	  <div class="block">\
	    <el-pagination\
	      @size-change="handleSizeChange"\
	      @current-change="handleCurrentChange"\
	      :current-page="current_page"\
	      :page-sizes="[1, 5, 10, 15, 20]"\
	      :page-size="page_size"\
		  background \
	      layout="total, sizes, prev, pager, next, jumper"\
	      :total="total">\
	    </el-pagination>\
	  </div>\
		<el-dialog title="退回原因" :visible.sync="dialogFormVisible" height="80%"> \
		  <el-form :model="form"> \
			<el-col :span="5"> \
				<el-form-item label="申请ID"> \
			      <el-input v-model="form.apply_id" autocomplete="off" disabled></el-input> \
			    </el-form-item> \
		    </el-col> \
			<el-col :span="5"> \
				<el-form-item label="退回原因"> \
			      <el-input v-model="form.passreason" autocomplete="off"></el-input> \
			    </el-form-item> \
			</el-col> \
		  </el-form> \
		  <div slot="footer" class="dialog-footer"> \
		    <el-button type="primary" @click="passApply(form.apply_id)">退回</el-button> \
		  </div> \
		</el-dialog> \
	</div>\
	',
	mounted(){
		axios.get('/apply/manager', {
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
		checkStatus(flag){
			if (flag==='1') {
	          return '审核中';
	        } else if (flag==='2') {
	          return '已取消';
	        } else if (flag==='3') {
	          return '已审核';
	        } else if (flag==='4') {
	          return '未通过';
	        }
	        return '';
		},
		showConfire(flag){
			console.log(flag)
			if (flag==='1') {
	          return true;
	        } else if(flag==='2'){
	          return false;
	        } else if(flag==='3'){
	          return false;
	        } else if(flag==='4'){
	          return false;
	        } 
	        return '';
		},
		showPass(flag){
			console.log(flag)
			if (flag==='1') {
	          return true;
	        } else if(flag==='2'){
	          return false;
	        } else if(flag==='3'){
	          return false;
	        } else if(flag==='4'){
	          return false;
	        } 
	        return '';
		},
		confirmApply(apply_id){
			console.log(apply_id);
			var apply_id=apply_id;
			axios
		      .get('/apply/confirm',{
	    		    params: {
	    		    	apply_id: apply_id
	    		    }
		      })
		      .then(response => {
		    		  if(response.data.flag===true){
							this.$alert(response.data.message, '系统提示', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.$message({
						              type: 'info',
						              message: `action: ${ action }`
						            });
						          }
						        });
							//this.handleSizeChange(5)
						}else{
							this.$alert(response.data.message, '系统提示', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.$message({
						              type: 'info',
						              message: `action: ${ action }`
						            });
						          }
						        });
						}
					}
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
		},
		showPassDialog(apply_id){
			//console.log(apply_id);
			this.form.apply_id=apply_id;
			this.dialogFormVisible = true
		},
		passApply(apply_id){
			console.log(apply_id);
			var apply_id=apply_id;
			axios
		      .get('/apply/pass',{
	    		    params: {
	    		    	apply_id: apply_id,
	    		    	passreason: this.form.passreason
	    		    }
		      })
		      .then(response => {
		    		  if(response.data.flag===true){
							this.$alert(response.data.message, '系统提示', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.$message({
						              type: 'info',
						              message: `action: ${ action }`
						            });
						          }
						        });
							this.dialogFormVisible = false;
						}else{
							this.$alert(response.data.message, '系统提示', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.$message({
						              type: 'info',
						              message: `action: ${ action }`
						            });
						          }
						        });
						}
					}
		      )
		      .catch(function (error) { // 请求失败处理
		        console.log(error);
		      });
		},
		handleSizeChange(val) {
			axios.get('/apply/manager', {
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
			axios.get('/apply/manager', {
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
		dateFormatter:function(row,column){
			//console.log(row);
			var datetime = row.createtime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let y=datetime.getFullYear()+'-';
		    	let m=datetime.getMonth()+1+'-';
		    	let d=datetime.getDate();
		    	return y+m+d;
		    }
			return '';
		},
		dateFormatter1(datetime){
			//console.log(row);
			var datetime = datetime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let y=datetime.getFullYear()+'-';
		    	let m=datetime.getMonth()+1+'-';
		    	let d=datetime.getDate();
		    	return y+m+d;
		    }
			return '';
		},
		dateFormatter2(datetime){
			//console.log(row);
			var datetime = datetime;
		    if(datetime){
		    	datetime=new Date(datetime);
		    	let h=datetime.getHours()+':';
		    	let m=datetime.getMinutes()+':';
		    	let s=datetime.getSeconds();
		    	return h+m+s;
		    }
			return '';
		}
	  }
}
//用户
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
 
const routes = [
  { path: '/add_lab', component: AddLab },//增加机房
  { path: '/make', component: Make }, //申请
  { path: '/applys', component: Applys },//预约记录
  { path: '/confirm', component: Confirm },//审核
  { path: '/user', component: User },//用户
  { path: '/all_lab', component: Labs }//机房
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  data:{
	  username:null,
	  activities: [],
	  logout:'/logout'
  },
  mounted: function () {
	  this.username=document.getElementById('username').value;
  },
  router
}).$mount('#app')
 
// 现在，应用已经启动了！