package com.my.shop.chair.dto;

import lombok.Data;

@Data
public class ChairResponseDTO {

    @Data
    public static class Chair{
        private Integer rentalId;
        private String startDate;
        private String expectDate;
        private String endDate;
        private String customerName;
        private String customerTel;
        private String wheelchairType;
        private String remarks;
        private String payment;
    }

}
