package com.my.shop.item;

import com.my.shop.item.dto.ItemDto;
import com.my.shop.item.dto.ItemHistoryListDto;
import com.my.shop.item.dto.SearchDto;
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

    public Integer saveItem(ItemDto itemDto){
        itemRepository.insertItem(itemDto);
        Integer i = itemRepository.insertItemStock(itemDto);

        return i;
    }

    public List<ItemDto> itemSerch(ItemDto itemDto){
        return itemRepository.selectItemByName(itemDto);
    }

    public Integer changeItemCnt(ItemHistoryListDto itemListDto){
        Integer i = itemRepository.insertItemHistroy(itemListDto);

        for(ItemHistoryListDto.ItemInfo item : itemListDto.getItemInfoList()){
            switch(itemListDto.getType()){
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

    public List<Map<String, Object>> getItemHistory(SearchDto searchDto){
        return itemRepository.selectItemHistory(searchDto);
    }

    public List<Map<String, Object>> getItemList(SearchDto searchDto){
        return itemRepository.selectItemList(searchDto);
    }
}
