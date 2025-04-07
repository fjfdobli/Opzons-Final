import React, { useState, useEffect } from 'react';
import supabase from '../service/supabaseService';
import './Client.css';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentClient, setCurrentClient] = useState({
    name: '',
    contact_person: '',
    mobile_number: '',
    email: '',
    street_address: '',
    barangay: '',
    city_municipality: '',
    province: '',
    zip_code: '',
    client_type: 'Walk-in',
    common_orders: '',
    payment_terms: 'Cash',
    tin: '',
  });

  // Client types and payment terms options
  const clientTypes = ['Walk-in', 'Small Business', 'Corporate', 'Government'];
  const paymentTerms = ['Cash', '15 Days', '30 Days', 'COD'];

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('name', { ascending: true });
          
        if (error) throw error;
        
        setClients(data || []);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Could not fetch clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient({
      ...currentClient,
      [name]: value
    });
  };

  // Open form for adding new client
  const handleAddNew = () => {
    setCurrentClient({
      name: '',
      contact_person: '',
      mobile_number: '',
      email: '',
      street_address: '',
      barangay: '',
      city_municipality: '',
      province: '',
      zip_code: '',
      client_type: 'Walk-in',
      common_orders: '',
      payment_terms: 'Cash',
      tin: '',
    });
    setFormMode('add');
    setShowForm(true);
  };

  // Open form for editing client
  const handleEdit = (client) => {
    setCurrentClient(client);
    setFormMode('edit');
    setShowForm(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formMode === 'add') {
        // Add new client
        const { data, error } = await supabase
          .from('clients')
          .insert([currentClient])
          .select();
          
        if (error) throw error;
        
        setClients([...clients, data[0]]);
      } else {
        // Update existing client
        const { data, error } = await supabase
          .from('clients')
          .update(currentClient)
          .eq('id', currentClient.id)
          .select();
          
        if (error) throw error;
        
        setClients(clients.map(c => c.id === currentClient.id ? data[0] : c));
      }
      
      setShowForm(false);
    } catch (err) {
      console.error('Error saving client:', err);
      alert(`Error saving client: ${err.message}`);
    }
  };

  // Handle client deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setClients(clients.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting client:', err);
      alert(`Error deleting client: ${err.message}`);
    }
  };

  // Close form
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="client-page">
      <div className="page-header">
        <h1>Clients</h1>
        <button className="add-button" onClick={handleAddNew}>
          <i className="fas fa-plus"></i> Add New Client
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {/* Client Form */}
      {showForm && (
        <div className="form-container">
          <h2>{formMode === 'add' ? 'Add New Client' : 'Edit Client'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Client Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentClient.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact_person">Contact Person</label>
                <input
                  type="text"
                  id="contact_person"
                  name="contact_person"
                  value={currentClient.contact_person}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  value={currentClient.mobile_number}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentClient.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="street_address">Street Address</label>
                <input
                  type="text"
                  id="street_address"
                  name="street_address"
                  value={currentClient.street_address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="barangay">Barangay</label>
                <input
                  type="text"
                  id="barangay"
                  name="barangay"
                  value={currentClient.barangay}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city_municipality">City/Municipality</label>
                <input
                  type="text"
                  id="city_municipality"
                  name="city_municipality"
                  value={currentClient.city_municipality}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={currentClient.province}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="zip_code">Zip Code</label>
                <input
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  value={currentClient.zip_code}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="client_type">Client Type</label>
                <select
                  id="client_type"
                  name="client_type"
                  value={currentClient.client_type}
                  onChange={handleInputChange}
                >
                  {clientTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="payment_terms">Payment Terms</label>
                <select
                  id="payment_terms"
                  name="payment_terms"
                  value={currentClient.payment_terms}
                  onChange={handleInputChange}
                >
                  {paymentTerms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="tin">TIN</label>
                <input
                  type="text"
                  id="tin"
                  name="tin"
                  value={currentClient.tin}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="common_orders">Common Orders</label>
                <textarea
                  id="common_orders"
                  name="common_orders"
                  value={currentClient.common_orders}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                {formMode === 'add' ? 'Add Client' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Client List */}
      <div className="client-list">
        {loading ? (
          <div className="loading">Loading clients...</div>
        ) : clients.length === 0 ? (
          <div className="empty-state">
            <p>No clients found. Click "Add New Client" to create one.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Contact Person</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Client Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.contact_person || '-'}</td>
                  <td>{client.mobile_number || '-'}</td>
                  <td>{client.email || '-'}</td>
                  <td>{client.client_type}</td>
                  <td className="actions">
                    <button className="edit-button" onClick={() => handleEdit(client)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(client.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Client;