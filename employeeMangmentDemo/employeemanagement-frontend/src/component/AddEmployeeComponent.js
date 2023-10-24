import React, { useState, useEffect } from "react";
import EmployeeService from "../service/EmployeeService";
import {
  Link,
  useLoaderData,
  useNavigate,
  useParams,
  json,
  redirect,
  Form,
} from "react-router-dom";

const AddEmployeeComponent = () => {
  /** Variables and method to collect and store inputes */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const res = useLoaderData();
  useEffect(() => {
    if (id) {
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setEmail(res.email);
    }
  }, []);

  const employeeData = { firstName, lastName, email }; //bundle the inpute from user

  /**send data to api and navigate when succesful */


  function tile() {
    if (id) {
      return "Update Employee";
    } else {
      return "Add Employee";
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h2 className="text-center">{tile()}</h2>
            <div className="card-body">
              <Form method={id ? "PUT" : "POST"}>
                <div className="form-group mb-2">
                  <input
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
                <button className="btn btn-success">Save</button>{" "}
                <Link to={"/employee"} className="btn btn-danger" href="">
                  Cancel
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;

export async function loader({ params }) {
  if (params.id) {
    const response = await fetch(
      "http://localhost:8080/employee" + "/" + params.id
    );
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: "Could not fetch events." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }
}

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  if (
    data.get("firstName") !== "" &&
    data.get("lastName") !== "" &&
    data.get("email") != ""
  ) {
    const eventData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
    };

    let url = "http://localhost:8080/employee";

    if (method === "PUT") {
      const empId = params.id;
      url = url+'/' + empId;
    }
    console.log(url);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }

    return redirect("/employee");
  } else {
    alert("Please, fill in all inputes");
  }
}
