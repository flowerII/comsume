package cn.qianshu.comsume.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.qianshu.comsume.entity.Class1;
import cn.qianshu.comsume.mapper.Class1Mapper;

@Service
public class Class1Service{
	
	private static Logger log = LoggerFactory.getLogger(Class1Service.class);
    
	@Autowired
	private Class1Mapper class1Mapper;

	public List<Class1> getAllClass() {
		// TODO Auto-generated method stub
		return class1Mapper.getAllClass();
	}


}
