import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

function ServiceProvidersPage() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get('http://192.168.0.109:8000/ServiceProvider');
        const sortedProviders = response.data.sort((a, b) => {
          if (a.profession < b.profession) return -1;
          if (a.profession > b.profession) return 1;
          return 0;
        });
        setServiceProviders(sortedProviders);
        setFilteredProviders(sortedProviders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching service providers:', error);
        setIsLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://192.168.0.109:8000/ServiceProvider/${email}`);
      setServiceProviders(serviceProviders.filter(serviceProvider => serviceProvider.email !== email));
      setFilteredProviders(filteredProviders.filter(serviceProvider => serviceProvider.email !== email));
    } catch (error) {
      console.error('Error deleting service provider:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = serviceProviders.filter(provider => provider.email.toLowerCase().includes(query.toLowerCase()));
    setFilteredProviders(filtered);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#000', padding: '20px' }}>
      <h1 style={{ color: '#2980b9', marginBottom: '20px' }}>List of Service Providers</h1>
      <input type="text" placeholder="Search by email..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '80%' }} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, width: '80%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          {filteredProviders.map((serviceProvider, index) => (
            <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1' }}>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Email: <span style={{ fontWeight: 'normal' }}>{serviceProvider.email}</span></p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Profession: <span style={{ fontWeight: 'normal' }}>{serviceProvider.profession}</span></p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Contact: <span style={{ fontWeight: 'normal' }}>{serviceProvider.contact}</span></p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Password: <span style={{ fontWeight: 'normal' }}>{serviceProvider.password}</span></p>
              </div>
              <button onClick={() => handleDelete(serviceProvider.email)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaTrash style={{ marginRight: '5px' }} /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
}

export default ServiceProvidersPage;
