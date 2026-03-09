package com.my.shop.customer;

import com.my.shop.customer.dto.CustomerRequestDTO;
import com.my.shop.customer.dto.CustomerResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<CustomerResponseDTO.Customer> selectCustomerList(CustomerRequestDTO.Customer customer){
        return customerRepository.selectCustomer(customer);
    }


}
