package com.example.employeemangmentdemo.service;

import com.example.employeemangmentdemo.entity.Employee;
import com.example.employeemangmentdemo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class EmployeeServiceImple implements EmployeeServiceInterface{
    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImple(EmployeeRepository theemployeeRepository) {
        employeeRepository=theemployeeRepository;
    }
    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public Employee updateEmployee(int id, Employee employee) {
        Employee employeeToUpdate = employeeRepository.findById(id).orElseThrow();
        employeeToUpdate.setFirstName(employee.getFirstName());
        employeeToUpdate.setLastName(employee.getLastName());
        employeeToUpdate.setEmail(employee.getEmail());
        return employeeRepository.save(employeeToUpdate);
    }

    @Override
    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }
}
