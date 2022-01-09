import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authAction"
import '@fortawesome/fontawesome-free/css/all.min.css';

import ProfileIcon from '../img/auth.svg';

const Menu = () => {
    const dispatch = useDispatch();
    const [showmenu, setShowMenu] = useState(false);

    const showProfileMenu = () => setShowMenu(!showmenu)

    const userLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            <header>
                <div className="header_left">
                    {/* <label htmlFor="check">
                        <i className="fas fa-bars" id="showmenu_btn"></i>
                    </label>
                    <img
                        src={Logo}
                        className="header_logo"
                    /> */}
                    <a href="#" className="logo-codent">Codent</a>
                </div>
                <div className="header_right">
                    <div className="part_one">
                    </div>
                    <div className="part_two">
                        <img
                            src={ProfileIcon}
                            alt=""
                            className="img-user-icon"
                            onClick={showProfileMenu}
                        />
                        <h4>Diego Oliveira</h4>
                        {showmenu && (
                            <div className="user-menu">

                                <p>Olá, Diego</p>

                                <div className="user-menu-links">
                                    <ul>
                                        <li><i className="fas fa-user"></i><a href="#">Meu Perfil</a></li>
                                        <li><i className="fas fa-cog"></i><a href="#">Configurações</a></li>
                                        <li><i className="fas fa-sign-out-alt"></i><a href="#" onClick={userLogout}>Sair</a></li>
                                    </ul>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Menu;