package com.my.shop.chair;

import com.my.shop.chair.dto.ChairDTO;
import com.my.shop.chair.dto.ChairRequsetDTO;
import com.my.shop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChairController {

    private final ChairService chairService;

    @GetMapping("/chair/rental")
    public String chairRental(){
        log.info("GET : /chair/rental");
        return "chair/chairRental";
    }

    @GetMapping("/chair/rentalList")
    public String chairRentalList(){
        log.info("GET : /chair/rentalList");
        return "chair/chairRentalList";
    }

    @ResponseBody
    @PostMapping("/chair/submit")
    public ResponseUtil chairSubmit(@RequestBody ChairRequsetDTO.InsertChair insertChair){
        log.info("POST : /chair/submit");
        return ResponseUtil.builder()
                .data(chairService.chairSubmit(insertChair))
                .msg("저장성공")
                .code(200)
                .build();
    }


    @ResponseBody
    @PostMapping("/chair/rentalList")
    public ResponseUtil getRentalList(@RequestBody ChairRequsetDTO.SearchChairList searchChairList){
        log.info("POST : /chair/rentalList");
        return ResponseUtil.builder()
                .data(chairService.getRentalList(searchChairList))
                .msg("저장성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/chair/endRentalList")
    public ResponseUtil getEndRentalList(){
        log.info("POST : /chair/endRentalList");
        return ResponseUtil.builder()
                .data(chairService.getEndRentalList())
                .msg("조회성공")
                .code(200)
                .build();
    }


    @ResponseBody
    @PostMapping("/chair/saveRentInfo")
    public ResponseUtil saveRentInfo(@RequestBody ChairRequsetDTO.UpdateChair updateChair){
        log.info("POST : /chair/saveRentInfo");
        return ResponseUtil.builder()
                .data(chairService.saveRentInfo(updateChair))
                .msg("반납이 완료되었습니다")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/chair/returnRentInfo")
    public ResponseUtil returnRentInfo(@RequestBody ChairRequsetDTO.UpdateChair updateChair){
        log.info("POST : /chair/returnRentInfo");
        return ResponseUtil.builder()
                .data(chairService.returnRentInfo(updateChair))
                .msg("철회가 완료되었습니다")
                .code(200)
                .build();
    }

}
