package com.my.shop.chair.dto;

import lombok.Data;

@Data
public class ChairRequsetDTO {



    @Data
    public static class InsertChair{
        private String wheelchairType;
        private String startDate;
        private String expectDate;
        private String customerName;
        private String customerTel;
        private String remarks;
    }

    @Data
    public static class UpdateChair{
        private Integer rentalId;
        private String payment;
        private String endDate;
    }

    @Data
    public static class SearchChairList{
        private String startDate;
        private String endDate;
        private String customerName;
        private String customerTel;
    }

}
