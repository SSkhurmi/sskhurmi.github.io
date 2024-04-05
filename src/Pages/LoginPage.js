import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/loginStyle/Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../redux/action/userBookActions';


function Login() {
    const [ userValue,setUserValue] = useState(); 
    const userDetails = useSelector((state) => state.alldata);
    const { userData } = userDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userData.length) {
            dispatch(showUser());
        }
        let loggedUser = localStorage.getItem("loggedin");
        if (loggedUser) {
            navigate("/home");
        }
    }, [])

    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const { username, password } = input
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

    function handleLogin(e) {
        e.preventDefault();
        let error = {};
        if (username == 0) {
            error.name = '*Name is required';
        } else if (username.length < 2) {
            error.name = '*Name is greater than 2';
        }
        if (password == 0) {
            error.password = '*Password is required';
        } else if (password.length < 4) {
            error.password = '*Password must be at least 6 characters long';
        }

        if (Object.keys(error).length === 0) {
            userData.forEach((val) => {
                 if (username.toLowerCase() === (val.username.toLowerCase()) && password === (val.password)) {
                    localStorage.setItem("loggedin","true");
                    localStorage.setItem("username",val.username);
                    localStorage.setItem("useremail",val.email);
                    localStorage.setItem("userrole",val.userRole);
                    setUserValue(val);
                    navigate("/home");
                }
                else {
                    error.invalid = '*Invalid Username or Password';
                    setErrors(error);
                }
            })   
        }
        else {
                setErrors(error);
            }
    }

    return (
        <>
            <div className="form-container">
                <div className="form-section">
                    <h1>Wellcome to Library</h1>
                    <form onSubmit={handleLogin} className="my-form">
                        <p>LogIn</p>
                        <input type="text" name="username" value={username} onChange={getValue} className="input-name" placeholder='Username' />
                        <br />
                        <span>{errors.name}</span>
                        <br />
                        <input type="password" name="password" value={password} onChange={getValue} className="input-name" placeholder='Password' />
                        <br />
                        <span>{errors.password}</span>
                        <span>{errors.invalid}</span>
                        <br />
                        <button type='submit' className="form-btn">LogIn</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
