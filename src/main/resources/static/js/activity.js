$(function() {
	var arrData=[];

	$("#fenshu").click(function(){
		var key=$('#key').val()
		var value=$('#value').val()
		var obj={};
		obj.key=key;
		obj.value=value;
		arrData.push(obj);
		console.log(arrData);
		console.log(arrData.length)
		append_data();
	})
	
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
