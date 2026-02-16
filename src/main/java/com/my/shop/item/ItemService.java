package com.my.shop.item;

import com.my.shop.item.dto.ItemDto;
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
        return itemRepository.insertItem(itemDto);
    }

    public List<ItemDto> itemSerch(ItemDto itemDto){
        return itemRepository.selectItemByName(itemDto);
    }
}
