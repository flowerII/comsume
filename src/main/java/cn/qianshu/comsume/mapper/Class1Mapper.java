package cn.qianshu.comsume.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import cn.qianshu.comsume.entity.Class1;


@Mapper
public interface Class1Mapper {

	@Select( "select id, classcode, classname from class")
	List<Class1> getAllClass();

}
