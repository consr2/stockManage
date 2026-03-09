package com.my.shop.customer.dto;

import lombok.Data;

@Data
public class CustomerResponseDTO {

    @Data
    public static class Customer{
        private Integer id;
        private String customerName;
        private String custNum;
        private String customerTel;
        private String custAddress;
    }

}
