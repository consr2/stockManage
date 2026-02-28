package com.my.shop.item;

import com.my.shop.item.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public Integer saveItem(ItemRequestDTO.InsertItem insertItem){
        itemRepository.insertItem(insertItem);
        ItemRequestDTO.InsertItemPrice itemPriceDto = ItemRequestDTO.InsertItemPrice.builder()
                                        .itemId(insertItem.getId())
                                        .price1(insertItem.getPrice1())
                                        .price2(insertItem.getPrice2())
                                        .price3(insertItem.getPrice3())
                                        .build();

        itemRepository.insertItemPrice(itemPriceDto);

        return 1;
    }

    public List<ItemResponseDTO.Item> itemSerch(ItemRequestDTO.SearchItem searchItem){
        return itemRepository.selectItemByName(searchItem);
    }

    public Integer changeItemCnt(ItemRequestDTO.InsertItemHistory insertItemHistory){
        Integer i = itemRepository.insertItemHistroy(insertItemHistory);

        for(ItemRequestDTO.ItemInfo item : insertItemHistory.getItemInfoList()){
            switch(insertItemHistory.getType()){
                case "IN":
                    itemRepository.addItemCnt(item);
                    break;
                case "OUT":
                    itemRepository.subItemCnt(item);
                    break;
            }
        }
        return i;
    }

    public List<ItemResponseDTO.ItemHistory> getItemHistory(ItemRequestDTO.ItemHistorySearch itemHistorySearch){
        return itemRepository.selectItemHistory(itemHistorySearch);
    }

    public List<ItemResponseDTO.Customer> getCustomer(ItemRequestDTO.SearchCustomer searchCustomer){
        return itemRepository.selectCustomer(searchCustomer);
    }

    public List<ItemResponseDTO.Item> getItemList(ItemRequestDTO.ItemListSearch itemListSearch){
        return itemRepository.selectItemList(itemListSearch);
    }

    public List<ItemResponseDTO.ItemPrice> getItemPriceList(ItemRequestDTO.ItemPrice itemPrice){
        return itemRepository.selectItemPriceList(itemPrice);
    }

    public Integer saveItemPriceList(List<ItemRequestDTO.InsertItemPrice> insertItemPrice){
        return itemRepository.saveItemPriceList(insertItemPrice);
    }

}
