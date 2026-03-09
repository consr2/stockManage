package com.my.shop.customer.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class CustomerRequestDTO {

    @Data
    @Builder
    public static class Customer{
        private Integer id;
        private String customerName;
        private String custNum;
        private String customerTel;
        private String custAddress;
    }

}
