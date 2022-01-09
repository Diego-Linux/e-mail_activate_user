import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Img from '../img/msg.svg';

const Message = () => {
    if (sessionStorage.getItem("emailSent")) {
        toast.success('E-mail successfuly sent!');
        sessionStorage.removeItem("emailSent");
    }

    const navigate = useNavigate();
    
    const toLogin = () => {
        navigate('/login');
    }
    return (
        <>
            <div className="auth-container">
                <div className="auth-left">
                <ToastContainer
                        toastStyle={{
                            color: '#fff', fontWeight: 'bold',
                        }} />
                    <h1>Ok, check your e-mail now!</h1>
                    <img src={Img} />
                </div>
                <div className="auth-right minimal">
                    <div className="input-div">
                        <button onClick={toLogin}>Back to login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Message;