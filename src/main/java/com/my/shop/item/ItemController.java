package com.my.shop.item;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ItemController {

    @GetMapping("/item/manage")
    public String itemManage(){
        return "/item/itemManage";
    }

    @GetMapping("/item/change")
    public String itemChange(){
        return "/item/itemChange";
    }

    @GetMapping("/item/history")
    public String itemHistory(){
        return "/item/itemHistory";
    }
}
