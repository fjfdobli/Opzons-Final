import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [ordersOpen, setOrdersOpen] = useState(false);

  const toggleOrders = () => {
    setOrdersOpen(!ordersOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Opzon ERP</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link>
        
        <Link to="/clients" className={`nav-item ${isActive('/clients')}`}>
          <i className="fas fa-users"></i> Clients
        </Link>
        
        <div className={`nav-dropdown ${ordersOpen ? 'open' : ''}`}>
          <div className="nav-item dropdown-toggle" onClick={toggleOrders}>
            <i className="fas fa-shopping-cart"></i> Orders
            <i className={`fas fa-chevron-down arrow ${ordersOpen ? 'rotated' : ''}`}></i>
          </div>
          <div className="dropdown-menu">
            <Link to="/order-requests" className={`dropdown-item ${isActive('/order-requests')}`}>
              Order Requests
            </Link>
            <Link to="/client-orders" className={`dropdown-item ${isActive('/client-orders')}`}>
              Client Orders
            </Link>
          </div>
        </div>
        
        <Link to="/inventory" className={`nav-item ${isActive('/inventory')}`}>
          <i className="fas fa-boxes"></i> Inventory
        </Link>
        
        <Link to="/suppliers" className={`nav-item ${isActive('/suppliers')}`}>
          <i className="fas fa-truck"></i> Suppliers
        </Link>
        
        <Link to="/employees" className={`nav-item ${isActive('/employees')}`}>
          <i className="fas fa-user-tie"></i> Employees
        </Link>
        
        <Link to="/attendance" className={`nav-item ${isActive('/attendance')}`}>
          <i className="fas fa-clipboard-check"></i> Attendance
        </Link>
        
        <Link to="/payroll" className={`nav-item ${isActive('/payroll')}`}>
          <i className="fas fa-money-bill-wave"></i> Payroll
        </Link>
        
        <Link to="/machinery" className={`nav-item ${isActive('/machinery')}`}>
          <i className="fas fa-print"></i> Machinery
        </Link>
        
        <Link to="/reports" className={`nav-item ${isActive('/reports')}`}>
          <i className="fas fa-chart-bar"></i> Reports
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;