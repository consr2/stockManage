package com.my.shop.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MainService {

    private final MainRepository mainRepository;

    public List<Map<String,Object>> getUser(){
        return mainRepository.getUser();
    }

}
