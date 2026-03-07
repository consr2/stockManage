package com.my.shop.chair;

import com.my.shop.chair.dto.ChairDTO;
import com.my.shop.chair.dto.ChairRequsetDTO;
import com.my.shop.chair.dto.ChairResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Transactional
@RequiredArgsConstructor
@Service
public class ChairService {

    private final ChairRepository chairRepository;

    public Integer chairSubmit(ChairRequsetDTO.InsertChair insertChair){
        return chairRepository.saveChairRental(insertChair);
    }

    public List<ChairResponseDTO.Chair> getRentalList(ChairRequsetDTO.SearchChairList searchChairList){
        return chairRepository.selectRentalList(searchChairList);
    }

    public List<ChairResponseDTO.Chair> getEndRentalList(){
        return chairRepository.selectEndRentalList();
    }

    public Integer saveRentInfo(ChairRequsetDTO.UpdateChair updateChair){
        updateChair.setPayment("지불완료");
        updateChair.setEndDate(LocalDate.now().toString());
        return chairRepository.updateRentInfo(updateChair);
    }

    public Integer returnRentInfo(ChairRequsetDTO.UpdateChair updateChair){
        updateChair.setPayment("");
        updateChair.setEndDate("");
        return chairRepository.updateRentInfo(updateChair);
    }

    public Integer extensionRent(ChairRequsetDTO.UpdateChair updateChair){
        updateChair.setPayment("");
        updateChair.setPayment("");
        return chairRepository.extensionRent(updateChair);
    }


}
