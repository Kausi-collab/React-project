package react.code.hands_on.ems_backend.service;

import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import react.code.hands_on.ems_backend.entity.employee;
import react.code.hands_on.ems_backend.exception.ResourceNotFoundException;
import react.code.hands_on.ems_backend.mapper.EmployeeMapper;
import react.code.hands_on.ems_backend.dto.EmployeeDto;
import react.code.hands_on.ems_backend.repository.EmployeeRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class EmployeeServiceImpl implements EmployeeService {

    private  EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        employee Employee =  EmployeeMapper.mapToemEmployee(employeeDto);
        employee createEmployee = employeeRepository.save(Employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(long employeeId) {
        employee Employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exists with id: " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(Employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(Employee -> EmployeeMapper.mapToEmployeeDto(Employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(long employeeId, EmployeeDto updateEmployeeDto) {
        employee Employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + employeeId));

        Employee.setFirstName(updateEmployeeDto.getFirstName());
        Employee.setLastName(updateEmployeeDto.getLastName());
        Employee.setEmail(updateEmployeeDto.getEmail());

        employee updatedEmployee = employeeRepository.save(Employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(long employeeId) {
        employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + employeeId));
        employeeRepository.deleteById(employeeId);
    }

}
