package com.my.shop.item.dto;


import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("SearchDto")
public class SearchDto {
    private String startDate;
    private String endDate;
    private String itemName;
    private String customer;
}
