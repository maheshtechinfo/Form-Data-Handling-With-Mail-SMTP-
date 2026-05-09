package com.orchasp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orchasp.entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {

	// Only active records
	List<Employee> findByIsDeletedFalse();

	Optional<Employee> findByIdAndIsDeletedFalse(Long id);
}