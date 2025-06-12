package react.code.hands_on.ems_backend.service;

import java.util.List;

import react.code.hands_on.ems_backend.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(long employeeId, EmployeeDto updateEmployeeDto);

    void deleteEmployee(long employeeId);

}
