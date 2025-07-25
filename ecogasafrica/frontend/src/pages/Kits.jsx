// frontend/src/pages/Kits.jsx
import React, { useEffect, useState } from 'react';
import KitCard from '../components/KitCard';
import Loader from '../components/Loader';
import api from '../api';

const Kits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const response = await api.get('/kits');
        setKits(response.data);
      } catch (err) {
        setError('Failed to fetch kits.');
        console.error('Error fetching kits:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchKits();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-green-900 text-center mb-10">Our Biogas Kits</h1>
      {kits.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No biogas kits available at the moment. Please check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kits.map(kit => (
            <KitCard key={kit._id} kit={kit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Kits;