import React, {useEffect, useState} from 'react'
import { createEmployees,getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate,useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')  
    const [lastName, setLastName] = useState('')    
    const [email, setEmail] = useState('')

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            // Fetch employee data by id if updating
             getEmployeeById(id).then((response) => {
                 setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                 setEmail(response.data.email);
             }).catch((error) => {
                console.error("There was an error fetching the employee!", error);
                alert("Failed to fetch employee data. Please try again.");});
        }
    }, [id]);
    
    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName, lastName, email};
            console.log(employee); 
            
            if (id) {
                updateEmployee(id, employee).then((response) =>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch((error) => {
                     console.error("There was an error updating the employee!", error);
                alert("Failed to update employee. Please try again.");
                })
            } else {
                 createEmployees(employee).then((response) => {
                console.log(response.data);
                alert("Employee added successfully");
                navigator('/employees'); 
            }).catch((error) => {
                console.error("There was an error creating the employee!", error);
                alert("Failed to add employee. Please try again.");
            });
            }  
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors};
        if (firstName.trim()) {
            errorsCopy.firstName = '';  
        } else {
             errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
             errorsCopy.lastName = 'Last name is required';
            valid = false;
           
        }
        if (email.trim()) {
            errorsCopy.email = '';
        }else {
            errorsCopy.email = 'Email is required';
            valid = false;  
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update  Employee</h2>
        }else {
            return <h2 className='text-center'>Add  Employee</h2>

        }
    }
  return (
    <div>
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                {
                    pageTitle()
                }                    
                <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                type='text'
                                placeholder='Enter employee first name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                                >  
                                </input>
                                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                            </div>

                             <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                type='text'
                                placeholder='Enter employee last name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={(e) => setLastName(e.target.value)}
                                >  
                                </input>
                                    {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}

                            </div>

                             <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                type='text'
                                placeholder='Enter employee mail id'
                                name='email'
                                value={email}
                                className= {`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                                >  
                                </input>
                                    {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>
                            <button className='btn btn-success' style={{marginTop: '10px'}}onClick={saveOrUpdateEmployee}>Save</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent
