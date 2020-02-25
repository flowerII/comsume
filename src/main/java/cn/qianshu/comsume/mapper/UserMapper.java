package cn.qianshu.comsume.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.qianshu.comsume.entity.User;

@Mapper
public interface UserMapper {

    @Select( "select id , username , password ,account from user where account = #{account}" )
    User loadUserByUsername(@Param("account") String account);

}
