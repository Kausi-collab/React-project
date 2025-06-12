import React, {useEffect, useState} from 'react'
import { listEmployees,deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();    
    }, []);

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error("There was an error fetching the employee data!", error);
        });
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }
    
    function updateEmployee(id) {
        navigator(`/update-employee/${id}`);
    }

    function removeEmployee(id) {
        console.log("Delete employee with ID:", id);
        deleteEmployee(id).then((response) => {
                    getAllEmployees();    

        }).catch(error => {
            console.error("There was an error deleting the employee!", error);
            alert("Failed to delete employee. Please try again.");
        })
    }

  return (
    <div className='container'>
        <h2>List of Employees</h2>
        <button  className="btn btn-dark mb-2" style={{marginBottom: '10px'}} onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email ID</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        employees.map(employee => 
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>      
                                    <button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)}
                                        style={{marginLeft: '10px'}}
                                        >Remove</button>
                                </td>
                            </tr>
                        )
                    }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent