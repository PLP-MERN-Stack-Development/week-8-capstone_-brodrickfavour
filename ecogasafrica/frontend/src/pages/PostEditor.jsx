// frontend/src/pages/PostEditor.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader';

const PostEditor = () => {
  const { id } = useParams(); // For editing existing posts
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
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
      const fetchPost = async () => {
        setLoading(true);
        try {
          const { data } = await api.get(`/posts/${id}`);
          setFormData({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
          });
        } catch (err) {
          setError('Failed to load post for editing.');
          console.error('Error fetching post:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
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

    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('content', formData.content);

    // If a new image file is selected, append it. Otherwise, use existing imageUrl.
    if (imageFile) {
      postData.append('image', imageFile); // 'image' should match the field name in multer middleware
    } else if (formData.imageUrl && !imageFile && isEditing) {
      // If editing and no new file, but existing image, ensure it's still sent or handled
      // For now, assume backend handles no image update if 'image' field is missing.
      // If your backend expects imageUrl specifically, add it:
      // postData.append('imageUrl', formData.imageUrl);
    }


    try {
      if (isEditing) {
        await api.put(`/posts/${id}`, postData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
      } else {
        await api.post('/posts', postData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
      }
      navigate('/admin'); // Redirect to admin dashboard after successful operation
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post.');
      console.error('Post submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing && !formData.title) return <Loader />; // Show loader only when initially fetching data for edit

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-8">
          {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              rows="8"
              value={formData.content}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            ></textarea>
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
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? <Loader /> : (isEditing ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;