package com.springboot.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ems.model.Employee;
import com.springboot.ems.repo.EmployeeRepo;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepo repo;

	public List<Employee> getAllEmployee() {
		List<Employee> all = repo.findAll();
		return all;
	}

	public Employee getEmployeeById(int id) {
		return repo.findById(id).orElse(null);
	}

	public Employee saveEmployee(Employee emp) {
		return repo.save(emp);
	}

	public void deleteEmployee(int id) {
		repo.deleteById(id);
	}

	public List<Employee> search(String query) {
		return repo.findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrPositionIgnoreCase(query, query,
				query);

	}
}
