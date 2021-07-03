package com.shreyansh.springbootcrud.springbootcrudapi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shreyansh.springbootcrud.springbootcrudapi.dao.CustomerDAO;
import com.shreyansh.springbootcrud.springbootcrudapi.modal.Customer;

@Service
public class CustomerServiceImp implements CustomerService{
	
	 @Autowired
	 private CustomerDAO custDao;
	 
	@Transactional 
	@Override
	public List<Customer> get() {
		return custDao.get();
	}
	
	@Transactional
	@Override
	public Customer get(int id) {
		return custDao.get(id);
	}
	
	@Transactional
	@Override
	public void save(Customer cust) {
		custDao.save(cust);
	}
	
	@Transactional
	@Override
	public void delete(int id) {
		custDao.delete(id);
	}

}
