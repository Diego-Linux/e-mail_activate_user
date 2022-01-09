import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { forgot } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Img from '../img/forgot.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/auth.css';

const Forgot = () => {
    const initialState = { email: "" };
    const [userData, setUserData] = useState(initialState)
    const { email } = userData

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
        dispatch(forgot(userData))
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
                    <h3>Forgot password? enter your e-mail</h3>
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
                            <button
                                type="submit"
                                disabled={email ? false : true}
                            >Send</button>
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

export default Forgot;