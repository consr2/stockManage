package com.my.shop.item;

import com.my.shop.item.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemRepository {

    Integer insertItem(ItemRequestDTO.InsertItem insertItem);

    Integer insertItemPrice(ItemRequestDTO.InsertItemPrice itemPriceDto);

    List<ItemResponseDTO.Item> selectItemByName(ItemRequestDTO.SearchItem searchItem);

    Integer insertItemHistroy(ItemRequestDTO.InsertItemHistory insertItemHistory);

    Integer addItemCnt(ItemRequestDTO.ItemInfo itemListDto);

    Integer subItemCnt(ItemRequestDTO.ItemInfo itemListDto);

    List<ItemResponseDTO.ItemHistory> selectItemHistory(ItemRequestDTO.ItemHistorySearch itemHistorySearch);

    List<ItemResponseDTO.Customer> selectCustomer(ItemRequestDTO.SearchCustomer searchCustomer);

    List<ItemResponseDTO.Item> selectItemList(ItemRequestDTO.ItemListSearch itemListSearch);

}
