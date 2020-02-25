package cn.qianshu.comsume.controller;


import java.io.IOException;
import java.sql.Time;
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
import org.springframework.web.multipart.MultipartFile;

import cn.qianshu.comsume.entity.Apply;
import cn.qianshu.comsume.entity.LData;
import cn.qianshu.comsume.entity.Labs;
import cn.qianshu.comsume.entity.Msg;
import cn.qianshu.comsume.service.ApplyService;
import cn.qianshu.comsume.service.Class1Service;
import cn.qianshu.comsume.service.LabsService;
import cn.qianshu.comsume.util.FileUtil;


@Controller
@RequestMapping("/apply")
public class ApplyController {
	
	private static Logger log = LoggerFactory.getLogger(ApplyController.class);

	@Autowired
	private LabsService labsService;
	
	@Autowired
	private Class1Service class1Service;
	
	@Autowired
	private ApplyService applyService;
	
	//labs list
	@RequestMapping(value = "/userinfo", method=RequestMethod.POST)
	public @ResponseBody String userinfo(@RequestParam("userinfo") MultipartFile userinfo) {
		log.info("ApplyController upload userinfo:"+userinfo.getOriginalFilename());
    	
    	String filePath = System.getProperty("user.dir")+"\\src\\main\\resources\\static\\userinfo\\";
    	log.info("filePath:"+filePath);
    	log.info("act_url:"+filePath+userinfo.getOriginalFilename());
    	
    	try {
			FileUtil.uploadFile(userinfo.getBytes(), filePath, userinfo.getOriginalFilename());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	String basePath="/userinfo/"+userinfo.getOriginalFilename();
    	log.info("basePath:"+basePath);
    	
		return basePath; 
	}
	
	@RequestMapping(value = "/promise", method=RequestMethod.POST)
	public @ResponseBody String promise(@RequestParam("promise") MultipartFile promise) {
		log.info("ApplyController upload promise:"+promise.getOriginalFilename());
    	
    	String filePath = System.getProperty("user.dir")+"\\src\\main\\resources\\static\\promise\\";
    	log.info("filePath:"+filePath);
    	log.info("act_url:"+filePath+promise.getOriginalFilename());
    	
    	try {
			FileUtil.uploadFile(promise.getBytes(), filePath, promise.getOriginalFilename());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	String basePath="/promise/"+promise.getOriginalFilename();
    	log.info("basePath:"+basePath);
    	
		return basePath; 
	}
	
	//Apply
	@RequestMapping(value = "/add", method=RequestMethod.POST)
	public @ResponseBody Msg add(@RequestBody Apply apply) {
		log.info("ApplyController add apply:"+apply.toString());
		
		applyService.add(apply);
		
		Msg ms=new Msg(true,"添加成功");
    	return ms;
	}
	
	@RequestMapping(value = "/admin", method=RequestMethod.GET)
	public @ResponseBody LData<Apply> activity_admin(@RequestParam("page_size")int page_size,@RequestParam("current_page")int current_page,
			@RequestParam("name")String name) {
		log.info("ApplyController get applys:");
		log.info("page_size:"+page_size+",current_page:"+current_page+",name:"+name);
		
		//根据关键字段查找数据总量
		int total=applyService.getAllApply(name);
		log.info("get apply total:"+total);
		
		//根据关键字分页查找数据
		List<Apply> apply_list=applyService.getApplyByName(name,current_page,page_size);
		
		//封装到LData
		 @SuppressWarnings("unchecked")
		LData<Apply> data=new LData(total,apply_list);
		 
		return data; 
	}
	
	@RequestMapping(value = "/cancel", method=RequestMethod.GET)
	public @ResponseBody Msg cancel(@RequestParam("apply_id")int apply_id) {
		log.info("ApplyController cancel apply:"+apply_id);
		
		//根据关键字段查找数据总量
		applyService.cancelApply(apply_id);

		Msg m=new Msg(true,"取消成功！");
		return m; 
	}
	
	@RequestMapping(value = "/manager", method=RequestMethod.GET)
	public @ResponseBody LData<Apply> manager(@RequestParam("page_size")int page_size,@RequestParam("current_page")int current_page) {
		log.info("ApplyController get applys:");
		log.info("page_size:"+page_size+",current_page:"+current_page);
		
		//根据关键字段查找数据总量
		int total=applyService.getAllApply1();
		log.info("get apply total:"+total);
		
		//根据关键字分页查找数据
		List<Apply> apply_list=applyService.getApply(current_page,page_size);
		
		//封装到LData
		 @SuppressWarnings("unchecked")
		LData<Apply> data=new LData(total,apply_list);
		 
		return data; 
	}
	
	@RequestMapping(value = "/confirm", method=RequestMethod.GET)
	public @ResponseBody Msg confirm(@RequestParam("apply_id")int apply_id) {
		log.info("ApplyController confirm applys:"+ apply_id);

		applyService.confirmApply(apply_id);
		
		Msg m=new Msg(true,"审核成功！");
		return m; 
	}
	
	@RequestMapping(value = "/pass", method=RequestMethod.GET)
	public @ResponseBody Msg pass(@RequestParam("apply_id")int apply_id,@RequestParam("passreason")String passreason) {
		log.info("ApplyController pass applys:"+apply_id+",passreason"+passreason);

		applyService.passApply(apply_id,passreason);
		
		Msg m=new Msg(true,"退回成功！");
		return m; 
	}
}
