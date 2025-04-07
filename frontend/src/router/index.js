import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import Layout from '../components/Layout';
import Dashboard from '../views/Dashboard';
import Client from '../views/Client';
import Supplier from '../views/Supplier';
import Inventory from '../views/Inventory';
import Machinery from '../views/Machinery';
import Reports from '../views/Reports';
import Employee from '../views/employees/Employee';
import Attendance from '../views/employees/Attendance';
import Payroll from '../views/employees/Payroll';
import ClientOrder from '../views/orders/clientOrder';
import OrderRequest from '../views/orders/orderRequest';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Client />} />
        <Route path="suppliers" element={<Supplier />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="machinery" element={<Machinery />} />
        <Route path="reports" element={<Reports />} />
        <Route path="employees" element={<Employee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="client-orders" element={<ClientOrder />} />
        <Route path="order-requests" element={<OrderRequest />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;