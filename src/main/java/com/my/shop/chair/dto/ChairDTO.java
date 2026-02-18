package com.my.shop.chair.dto;

import lombok.Data;

@Data
public class ChairDTO {

    private String rentalId;
    private String wheelchairType;
    private String serialNumber;
    private String startDate;
    private String endDate;
    private String customerName;
    private String customerTel;
    private String remarks;

}
