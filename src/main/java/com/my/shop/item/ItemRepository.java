package com.my.shop.item;

import com.my.shop.item.dto.ItemDto;
import com.my.shop.item.dto.ItemHistoryListDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemRepository {

    Integer insertItem(ItemDto itemDto);

    Integer insertItemStock(ItemDto itemDto);

    List<ItemDto> selectItemByName(ItemDto itemDto);

    Integer insertItemHistroy(ItemHistoryListDto itemListDto);

    Integer addItemCnt(ItemHistoryListDto.ItemInfo itemListDto);

    Integer subItemCnt(ItemHistoryListDto.ItemInfo itemListDto);

}
