package com.shreyansh.springbootcrud.springbootcrudapi.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shreyansh.springbootcrud.springbootcrudapi.modal.Customer;
import com.shreyansh.springbootcrud.springbootcrudapi.service.CustomerService;


@RestController
@RequestMapping("/api")
public class CustomerController {
	
	 @Autowired
	 private CustomerService custService;
	 
	 @GetMapping("/customer")
	 public List<Customer> get() {
		 return custService.get();
	 }
	 
	 @PostMapping("/customer")
	 public Customer save(@RequestBody Customer cust) {
		 custService.save(cust);
		 return cust;
	 }
	 
	 @GetMapping("/customer/{id}")
	 public Customer get(@PathVariable int id) {
		 return custService.get(id);
	 }
	 
	 @DeleteMapping("/customer/{id}")
	 public String delete(@PathVariable int id) {
		 custService.delete(id);
		 return "Cusomer removed with id "+id;
	 }
	 
	 /*@PutMapping("/customer")
	 public Customer update(@RequestBody Customer cust) {
		 custService.save(cust);
		 return cust;
	 }*/
	 
	 @PutMapping("/customer/{id}")
	 public Customer update(@PathVariable int id, @RequestBody Customer cust) {
		 Customer c = custService.get(id);
		 c.setName(cust.getName());
		 c.setGender(cust.getGender());
		 c.setSales(cust.getSales());
		 c.setDob(cust.getDob());
		 custService.save(c);
		 return cust;
	 }
}
