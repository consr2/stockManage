package com.my.shop.chair;

import com.my.shop.chair.dto.ChairDTO;
import com.my.shop.chair.dto.ChairRequsetDTO;
import com.my.shop.chair.dto.ChairResponseDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChairRepository {

    Integer saveChairRental(ChairRequsetDTO.InsertChair insertChair);

    Integer updateRentInfo(ChairRequsetDTO.UpdateChair updateChair);

    List<ChairResponseDTO.Chair> selectRentalList(ChairRequsetDTO.SearchChairList searchChairList);

    List<ChairResponseDTO.Chair> selectEndRentalList();
}
