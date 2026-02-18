package com.my.shop.chair;

import com.my.shop.chair.dto.ChairDTO;
import com.my.shop.item.dto.SearchDto;
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
    public ResponseUtil chairSubmit(@RequestBody ChairDTO chairDto){
        log.info("POST : /chair/submit");
        return ResponseUtil.builder()
                .data(chairService.chairSubmit(chairDto))
                .msg("저장성공")
                .code(200)
                .build();
    }


    @ResponseBody
    @PostMapping("/chair/rentalList")
    public ResponseUtil getRentalList(@RequestBody ChairDTO chairDto){
        log.info("POST : /chair/rentalList");
        return ResponseUtil.builder()
                .data(chairService.getRentalList(chairDto))
                .msg("저장성공")
                .code(200)
                .build();
    }



}
