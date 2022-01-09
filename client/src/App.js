import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Message from './pages/message';
import Reset from './pages/reset';
import Home from './pages/home';
import Active from './pages/active';

import { refreshToken } from './redux/actions/authAction';

import './App.css';

function App() {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={!auth.token ? <Forgot /> : <Home />} />
        <Route path="/" element={auth.token ? <Home /> : <Login />} />
        <Route path="/message" element={<Message />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/active/:token" element={<Active />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
