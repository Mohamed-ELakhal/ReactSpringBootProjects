package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/employees")
public class EmployeeController {
    private EmployeeService employeeService;
    @Autowired
    public  EmployeeController (EmployeeService theemployeeService){
        employeeService=theemployeeService;
    }
    @GetMapping("/list")
    public String getEmployeesList(Model themodel) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object[] currentPrinciparoles = authentication.getAuthorities().toArray();
        System.out.println(currentPrinciparoles.length);
        System.out.println(Arrays.stream(currentPrinciparoles).findFirst().get());

        if(Arrays.stream(currentPrinciparoles).findFirst().get().toString().equals("ROLE_EMPLOYEE") || currentPrinciparoles.length  ==1) {

        }

        themodel.addAttribute("employee",employeeService.getEmployeesList());
        return "employees/employees/employees-list";
    }
    @GetMapping("/showFormAddEmp")
    public String showFormAddEmp(Model themodel) {
        Employee employee=new Employee();
        themodel.addAttribute("employee",employee);
        return "employees/add-employee";
    }
    @PostMapping("/save")
    public String saveEmployee(@Valid @ModelAttribute("employee")Employee employee, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return "employees/add-employee";
        else {
            employeeService.save(employee);
            return "redirect:/employees/list";
        }
    }
    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @GetMapping("/showMyLoginPage")
    public String showMyLoginPage() {
        return "employees/security/login-form";
    }
}
