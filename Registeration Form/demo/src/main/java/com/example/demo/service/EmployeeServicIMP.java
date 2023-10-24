package com.example.demo.service;

import com.example.demo.Dao.EmployeeRepositry;
import com.example.demo.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServicIMP implements EmployeeService {
    private EmployeeRepositry employeeRepositry;
    @Autowired
    public EmployeeServicIMP(EmployeeRepositry theemployeeRepositry) {
        employeeRepositry=theemployeeRepositry;
    }
    @Override
    public List<Employee> getEmployeesList() {
        return employeeRepositry.findAll();
    }

    @Override
    public void save(Employee employee) {
        employeeRepositry.save(employee);
    }
}
