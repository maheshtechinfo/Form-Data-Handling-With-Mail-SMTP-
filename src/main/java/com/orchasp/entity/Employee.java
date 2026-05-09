package com.orchasp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String mobile;
	private String email;
	private String companyName;

	@Column(length = 12)
	private String aadhaar;

	@Column(length = 10)
	private String pan;

	private String address;
	private String position;
	private Double salary;
	private String department;

	@Column(name = "is_deleted")
	private Boolean isDeleted = false;
}