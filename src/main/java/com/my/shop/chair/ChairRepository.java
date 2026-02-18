package com.my.shop.chair;

import com.my.shop.chair.dto.ChairDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChairRepository {

    Integer saveChairRental(ChairDTO chairDTO);

    Integer updateRentInfo(ChairDTO chairDTO);

    List<Map<String, Object>> selectRentalList(ChairDTO chairDTO);

    List<Map<String, Object>> selectEndRentalList();
}
