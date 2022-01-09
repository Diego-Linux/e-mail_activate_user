import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { reset } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Img from '../img/reset.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/auth.css';

const Reset = () => {
    const { token } = useParams();
    const resetLink = token;
    const initialState = { password: "", confirmPassword: "", resetLink };
    const [userData, setUserData] = useState(initialState)
    const { password, confirmPassword } = userData

    const dispatch = useDispatch();

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(reset(userData))
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
                    <h3>Please enter your new password!</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input-div">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your new password"
                                onChange={handleChangeInput}
                                value={password}
                            />
                            <i className="fas fa-key" />
                        </div>
                        <div className="input-div">
                            <label for="password">Confirm password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your new password"
                                onChange={handleChangeInput}
                                value={confirmPassword}
                            />
                            <i className="fas fa-key" />
                        </div>
                        <div className="input-div">
                            <button type="submit">Send</button>
                        </div>
                    </form>
                    <div className="input-div">
                        <Link to="/login">Back to login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset;