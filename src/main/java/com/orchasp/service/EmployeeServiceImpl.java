package com.orchasp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orchasp.entity.Employee;
import com.orchasp.exception.ResourceNotFoundException;
import com.orchasp.repository.EmployeeRepo;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

	@Autowired
	private EmployeeRepo empRepo;

	@Autowired
	private EmailService emailService;

	// CREATE
	@Override
	public Employee saveEmployee(Employee emp) {

	    boolean isNew = true;

	    if (emp.getId() != null) {
	        isNew = !empRepo.findById(emp.getId()).isPresent();
	    }

	    Employee saved = empRepo.save(emp);

	    String subject;
	    String body;

	    if (isNew) {
	        subject = "Employee Created";
	        body = "Hello " + saved.getName() +
	               ",\nYour record has been created successfully.";
	    } else {
	        subject = "Employee Updated";
	        body = "Hello " + saved.getName() +
	               ",\nYour record has been updated successfully.";
	    }

	    System.out.println("Sending mail: " + subject); // DEBUG

	    emailService.sendEmail(saved.getEmail(), subject, body);

	    return saved;
	}
	// GET ALL (only non-deleted)
	@Override
	public List<Employee> getAllEmployees() {
		return empRepo.findByIsDeletedFalse();
	}

	// GET BY ID (only non-deleted)
	@Override
	public Employee getEmployeeById(Long id) {
		return empRepo.findByIdAndIsDeletedFalse(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
	}

	// UPDATE
	@Override
	public Employee updateEmployee(Long id, Employee emp) {

		Employee existing = empRepo.findByIdAndIsDeletedFalse(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

		// Set updated values
		existing.setName(emp.getName());
		existing.setMobile(emp.getMobile());
		existing.setEmail(emp.getEmail());
		existing.setCompanyName(emp.getCompanyName());
		existing.setAadhaar(emp.getAadhaar());
		existing.setPan(emp.getPan());
		existing.setAddress(emp.getAddress());
		existing.setPosition(emp.getPosition());
		existing.setSalary(emp.getSalary());
		existing.setDepartment(emp.getDepartment());

		return empRepo.save(existing);
	}

	// SOFT DELETE
	@Override
	public void deleteEmployee(Long id) {

	    Employee emp = empRepo.findById(id).orElse(null);

	    if (emp != null) {
	        emp.setIsDeleted(true);
	        empRepo.save(emp);

	        String subject = "Employee Deleted";
	        String body = "Hello " + emp.getName() +
	                      ",\nYour record has been deleted.";

	        emailService.sendEmail(emp.getEmail(), subject, body);
	    }
	}
}