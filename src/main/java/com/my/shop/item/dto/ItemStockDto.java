package com.my.shop.item.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ItemStockDto")
public class ItemStockDto {
    private Integer itemId;
    private String itemName;
    private Integer currentCnt;
    private String lastUpdated;
}
