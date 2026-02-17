package com.my.shop.item.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

import java.util.List;

@Data
@Alias("ItemDto")
public class ItemDto {
    private Integer id;
    private String itemName;
    private Integer price1;
    private Integer price2;
    private Integer price3;
    private String createdAt;
    private ItemStockDto itemStock;
}
