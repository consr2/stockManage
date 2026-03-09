package com.my.shop.item;

import com.my.shop.customer.CustomerRepository;
import com.my.shop.customer.dto.CustomerRequestDTO;
import com.my.shop.customer.dto.CustomerResponseDTO;
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
    private final CustomerRepository customerRepository;

    public Integer saveItem(ItemRequestDTO.InsertItem insertItem){
        itemRepository.insertItem(insertItem);
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

        CustomerRequestDTO.Customer customer = CustomerRequestDTO.Customer.builder()
                                                    .customerName(insertItemHistory.getCustomer())
                                                    .customerTel(insertItemHistory.getCustomerTel())
                                                    .custAddress(insertItemHistory.getAddress())
                                                    .custNum(insertItemHistory.getCustNum())
                                                    .build();
        customerRepository.saveCustomer(customer);
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

    public Integer saveItemPriceList(ItemRequestDTO.ItemPrice itemPrice){
        return itemRepository.updateItemPrice(itemPrice);
    }

    public Integer deleteItem(ItemRequestDTO.ItemPrice itemPrice){
        return itemRepository.deleteItem(itemPrice);
    }

    public Integer updateHist(ItemRequestDTO.ItemHistoryUpdate itemHist){
        ItemRequestDTO.ItemInfo item = ItemRequestDTO.ItemInfo.builder()
                .itemId(itemHist.getItemIdx())
                .cnt(itemHist.getCalCnt())
                .build();
        itemRepository.addItemCnt(item);

        return itemRepository.updateitemHist(itemHist);
    }

    public Integer deleteHist(ItemRequestDTO.ItemHistoryUpdate itemHist){
        ItemRequestDTO.ItemInfo item = ItemRequestDTO.ItemInfo.builder()
                .itemId(itemHist.getItemIdx())
                .cnt(itemHist.getCnt())
                .build();

        switch(itemHist.getType()){
            //기존 타입가져옴 기존in이었으면 다시 빼줘야하고 out이면 더해주기
            case "IN":
                itemRepository.subItemCnt(item);
                break;
            case "OUT":
                itemRepository.addItemCnt(item);
                break;
        }

        return itemRepository.deleteItemHist(itemHist);
    }

}
