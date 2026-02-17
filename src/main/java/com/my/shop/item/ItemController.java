package com.my.shop.item;

import com.my.shop.item.dto.ItemDto;
import com.my.shop.item.dto.ItemHistoryListDto;
import com.my.shop.item.dto.SearchDto;
import com.my.shop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/item/manage")
    public String itemManage(){
        return "item/itemManage";
    }

    @GetMapping("/item/change")
    public String itemChange(){
        return "item/itemChange";
    }

    @GetMapping("/item/history")
    public String itemHistory(){
        return "item/itemHistory";
    }

    @GetMapping("/item/list")
    public String itemList(){
        return "item/itemlist";
    }


    @ResponseBody
    @PostMapping("/item/save")
    public ResponseUtil itemSave(@RequestBody ItemDto itemDto){
        return ResponseUtil.builder()
                .data(itemService.saveItem(itemDto))
                .msg("저장완료")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/search")
    public ResponseUtil itemSerch(@RequestBody ItemDto itemDto){
        return ResponseUtil.builder()
                .data(itemService.itemSerch(itemDto))
                .msg("검색완료")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/changeCnt")
    public ResponseUtil itemSerch(@RequestBody ItemHistoryListDto itemListDto){
        return ResponseUtil.builder()
                .data(itemService.changeItemCnt(itemListDto))
                .msg("저장완료")
                .code(200)
                .build();
    }


    @ResponseBody
    @PostMapping("/item/getItemHistory")
    public ResponseUtil getItemHistory(@RequestBody SearchDto searchDto){
        return ResponseUtil.builder()
                .data(itemService.getItemHistory(searchDto))
                .msg("조회성공")
                .code(200)
                .build();
    }

    @ResponseBody
    @PostMapping("/item/getItemList")
    public ResponseUtil getItemList(@RequestBody SearchDto searchDto){
        return ResponseUtil.builder()
                .data(itemService.getItemList(searchDto))
                .msg("조회성공")
                .code(200)
                .build();
    }

}
