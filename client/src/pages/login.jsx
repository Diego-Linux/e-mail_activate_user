import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Img from '../img/auth.svg';
import '../styles/auth.css';

const Login = () => {
    if (sessionStorage.getItem("passwordChanged")) {
        toast.success('Password has successfuly changed!');
        sessionStorage.removeItem("passwordChanged");
    }
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.token) navigate("/")
    }, [auth.token, navigate]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (
        <>
            <div className="auth-container">
                <div className="auth-left">
                    {/* <h1>Login and join our team!</h1> */}
                    <img src={Img} />
                </div>
                <div className="auth-right">
                    <h2>Create Account</h2>
                    <ToastContainer
                        toastStyle={{
                            color: '#fff', fontWeight: 'bold',
                        }} />
                    <form onSubmit={handleSubmit}>
                        <div className="input-div">
                            <label for="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your e-mail"
                                onChange={handleChangeInput}
                                value={email}
                            />
                            <i className="fas fa-envelope" />
                        </div>
                        <div className="input-div">
                            <label for="password">Password</label>
                            <input
                                type={typePass ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChangeInput}
                                value={password}
                            />
                            <i className="fas fa-key" />
                        </div>
                        <div className="input-div">
                            <button 
                            type="submit"
                            disabled={email && password ? false : true}
                            >Access</button>
                        </div>
                    </form>
                    <div className="input-div">
                        <Link to="/forgot">Forgot your password?</Link>
                        <Link to="/register">Don't have an account? Register</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;