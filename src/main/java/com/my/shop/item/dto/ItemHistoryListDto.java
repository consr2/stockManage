package com.my.shop.item.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

import java.util.List;

@Data
@Alias("ItemHistoryListDto")
public class ItemHistoryListDto {
    private Integer id;
    private String date;
    private String customer;
    private List<ItemInfo> itemInfoList;
    private String type;

    @Getter
    @Setter
    public static class ItemInfo{
        private Integer itemId;
        private String itemName;
        private Integer cnt;
    }
}
