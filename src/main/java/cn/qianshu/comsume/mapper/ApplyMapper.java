package cn.qianshu.comsume.mapper;


import java.sql.Time;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import cn.qianshu.comsume.entity.Apply;


@Mapper
public interface ApplyMapper {
	
	@Insert("insert into apply(applyname,labcode,labname,applydate,starttime,endtime,"
			+ "usereason,createtime,userinfo ,promise)"
			+ "values(#{applyname},#{labcode},#{labname},#{applydate},#{starttime},"
			+ "#{endtime},#{usereason},now(),#{userinfo} ,#{promise})")
	void addApply(@Param("applyname")String applyname, @Param("labcode")String labcode, @Param("labname")String labname, 
			@Param("applydate")Date applydate,@Param("starttime")Time starttime, @Param("endtime")Time endtime,
			@Param("usereason")String usereason,@Param("userinfo")String userinfo,@Param("promise")String promise);

	@Select("select count(1) from apply WHERE applyname = #{applyname}")
	int getAllApply(@Param("applyname")String applyname);

	@Select("select id,applyname,labcode,labname,applydate,starttime,endtime,createtime,status,canceltime,confiretime,"
			+ "passtime,passreason from apply WHERE applyname = #{applyname} limit #{current_page},#{page_size}")
	List<Apply> getApplyByName(@Param("applyname")String applyname, @Param("current_page")int current_page, @Param("page_size")int page_size);

	@Update("UPDATE apply SET status = '2', canceltime= now() WHERE id = #{apply_id}")
	void cancelApply(@Param("apply_id")int apply_id);

	@Select("select count(1) from apply")
	int getAllApply1();

	@Select("select id,applyname,labcode,labname,applydate,starttime,endtime,usereason,createtime,canceltime,confiretime,"
			+ "passtime,passreason,userinfo,promise,status from apply limit #{current_page},#{page_size}")
	List<Apply> getApply(@Param("current_page")int current_page, @Param("page_size")int page_size);

	@Update("UPDATE apply SET status = '3', confiretime= now() WHERE id = #{apply_id}")
	void confirmApply(int apply_id);

	@Update("UPDATE apply SET status = '4', passtime= now(),passreason=#{passreason} WHERE id = #{apply_id}")
	void passApply(@Param("apply_id")int apply_id,@Param("passreason")String passreason);

}
