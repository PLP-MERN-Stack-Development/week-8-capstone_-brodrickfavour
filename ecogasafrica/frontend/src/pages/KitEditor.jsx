// frontend/src/pages/KitEditor.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader';

const KitEditor = () => {
  const { id } = useParams(); // For editing existing kits
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '', // Existing image URL if editing
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchKit = async () => {
        setLoading(true);
        try {
          const { data } = await api.get(`/kits/${id}`);
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
          });
        } catch (err) {
          setError('Failed to load kit for editing.');
          console.error('Error fetching kit:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchKit();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const kitData = new FormData();
    kitData.append('name', formData.name);
    kitData.append('description', formData.description);
    kitData.append('price', formData.price);

    if (imageFile) {
      kitData.append('image', imageFile); // 'image' should match the field name in multer middleware
    } else if (formData.imageUrl && !imageFile && isEditing) {
      // If editing and no new file, but existing image, ensure it's still sent or handled
      // kitData.append('imageUrl', formData.imageUrl);
    }

    try {
      if (isEditing) {
        await api.put(`/kits/${id}`, kitData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
      } else {
        await api.post('/kits', kitData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
      }
      navigate('/admin'); // Redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save kit.');
      console.error('Kit submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing && !formData.name) return <Loader />; // Show loader only when initially fetching data for edit

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-8">
          {isEditing ? 'Edit Biogas Kit' : 'Add New Biogas Kit'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Kit Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₦)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="any"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {formData.imageUrl && !imageFile && (
              <p className="mt-2 text-sm text-gray-500">Current image: <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">View Image</a></p>
            )}
            {uploadingImage && <Loader />}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-500"
              disabled={loading}
            >
              {loading ? <Loader /> : (isEditing ? 'Update Kit' : 'Create Kit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KitEditor;