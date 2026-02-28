package com.my.shop.item.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class ItemRequestDTO {

    @Data
    public static class InsertItem{
        private Integer id;
        private String itemName;
        private Integer price1;
        private Integer price2;
        private Integer price3;
    }

    @Data
    public static class SearchItem{
        private String itemName;
    }

    @Data
    public static class SearchCustomer{
        private String customer;
    }


    @Data
    @Builder
    public static class InsertItemPrice{
        private Integer itemId;
        private Integer price1;
        private Integer price2;
        private Integer price3;
        private String createAt;
    }

    @Data
    public static class InsertItemHistory{
        private Integer id;
        private String date;
        private String customer;
        private String customerTel;
        private String type;
        private List<ItemInfo> itemInfoList;

    }

    @Data
    public static class ItemInfo{
        private Integer itemId;
        private String itemName;
        private Integer cnt;
    }

    @Data
    public static class ItemHistorySearch{
        private String startDate;
        private String endDate;
        private String itemName;
        private String customer;
        private String type;
    }

    @Data
    public static class ItemListSearch{
        private String startDate;
        private String endDate;
    }




}
