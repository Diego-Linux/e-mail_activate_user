import { postDataAPI, putDataAPI } from '../../utils/fetchData';
import { TYPES } from './types';
import passwordValid from '../../utils/passwordValid';
import { toast } from 'react-toastify';

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('auth/login', data)
        dispatch({
            type: TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem("firstLogin", true)
        dispatch({
            type: TYPES.ALERT,
            payload: {
                success: res.data.message
            }
        })
    } catch (err) {
        dispatch({
            type: TYPES.ALERT,
            payload: {
                error: toast.error(err.response.data.error)
            }
        })
    }
}

export const register = (data) => async (dispatch) => {
    const check = passwordValid(data)
    if (check.errorLength > 0) {
        return dispatch({ type: TYPES.ALERT, payload: check.error })
    }

    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('auth/create', data)
        dispatch({
            type: TYPES.AUTH,
            payload: {
                success: res.data.message
            }
        })
        window.location.href = ("/message");
    } catch (err) {
        dispatch({
            type: TYPES.ALERT,
            payload: {
                error: toast.error(err.response.data.error)
            }
        })
    }
}

export const forgot = (data) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } })
        const res = await putDataAPI('auth/forgot-password', data)
        dispatch({
            type: TYPES.AUTH,
            payload: {
                success: res.data.message
            }
        })
        sessionStorage.setItem("emailSent", true)
        window.location.href = ("/message");
    } catch (err) {
        dispatch({
            type: TYPES.ALERT,
            payload: {
                error: toast.error(err.response.data.error)
            }
        })
    }
}

export const reset = (data) => async (dispatch) => {
    const check = passwordValid(data)
    if (check.errorLength > 0) {
        return dispatch({ type: TYPES.ALERT, payload: check.error })
    }
    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } })
        const res = await putDataAPI('auth/reset-password', data)
        dispatch({
            type: TYPES.AUTH,
            payload: {
                success: res.data.message
            }
        })
        sessionStorage.setItem("passwordChanged", true)
        window.location.href = ("/login");
    } catch (err) {
        dispatch({
            type: TYPES.ALERT,
            payload: {
                error: toast.error(err.response.data.error)
            }
        })
    }
}

export const active = (data) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('auth/activate', data)
        dispatch({
            type: TYPES.AUTH,
            payload: {
                success: res.data.message
            }
        })
        window.location.href = ("/login");
    } catch (err) {
        dispatch({
            type: TYPES.ALERT,
            payload: {
                error: toast.error(err.response.data.error)
            }
        })
    }
}


export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } })

        try {
            const res = await postDataAPI('auth/refresh_token')
            dispatch({
                type: TYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

            dispatch({ type: TYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({
                type: TYPES.ALERT,
                payload: {
                    error: toast.error(err.response.data.error)
                }
            })
        }
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('auth/logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: TYPES.ALERT,
            payload: {
                error: toast.error(err.response.data.error)
            }
        })
    }
}