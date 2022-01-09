import { toast } from 'react-toastify';

const passwordValid = ({ password, confirmPassword }) => {
    const err = {}

    if (!password) {
        err.password = toast.error("Please add your password.")
    } else if (password.length < 6) {
        err.password = toast.error("Password must be at least 6 characters.")
    }

    if (password !== confirmPassword) {
        err.confirmPassword = toast.error("Password fields don't match.");
    }

    return {
        error: err,
        errorLength: Object.keys(err).length
    }
}

export default passwordValid;