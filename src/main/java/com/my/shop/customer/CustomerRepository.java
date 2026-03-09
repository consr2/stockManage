package com.my.shop.customer;

import com.my.shop.customer.dto.CustomerRequestDTO;
import com.my.shop.customer.dto.CustomerResponseDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CustomerRepository {

    Integer saveCustomer(CustomerRequestDTO.Customer customer);
    List<CustomerResponseDTO.Customer> selectCustomer(CustomerRequestDTO.Customer customer);

}
