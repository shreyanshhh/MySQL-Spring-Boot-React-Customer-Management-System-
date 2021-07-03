package com.shreyansh.springbootcrud.springbootcrudapi.service;

import java.util.List;

import com.shreyansh.springbootcrud.springbootcrudapi.modal.Customer;

public interface CustomerService {
	 List<Customer> get();
	 
	 Customer get(int id);
	 
	 void save(Customer employee);
	 
	 void delete(int id);
}