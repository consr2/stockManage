package com.my.shop.util;

import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;


@Data
@Builder
public class ResponseUtil<T> {
    private T data;
    private String msg;
    private Integer code;
}
