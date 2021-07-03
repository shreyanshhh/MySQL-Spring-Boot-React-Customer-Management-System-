package com.shreyansh.springbootcrud.springbootcrudapi.modal;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
	
	@Entity
	@Table(name = "tb_emp")
public class Customer {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column
	 private Integer id;
	@Column
	 private String name;
	@Column
	 private int sales;
	@Column
	 private Date dob;
	@Column
	 private String gender;
	@Override
	 public String toString() {
	  return "Employee [id= " + id + ", name=" + name + ", sales=" + sales + ", dob=" + dob + ", gender="
	    + gender + "]";
	 }
	public Integer getId() {
	  return id;
	 }
	public void setId(Integer id) {
	  this.id = id;
	 }
	public String getName() {
	  return name;
	 }
	public void setName(String name) {
	  this.name = name;
	 }
	public int getSales() {
	  return sales;
	 }
	public void setSales(int sales) {
	  this.sales = sales;
	 }
	public Date getDob() {
	  return dob;
	 }
	public void setDob(Date dob) {
	  this.dob = dob;
	 }
	public String getGender() {
	  return gender;
	 }
	public void setGender(String gender) {
	  this.gender = gender;
	 }
}