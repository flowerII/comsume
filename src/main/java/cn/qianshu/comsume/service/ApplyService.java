package cn.qianshu.comsume.service;

import java.sql.Time;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.qianshu.comsume.entity.Apply;
import cn.qianshu.comsume.entity.Class1;
import cn.qianshu.comsume.entity.Labs;
import cn.qianshu.comsume.mapper.ApplyMapper;
import cn.qianshu.comsume.mapper.Class1Mapper;
import cn.qianshu.comsume.mapper.LabsMapper;

@Service
public class ApplyService{
	
	private static Logger log = LoggerFactory.getLogger(ApplyService.class);
    
	@Autowired
	private ApplyMapper applyMapper;
	
	@Autowired
	private LabsMapper labMapper;

	public void add(Apply apply) {
		// TODO Auto-generated method stub
		log.info(apply.getLabcode());
		Labs lab=labMapper.findByCode(apply.getLabcode());
		
		applyMapper.addApply(apply.getApplyname(), apply.getLabcode(), lab.getLabname(), apply.getApplydate(),
				new Time(apply.getStarttime().getTime()), new Time(apply.getEndtime().getTime()), apply.getUsereason(),
				apply.getUserinfo(), apply.getPromise());
	}

	public int getAllApply(String name) {
		// TODO Auto-generated method stub
		return applyMapper.getAllApply(name);
	}

	public List<Apply> getApplyByName(String name, int current_page, int page_size) {
		// TODO Auto-generated method stub
		return applyMapper.getApplyByName(name, (current_page-1)*page_size, page_size);
	}

	public void cancelApply(int apply_id) {
		// TODO Auto-generated method stub
		applyMapper.cancelApply(apply_id);
	}

	public int getAllApply1() {
		// TODO Auto-generated method stub
		return applyMapper.getAllApply1();
	}

	public List<Apply> getApply(int current_page, int page_size) {
		// TODO Auto-generated method stub
		return applyMapper.getApply((current_page-1)*page_size, page_size);
	}

	public void confirmApply(int apply_id) {
		// TODO Auto-generated method stub
		applyMapper.confirmApply(apply_id);
	}

	public void passApply(int apply_id,String passreason) {
		// TODO Auto-generated method stub
		applyMapper.passApply(apply_id,passreason);
	}


}
