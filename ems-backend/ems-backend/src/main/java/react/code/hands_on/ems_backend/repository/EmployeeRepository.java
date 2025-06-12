package react.code.hands_on.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import react.code.hands_on.ems_backend.entity.employee;

public interface EmployeeRepository extends JpaRepository<employee, Long> {

    

}
