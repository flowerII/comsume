package cn.qianshu.comsume.controller;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.qianshu.comsume.entity.Class1;
import cn.qianshu.comsume.entity.LData;
import cn.qianshu.comsume.entity.Labs;
import cn.qianshu.comsume.entity.Msg;
import cn.qianshu.comsume.service.Class1Service;
import cn.qianshu.comsume.service.LabsService;


@Controller
@RequestMapping("/labs")
public class LabController {
	
	private static Logger log = LoggerFactory.getLogger(LabController.class);

	@Autowired
	private LabsService labsService;
	
	@Autowired
	private Class1Service class1Service;
	//labs list
	@RequestMapping(value = "/admin", method=RequestMethod.GET)
	public @ResponseBody LData<Labs> activity_admin(@RequestParam("page_size")int page_size,@RequestParam("current_page")int current_page,
			@RequestParam(value = "name", required = false, defaultValue = "null")String name,
			@RequestParam(value = "class1", required = false, defaultValue = "null")String class1) {
		log.info("LabController get labs:");
		log.info("page_size:"+page_size+",current_page:"+current_page+",name:"+name+",class:"+class1);
		
		//根据关键字段查找数据总量
		int total=labsService.getLabsNumberByNameAndClass(name,class1);
		log.info("get total:"+total);
		
		//根据关键字分页查找数据
		List<Labs> lab_list=labsService.getLabsByNameAndClass(name, class1,current_page,page_size);
		
		//封装到LData
		 @SuppressWarnings("unchecked")
		LData<Labs> data=new LData(total,lab_list);
		 
		return data; 
	}
	
	//labs class
	@RequestMapping(value = "/classes", method=RequestMethod.GET)
	public @ResponseBody List<Class1> getAllClass() {
		log.info("LabController get classes:");

		List<Class1> classes=class1Service.getAllClass();
		
		return classes; 
	}
	
	//labs class
	@RequestMapping(value = "/all", method=RequestMethod.GET)
	public @ResponseBody List<Labs> getAll() {
		log.info("LabController get labs all:");

		List<Labs> labs=labsService.getAll();
		
		return labs; 
	}
	
	//labs class
	@RequestMapping(value = "/change", method=RequestMethod.GET)
	public @ResponseBody String change(@RequestParam("id")int id) {
		log.info("LabController change lab used status:"+id);

		labsService.changeLabs(id);
		
		return "success"; 
	}
	
	//根据Code判断是否存在编码，新增实验室编码用findByCode
	@RequestMapping(value = "/findByCode", method=RequestMethod.GET)
	public @ResponseBody Boolean findByCode(@RequestParam("labcode")String labcode) {
		log.info("LabController get labcode:"+labcode);

		Labs lab=labsService.findByCode(labcode);
		
		if(lab!=null) {
			return true;
		}else {
			return false;
		}
	}
	
	// 添加
	@RequestMapping(value = "/add", method=RequestMethod.POST)
	public @ResponseBody Msg addLabs(@RequestBody Labs labs) {
		log.info("LabController add:"+labs.toString());
		Msg ms=null;
		
		//查询编码是否冲突
		Labs lab=labsService.findByCode(labs.getLabcode());
		log.info("findByCode:"+labs.getLabcode());
		if(lab!=null) {
			ms=new Msg(false,"实验室编码已存在！");
		}else {
			labsService.addLabs(labs);
			ms=new Msg(true,"添加成功");
		}
		
		return ms;
	}
}
