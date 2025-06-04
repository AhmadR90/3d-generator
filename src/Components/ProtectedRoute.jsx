import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const userData = useSelector((state) => state.user.userData);

  if (!userData) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;