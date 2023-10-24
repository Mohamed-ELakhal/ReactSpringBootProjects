import { useLoaderData, json, redirect } from 'react-router-dom';
import { Link, useSubmit } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';



function ListEmployeeComponent() {
  const employees = useLoaderData();
  const submit = useSubmit();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    setLoading(false);
    },[employees]);
  

  function startDeleteHandler(e, id) {
    e.preventDefault();

    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      setLoading(true); // Set loading to true when delete starts

      submit({ empid: id }, { method: 'delete' })
    }
  }


  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  return (
    <div className='container'>
            <Link to={"/add-employee"} className='btn btn-primary mb-2 mt-3' >Add Employee</Link>
            <h2 className='text-center mb-4'>List Employee</h2>
            <table className='table table-bordered table striped'>
                <thead>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr  id={employee.id} key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link className='btn btn-info'  to={`/add-employee/${employee.id}`}>Update</Link>
                                <button  disabled={loading}    onClick={(e) => startDeleteHandler(e, employee.id)}   className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>

  );
}

export default ListEmployeeComponent;

export async function loader() {
  const response = await fetch('http://localhost:8080/employee');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function action({params,request}) {
  const data= await request.formData();
  const empid = data.get('empid');
  const response = await fetch('http://localhost:8080/employee'+"/" +empid,{
    method:request.method,
  });

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    
    return redirect('/employee');
  }
}