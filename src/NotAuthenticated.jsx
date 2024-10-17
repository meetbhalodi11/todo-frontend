

import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NotAuthenticated = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

export default NotAuthenticated