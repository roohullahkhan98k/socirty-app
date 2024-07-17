import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ApproveResidents() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://192.168.0.109:8000/api/pending-service-providers');
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.put(`http://192.168.0.109:8000/api/approve-service-provider/${id}`);
      // Remove the approved request from the list
      setPendingRequests(pendingRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.put(`http://192.168.0.109:8000/api/reject-service-provider/${id}`);
      // Remove the rejected request from the list
      setPendingRequests(pendingRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#000' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #ccc', background: '#fff' }}>
        <h2>Approve ServiceProviders</h2>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', textDecoration: 'none', color: '#2980b9', borderRadius: '5px', border: '1px solid #2980b9', backgroundColor: 'transparent', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Service Providers Waiting for Approval</h3>
        <div style={{ backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          {pendingRequests.map(request => (
            <div key={request._id} style={{ marginBottom: '20px' }}>
              <h4>{request.email}</h4>
              <p>Profession: {request.profession}</p>
              <p>Contact: {request.contact}</p>
              <button onClick={() => approveRequest(request._id)} style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Approve</button>
              <button onClick={() => rejectRequest(request._id)} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}>Reject</button>
            </div>
          ))}
          {pendingRequests.length === 0 && <p>No service providers waiting for approval.</p>}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #ccc', background: '#fff' }}>
        <Link to="/" style={{ padding: '10px 20px', textDecoration: 'none', color: '#2980b9', borderRadius: '5px', border: '1px solid #2980b9' }}>Logout</Link>
      </div>
    </div>
  );
}

export default ApproveResidents;
