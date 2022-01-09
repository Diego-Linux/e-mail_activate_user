import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { active } from '../redux/actions/authAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Img from '../img/msg.svg';

const Active = () => {
    const { token } = useParams();
    const dispatch = useDispatch();

    const initialState = { checkToken: token};
    const [userData, setUserData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(active(userData))
    }
    return (
        <>
            <div className="auth-container">
                <div className="auth-left">
                    <ToastContainer
                        toastStyle={{
                            color: '#fff', fontWeight: 'bold',
                        }} />
                    <h1>Ok, confirm your account!</h1>
                    <img src={Img} />
                </div>
                <div className="auth-right minimal">
                    <form onSubmit={handleSubmit}>
                        <div className="input-div">
                            <button type="submit">Confirm now</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Active;