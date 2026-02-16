package com.my.shop.main;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;

    @GetMapping("/index")
    public String main(){
        List<Map<String,Object>> result = mainService.getUser();
        System.out.println(result.toString());
        return "/main/main";
    }



}
