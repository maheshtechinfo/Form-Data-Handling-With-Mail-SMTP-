package com.orchasp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.orchasp.entity.Employee;
import com.orchasp.service.IEmployeeService;

@CrossOrigin(origins = {
	    "http://localhost:3000",
	    "http://localhost:5173",
	    "http://localhost:5174"
	})
@RestController
@RequestMapping("/api/employees")
public class EmployeeRestController {

    @Autowired
    private IEmployeeService service;

    // CREATE
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee emp) {
        return ResponseEntity.ok(service.saveEmployee(emp));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEmployeeById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
                                                   @RequestBody Employee emp) {

        emp.setId(id); // IMPORTANT

        return ResponseEntity.ok(service.saveEmployee(emp)); // ✔
    }

    // DELETE (SOFT)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}