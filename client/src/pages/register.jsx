import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Img from '../img/auth.svg';
import '../styles/auth.css';

const Register = () => {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [userData, setUserData] = useState(initialState)
    const { username, email, password, confirmPassword } = userData;

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if (auth.token) navigate("/")
    }, [auth.token, navigate])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }
    return (
        <>
            <div className="auth-container">
                <div className="auth-left">
                    {/* <h1>Login and join our team!</h1> */}
                    <img src={Img} />
                </div>
                <div className="auth-right">
                    <ToastContainer
                        toastStyle={{
                            color: '#fff', fontWeight: 'bold',
                        }} />
                    <h2>Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-div">
                            <label for="user">Your username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                onChange={handleChangeInput}
                                value={username}
                            />
                            <i className="fas fa-user" />
                        </div>
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
                            <label for="password">Password</label>
                            <input
                                type={typePass ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Enter your password"
                                onChange={handleChangeInput}
                                value={confirmPassword}
                            />
                            <i className="fas fa-key" />
                        </div>
                        <div className="input-div">
                            <button
                                type="submit"
                                disabled={email && username
                                    && password && confirmPassword ? false : true}
                            >Create</button>
                        </div>
                    </form>
                    <div className="input-div">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;