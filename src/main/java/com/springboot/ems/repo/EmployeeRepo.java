package com.springboot.ems.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.ems.model.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

	List<Employee> findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrPositionIgnoreCase(String name,
			String department, String position);

}
