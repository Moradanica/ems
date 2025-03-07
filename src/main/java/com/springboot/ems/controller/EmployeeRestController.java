package com.springboot.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ems.model.Employee;
import com.springboot.ems.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeRestController {

	@Autowired
	private EmployeeService empService;

	@GetMapping
	public List<Employee> getAllEmployees() {
		return empService.getAllEmployee();
	}

	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable int id) {
		return empService.getEmployeeById(id);
	}

	@PostMapping()
	public Employee addEmployee(@RequestBody Employee emp) {
		return empService.saveEmployee(emp);
	}

	@PutMapping("/{id}")
	public Employee updateEmployee(@PathVariable int id, @RequestBody Employee emp) {
		return empService.saveEmployee(emp);
	}

	@DeleteMapping("/{id}")
	public void deleteEmployee(@PathVariable int id) {
		empService.deleteEmployee(id);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Employee>> searchEmployees(@RequestParam String query) {
		List<Employee> employees = empService.search(query);
		return ResponseEntity.ok(employees);
	}

}
