import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import LeftMenuBar from '../components/LeftMenuBar'
import { useNavigate } from 'react-router-dom';
import "../style/allReaderStyle/AllReader.css"
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/action/userBookActions';
import { Button, Input, Select } from 'antd';
import TopMenuBar from '../components/TopMenuBar';

function Userform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let loggedUser = localStorage.getItem("loggedin");
    if (!loggedUser) {
      navigate("/login");
    }
  })

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    userRole: ""
  });
  const [errors, setErrors] = useState({});

  function getValue(e) {
    let name = e.target.name;
    let value = e.target.value;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  function handleRoleChange(value) {
    setInput({
      ...input,
      userRole: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let errors = {};
    let namePattern = (/^[A-Za-z$]/);
    if (input.username == 0) {
      errors.name = '*Name is required';
    } else if (!namePattern.test(input.username)) {
      errors.name = '*Name is invalid'
    }
    let emailPattern = (/^[A-Za-z._0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/);
    if (input.email == 0) {
      errors.email = '*Email is required';
    } else if (!emailPattern.test(input.email)) {
      errors.email = 'Email is invalid';
    }
    if (input.userRole == 0) {
      errors.role = '*User Role is required';
    } else if (!namePattern.test(input.userRole)) {
      errors.role = '*User Role is invalid'
    }
    if (input.password == 0) {
      errors.password = '*Password is required';
    } else if (input.password.length < 6) {
      errors.password = '*Password must be at least 6 characters long';
    }
    if (Object.keys(errors).length === 0) {
      setErrors("");
      dispatch(addUser(input));
      navigate("/allreader");
    } else {
      setErrors(errors);
    }

  }
  return (
    <>
      {<TopMenuBar />}
      <Header />
      <div className='component_section'>
        <LeftMenuBar />
        <div className="reader-form">
          <div className='reader-form-background-color'></div>
          <form  >
            <div>
              <h3>Create User</h3>
            </div>
            <label className="form-label">Name: </label>
            <Input type="text" name="username" value={input.username} placeholder='Name' onChange={getValue} className="form-control " id='name' />
            <span className='formerror'>{errors.name}</span>
            <br />
            <label className="form-label">Email: </label>
            <Input type="text" name="email" value={input.email} placeholder='Email' onChange={getValue} className="form-control" />
            <span className='formerror'>{errors.email}</span>
            <br />
            <label className="form-label">User Role: </label>
            <Select className='select-role'
              style={{ color: "black" }}
              defaultValue="Select role"
              value={input.userRole || undefined}
              onChange={handleRoleChange}
              options={[
                {
                  value: 'admin',
                  label: 'Admin',
                },
                {
                  value: 'reader',
                  label: 'Reader',
                }

              ]}
            />
            <span className='formerror'>{errors.role}</span>
            <br />
            <label for="password" className="form-label">Password: </label>
            <Input type="password" name="password" value={input.password} placeholder='Password' onChange={getValue} className="form-control" />
            <span className='formerror'>{errors.password}</span>
            <br />
            <Button type='primary' onClick={handleSubmit} className="reader-form-button">Create</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Userform