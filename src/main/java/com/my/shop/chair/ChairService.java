package com.my.shop.chair;

import com.my.shop.chair.dto.ChairDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
@RequiredArgsConstructor
@Service
public class ChairService {

    private final ChairRepository chairRepository;

    public Integer chairSubmit(ChairDTO chairDto){
        return chairRepository.saveChairRental(chairDto);
    }

    public List<Map<String, Object>> getRentalList(ChairDTO chairDto){
        return chairRepository.selectRentalList(chairDto);
    }

    public List<Map<String, Object>> getEndRentalList(){
        return chairRepository.selectEndRentalList();
    }

    public Integer saveRentInfo(ChairDTO chairDto){
        return chairRepository.updateRentInfo(chairDto);
    }


}
