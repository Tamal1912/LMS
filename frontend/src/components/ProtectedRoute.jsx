import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();
    const userType = localStorage.getItem('userType');

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(userType)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute; 