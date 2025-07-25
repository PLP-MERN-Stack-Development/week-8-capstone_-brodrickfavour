// frontend/src/components/KitCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const KitCard = ({ kit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <img src={kit.imageUrl || '/images/default-kit.jpg'} alt={kit.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-2">{kit.name}</h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{kit.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-green-700">₦{kit.price.toLocaleString()}</span>
          <Link to={`/kits/${kit._id}`} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KitCard;