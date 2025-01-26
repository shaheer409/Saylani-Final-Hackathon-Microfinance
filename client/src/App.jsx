import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LandingPage from "./Components/LandingPage";
import LoanDetails from "./components/LoanDetails";
import Registration from "./components/Registration";
import Login from "./components/Login";
import LoanRequestForm from "./components/LoanRequestForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Header from "./Components/Header";

// Dummy user object (Replace this with your actual authentication logic)
const mockUser = {
  isLoggedIn: true, // Change to false to simulate logged-out state
  isAdmin: false, // Change to true to simulate an admin user
};

function App() {
  const [user, setUser] = useState(mockUser);

  // Protected route for users
  const ProtectedUserRoute = ({ children }) => {
    if (!user.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    if (user.isAdmin) {
      return <Navigate to="/admin-dashboard" replace />;
    }
    return children;
  };

  // Protected route for admins
  const ProtectedAdminRoute = ({ children }) => {
    if (!user.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    if (!user.isAdmin) {
      return <Navigate to="/user-dashboard" replace />;
    }
    return children;
  };

  return (
    <Router>
        <Header />
      <Routes>
        {/* Public routes */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loan-details/:category" element={<LoanDetails />} />

        {/* Protected user routes */}
        <Route
          path="/loan-request"
          element={
            <ProtectedUserRoute>
              <LoanRequestForm />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedUserRoute>
              <UserDashboard />
            </ProtectedUserRoute>
          }
        />

        {/* Protected admin routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
