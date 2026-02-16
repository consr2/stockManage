package com.my.shop.main;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
public interface MainRepository {

    List<Map<String, Object>> getUser();

}
