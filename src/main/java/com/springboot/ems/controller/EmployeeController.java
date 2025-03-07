package com.springboot.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.ems.model.Employee;
import com.springboot.ems.service.EmployeeService;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
	private EmployeeService service;

	@GetMapping
	public String getAllEmployees(Model model) {
		List<Employee> employees = service.getAllEmployee();
		model.addAttribute("employees", employees);
//		return "employee-list";
		return "homepage";
	}
	
//
//	@GetMapping("/add")
//	public String showAddEmployeeForm(Model model) {
//		model.addAttribute("employee", new Employee());
//		return "add-employee";
//	}
//
//	@PostMapping("/add")
//	public String saveEmployee(@ModelAttribute Employee employee) {
//		service.saveEmployee(employee);
//		return "redirect:/employees";
//	}
//
//	@GetMapping("/edit/{id}")
//	public String showEditEmployeeForm(@PathVariable int id, Model model) {
//		Employee employeeById = service.getEmployeeById(id);
//		model.addAttribute("employee", employeeById);
//		System.out.println(employeeById);
//		return "edit-employee";
//	}
//
//	@PostMapping("/update")
//	public String updateEmployee(@ModelAttribute Employee employee) {
//		service.saveEmployee(employee);
//		return "redirect:/employees";
//	}
//	
//	@GetMapping("delete/{id}")
//	public String deleteEmployee(@PathVariable int id) {
//		service.deleteEmployee(id);
//		return "redirect:/employees";
//	}
//	
}
