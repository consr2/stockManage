package com.my.shop.item;

import com.my.shop.item.dto.ItemDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemRepository {

    Integer insertItem(ItemDto itemDto);

    List<ItemDto> selectItemByName(ItemDto itemDto);

}
