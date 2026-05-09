package com.orchasp.service;

import java.util.List;

import com.orchasp.entity.Employee;

public interface IEmployeeService {

	Employee saveEmployee(Employee emp);

	List<Employee> getAllEmployees();

	Employee getEmployeeById(Long id);

	Employee updateEmployee(Long id, Employee emp);

	void deleteEmployee(Long id);
}