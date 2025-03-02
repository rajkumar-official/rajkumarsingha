import { Navigate } from 'react-router-dom';

const MaintainerProtectedRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user'));
    return (isLoggedIn && user?.User?.role === 'admin') ? element : <Navigate to="/login" replace />;
};

export default MaintainerProtectedRoute;
