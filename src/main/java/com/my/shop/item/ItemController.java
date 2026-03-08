package com.my.shop.item;

import com.my.shop.item.dto.ItemRequestDTO;
import com.my.shop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/item/manage")
    public String itemManage(){
        log.info("GET : /item/manage");
        return "item/itemManage";
    }

    @GetMapping("/item/change")
    public String itemChange(){
        log.info("GET : /item/change");
        return "item/itemChange";
    }

    @GetMapping("/item/history")
    public String itemHistory(){
        log.info("GET : /item/history");
        return "item/itemHistory";
    }

    @GetMapping("/item/list")
    public String itemList(){
        log.info("GET : /item/list");
        return "item/itemList";
    }


    @ResponseBody
    @PostMapping("/item/save")
    public ResponseUtil itemSave(@RequestBody ItemRequestDTO.InsertItem insertItem){
        log.info("POST : /item/save");
        return ResponseUtil.builder()
                .data(itemService.saveItem(insertItem))
                .msg("저장완료")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/search")
    public ResponseUtil itemSerch(@RequestBody ItemRequestDTO.SearchItem searchItem){
        log.info("POST : /item/search");
        return ResponseUtil.builder()
                .data(itemService.itemSerch(searchItem))
                .msg("검색완료")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/changeCnt")
    public ResponseUtil itemSerch(@RequestBody ItemRequestDTO.InsertItemHistory insertItemHistory){
        log.info("POST : /item/changeCnt");
        return ResponseUtil.builder()
                .data(itemService.changeItemCnt(insertItemHistory))
                .msg("저장완료")
                .code(200)
                .build();
    }


    @ResponseBody
    @PostMapping("/item/getItemHistory")
    public ResponseUtil getItemHistory(@RequestBody ItemRequestDTO.ItemHistorySearch itemHistorySearch){
        log.info("POST : /item/getItemHistory");
        return ResponseUtil.builder()
                .data(itemService.getItemHistory(itemHistorySearch))
                .msg("조회성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/getCustomer")
    public ResponseUtil getCustomer(@RequestBody ItemRequestDTO.SearchCustomer searchCustomer){
        log.info("POST : /item/getCustomer");
        return ResponseUtil.builder()
                .data(itemService.getCustomer(searchCustomer))
                .msg("조회성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/getItemList")
    public ResponseUtil getItemList(@RequestBody ItemRequestDTO.ItemListSearch itemListSearch){
        log.info("POST : /item/getItemList");
        return ResponseUtil.builder()
                .data(itemService.getItemList(itemListSearch))
                .msg("조회성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/getItemPriceList")
    public ResponseUtil getItemPriceList(@RequestBody ItemRequestDTO.ItemPrice itemPrice){
        log.info("POST : /item/getItemPriceList");
        return ResponseUtil.builder()
                .data(itemService.getItemPriceList(itemPrice))
                .msg("조회성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/saveItemPriceList")
    public ResponseUtil saveItemPriceList(@RequestBody ItemRequestDTO.ItemPrice itemPrice){
        log.info("POST : /item/saveItemPriceList");
        return ResponseUtil.builder()
                .data(itemService.saveItemPriceList(itemPrice))
                .msg("저장성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/deleteItem")
    public ResponseUtil deleteItem(@RequestBody ItemRequestDTO.ItemPrice itemPrice){
        log.info("POST : /item/deleteItem");
        return ResponseUtil.builder()
                .data(itemService.deleteItem(itemPrice))
                .msg("저장성공")
                .code(200)
                .build();
    }

}
