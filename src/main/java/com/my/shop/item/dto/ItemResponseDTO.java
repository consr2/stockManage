package com.my.shop.item.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class ItemResponseDTO {

    @Data
    public static class Item{
        private Integer id;
        private String itemName;
        private Integer currentCnt;
        private Integer price1;
        private Integer price2;
        private Integer price3;
        private String createAt;
    }


    @Data
    public static class Customer{
        private String customer;
    }

    @Data
    public static class ItemHistory{
        private Integer id;
        private String date;
        private String itemName;
        private Integer cnt;
        private String customer;
        private String customerTel;
        private String type;
        private Integer price1;
        private Integer price2;
        private Integer price3;

    }

}
