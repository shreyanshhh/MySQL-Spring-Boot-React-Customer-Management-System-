package com.shreyansh.springbootcrud.springbootcrudapi.dao;

import java.util.List;
import com.shreyansh.springbootcrud.springbootcrudapi.modal.Customer;

public interface CustomerDAO {
 
	 List<Customer> get();
	 
	 Customer get(int id);
	 
	 void save(Customer customer);
	 
	 void delete(int id);
}
