package com.my.shop.item.dto;


import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Alias("ItemDto")
public class ItemDto {
    private Integer id;
    private String itemName;
    private Integer price1;
    private Integer price2;
    private Integer price3;
    private String createAt;
}
