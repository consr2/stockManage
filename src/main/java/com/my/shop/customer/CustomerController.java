package com.my.shop.customer;

import com.my.shop.chair.dto.ChairRequsetDTO;
import com.my.shop.customer.dto.CustomerRequestDTO;
import com.my.shop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@Slf4j
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @ResponseBody
    @PostMapping("/customer/getCustomerList")
    public ResponseUtil getCustomerList(@RequestBody CustomerRequestDTO.Customer customer){
        log.info("POST : /customer/getCustomerList");
        return ResponseUtil.builder()
                .data(customerService.selectCustomerList(customer))
                .msg("연장이 완료되었습니다")
                .code(200)
                .build();
    }
}
