package react.code.hands_on.ems_backend.mapper;

import react.code.hands_on.ems_backend.dto.EmployeeDto;
import react.code.hands_on.ems_backend.entity.employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(employee Employee){
        return new EmployeeDto(
                Employee.getId(),
                Employee.getFirstName(),
                Employee.getLastName(),
                Employee.getEmail()
        );
    }

    public static employee mapToemEmployee(EmployeeDto employeeDto){
        return new employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }

}
