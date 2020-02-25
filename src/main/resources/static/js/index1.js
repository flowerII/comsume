/**
 * 
 */
$(document).ready(function(){
	
	//user admin
	$("#user_admin").click(function(e){ 
		e.preventDefault()
		$.ajax({
			url:'/user/admin',
			method:'GET',
			success:function(data){
				$('#mws-container').html(data)				
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//team admin
	$("#team_admin").click(function(e){ 
		e.preventDefault()
		$.ajax({
			url:'/team/admin',
			method:'GET',
			success:function(data){
				$('#mws-container').html(data)
				
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//activity list
	$("#activity_list").click(function(e){ 
		e.preventDefault()
		$.ajax({
			url:'/activity/list',
			method:'POST',
			success:function(data){
				$('#mws-container').html(data)
				
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//activity add
	$("#activity_add").click(function(e){ 
		e.preventDefault()
		$.ajax({
			url:'/activity/add',
			method:'POST',
			success:function(data){
				$('#mws-container').html(data)
				
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//activity admin
	$("#comment_user_admin").click(function(e){ 
		
		e.preventDefault()
		$.ajax({
			url:'/activity/team',
			method:'POST',
			success:function(data){
				$('#mws-container').html(data)
				
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//user add
	$("#user_form_submit").click(function(e){
		console.log("user_form_submit");
		var staffno = $("#staffno").val();
	    var username = $("#username").val();
	    var password = $("#password").val();
	    if(staffno == "" || staffno == null)
	    {
	
	        alert("工号不能为空,请输入工号!");
	        $("#staffno").focus();
	        return false;
	    }
	    if(username == "" || username == null)
	    {
	        alert("姓名不能为空,请输入姓名!");
	        $("#username").focus();
	        return false;
	    }
	    if(password == "" || password == null)
	    {
	        alert("密码不能为空,请输入密码!");
	        $("#password").focus();
	        return false;
	    }
	    
		e.preventDefault()
		$.ajax({
			url:'/user/add',
			method:'POST',
			data:{
				staffno:staffno,
				username:username,
				password:password
			},
			success:function(data){
				alert("添加成功！")
				$('#mws-container').html(data)								
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//team add
	$("#team_form_submit").click(function(e){
		var name = $("#name").val();
	    
	    if(name == "" || name == null)
	    {
	        alert("队伍名不能为空,请输入队伍名!");
	        $("#name").focus();
	        return false;
	    }
	    
		e.preventDefault()
		$.ajax({
			url:'/team/add',
			method:'POST',
			data:{
				name:name
			},
			success:function(data){
				alert("添加成功！")
				$('#mws-container').html(data)				
			},
			error:function(e){
				console.log(e)
			}
		})
	});
	
	//activity add
	$("#activity_form_add").click(function(e){
		console.log("hahah");
		var name = $("#name").val();
	    
	    if(name == "" || name == null)
	    {
	        alert("huodong不能为空,请输入huodong!");
	        $("#name").focus();
	        return false;
	    }
	    
	    var holdtime = $("#holdtime").val();
	    
	    if(holdtime == "" || holdtime == null)
	    {
	        alert("举办时间不能为空,请输入举办时间!");
	        $("#holdtime").focus();
	        return false;
	    }
	    
	    var holdaddress = $("#holdaddress").val();
	    
	    if(holdaddress == "" || holdaddress == null)
	    {
	        alert("举办地点不能为空,请输入举办地点!");
	        $("#holdaddress").focus();
	        return false;
	    }
	    
	    var avg = $(".avg").val();
	    
	    if(avg == "" || avg == null)
	    {
	        alert("是否加权平均分不能为空,请输入选择!");
	        $(".avg").focus();
	        return false;
	    }
	    
	    var koufen = $(".koufen").val();
	    
	    if(koufen == "" || koufen == null)
	    {
	        alert("是否超时扣分不能为空,请输入选择!");
	        $(".koufen").focus();
	        return false;
	    }
	    
		e.preventDefault()
		$.ajax({
			url:'/activity/add',
			method:'POST',
			data:{
				name:name
			},
			success:function(data){
				log(data)
				if(data==1){
					alert("添加成功");
				}				
			},
			error:function(e){
				console.log(e)
			}
		})
	});

	var arrData=[];

	$("#fenshu").click(function(e){
		console.log("hahahah")
		var key=$('#key').val()
		var value=$('#value').val()
		var obj={};
		obj.key=key;
		obj.value=value;
		arrData.push(obj);
		console.log(arrData);
		console.log(arrData.length)
		append_data();
	});
	
	function append_data(){
		console.log(arrData);
		$("tbody").empty();
		for(var i=0;i<arrData.length;i++){
			$("tbody").append('<tr><td>'+arrData[i].key+'</td><td>'+arrData[i].value+'</td></tr>');
		}
		$('#key').val('')
		$('#value').val('')
	}

})