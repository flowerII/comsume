package cn.qianshu.comsume.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import cn.qianshu.comsume.entity.Labs;


@Mapper
public interface LabsMapper {
	
	@Select( "select count(1) from lab"
			+ " where (#{name} = 'null' or labname like concat('%',#{name},'%')) and (#{class1} = 'null' or labclass = #{class1})" )
	int getLabsNumberByNameAndClass(@Param("name")String name, @Param("class1")String class1);

	@Select( "select id,labcode,labname,location,labclass,room,managername,managerphone,createtime,isUsed from lab"
			+ " where (#{name} = 'null' or labname like concat('%',#{name},'%')) and (#{class1} = 'null' or labclass = #{class1})"
			+ "limit #{begin},#{number}" )
	List<Labs> getLabsByNameAndClass(@Param("name")String name,@Param("class1")String class1,
			@Param("begin")int begin,@Param("number")int number);

	@Update("UPDATE lab SET isUsed = ABS(isUsed-1) WHERE id = #{id}")
	void changeLabs(@Param("id")int id);

	@Select("select id,labcode,labname,location,labclass,room,managername,managerphone,createtime,isUsed from lab WHERE labcode = #{labcode}")
	Labs findByCode(@Param("labcode")String labcode);

	@Insert("insert into lab(labcode,labname,labclass,location,managername,managerphone,room,createtime,isUsed)"
			+ "values(#{labcode},#{labname},#{labclass},#{location},#{managername},#{managerphone},#{room},now(),1)")
	void addLabs(@Param("labcode")String labcode, @Param("labname")String labname, @Param("labclass")String labclass,
			@Param("location")String location, @Param("managername")String managername,@Param("managerphone")String managerphone,
			@Param("room")String room);

	@Select( "select id,labcode,labname,location,labclass,room,managername,managerphone,createtime,isUsed from lab")
	List<Labs> getAll();



}
