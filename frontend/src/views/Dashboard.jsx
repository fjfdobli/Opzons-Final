import React, { useState, useEffect } from 'react';
import supabase from '../../src/service/supabaseService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    clientCount: 0,
    orderCount: 0,
    supplierCount: 0,
    employeeCount: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get client count
        const { count: clientCount, error: clientError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
          
        if (clientError) throw clientError;
        
        // Get other counts similarly
        // For now we'll use dummy data
        
        setStats({
          clientCount: clientCount || 0,
          orderCount: 15,
          supplierCount: 8,
          employeeCount: 12
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {loading ? (
        <div className="loading">Loading dashboard data...</div>
      ) : (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon client-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <h3>Total Clients</h3>
                <p className="stat-value">{stats.clientCount}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon order-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="stat-content">
                <h3>Active Orders</h3>
                <p className="stat-value">{stats.orderCount}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon supplier-icon">
                <i className="fas fa-truck"></i>
              </div>
              <div className="stat-content">
                <h3>Suppliers</h3>
                <p className="stat-value">{stats.supplierCount}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon employee-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="stat-content">
                <h3>Employees</h3>
                <p className="stat-value">{stats.employeeCount}</p>
              </div>
            </div>
          </div>
          
          {/* You can add more dashboard widgets here like recent orders, low inventory items, etc. */}
        </>
      )}
    </div>
  );
};

export default Dashboard;