package cn.qianshu.comsume.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.qianshu.comsume.entity.Labs;
import cn.qianshu.comsume.mapper.LabsMapper;

@Service
public class LabsService{
	
	private static Logger log = LoggerFactory.getLogger(LabsService.class);
    
	@Autowired
	private LabsMapper labsMapper;

	public int getLabsNumberByNameAndClass(String name, String class1) {
		// TODO Auto-generated method stub
		return labsMapper.getLabsNumberByNameAndClass(name, class1);
	}

	public List<Labs> getLabsByNameAndClass(String name, String class1,int current_page,int page_size) {
		// TODO Auto-generated method stub
		return labsMapper.getLabsByNameAndClass(name, class1,(current_page-1)*page_size,page_size);
	}

	public void changeLabs(int id) {
		// TODO Auto-generated method stub
		labsMapper.changeLabs(id);
	}

	public Labs findByCode(String labcode) {
		// TODO Auto-generated method stub
		return labsMapper.findByCode(labcode);
	}

	public void addLabs(Labs labs) {
		// TODO Auto-generated method stub
		labsMapper.addLabs(labs.getLabcode(),labs.getLabname(),labs.getLabclass(),labs.getLocation(),labs.getManagername(),labs.getManagerphone(),labs.getRoom());
	}

	public List<Labs> getAll() {
		// TODO Auto-generated method stub
		return labsMapper.getAll();
	}

}
