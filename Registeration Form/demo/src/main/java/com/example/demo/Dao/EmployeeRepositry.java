package com.example.demo.Dao;

import com.example.demo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepositry extends JpaRepository<Employee,Integer> {
}
