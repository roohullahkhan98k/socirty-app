import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

function ResidentsPage() {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://192.168.0.109:8000/users');
        const sortedResidents = response.data.sort((a, b) => {
          if (a.email < b.email) return -1;
          if (a.email > b.email) return 1;
          return 0;
        });
        setResidents(sortedResidents);
        setFilteredResidents(sortedResidents);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setIsLoading(false);
      }
    };

    fetchResidents();
  }, []);

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://192.168.0.109:8000/users/${email}`);
      setResidents(residents.filter(resident => resident.email !== email));
      setFilteredResidents(filteredResidents.filter(resident => resident.email !== email));
    } catch (error) {
      console.error('Error deleting resident:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = residents.filter(resident => resident.email.toLowerCase().includes(query.toLowerCase()));
    setFilteredResidents(filtered);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#000', padding: '20px' }}>
      <h1 style={{ color: '#2980b9', marginBottom: '20px' }}>List of Residents</h1>
      <input type="text" placeholder="Search by email..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '80%' }} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, width: '80%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          {filteredResidents.map((resident, index) => (
            <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Email: <span style={{ fontWeight: 'normal' }}>{resident.email}</span></p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Password: <span style={{ fontWeight: 'normal' }}>{resident.password}</span></p>
              </div>
              <button onClick={() => handleDelete(resident.email)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaTrash style={{ marginRight: '5px' }} /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResidentsPage;
