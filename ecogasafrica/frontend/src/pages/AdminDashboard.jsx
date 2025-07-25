// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth'; // To get user info for display

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'kits', 'messages'
  const [posts, setPosts] = useState([]);
  const [kits, setKits] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'posts') {
          const res = await api.get('/posts');
          setPosts(res.data);
        } else if (activeTab === 'kits') {
          const res = await api.get('/kits');
          setKits(res.data);
        } else if (activeTab === 'messages') {
          const res = await api.get('/contact');
          setMessages(res.data);
        }
      } catch (err) {
        setError('Failed to load data for this section.');
        console.error('Admin Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]); // Refetch when tab changes

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        setError('Failed to delete post.');
        console.error('Delete post error:', err);
      }
    }
  };

  const handleDeleteKit = async (id) => {
    if (window.confirm('Are you sure you want to delete this kit?')) {
      try {
        await api.delete(`/kits/${id}`);
        setKits(kits.filter(kit => kit._id !== id));
      } catch (err) {
        setError('Failed to delete kit.');
        console.error('Delete kit error:', err);
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact/${id}`);
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        setError('Failed to delete message.');
        console.error('Delete message error:', err);
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-green-900 text-center mb-8">Admin Dashboard</h1>
      <p className="text-center text-gray-700 mb-8">
        Welcome, {user?.username || 'Admin'}! Manage your content, products, and messages here.
      </p>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'posts'
              ? 'border-b-4 border-green-600 text-green-800'
              : 'text-gray-600 hover:text-green-800'
          }`}
        >
          Blog Posts
        </button>
        <button
          onClick={() => setActiveTab('kits')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'kits'
              ? 'border-b-4 border-green-600 text-green-800'
              : 'text-gray-600 hover:text-green-800'
          }`}
        >
          Biogas Kits
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'messages'
              ? 'border-b-4 border-green-600 text-green-800'
              : 'text-gray-600 hover:text-green-800'
          }`}
        >
          Messages
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="mt-8">
          {/* Posts Tab Content */}
          {activeTab === 'posts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-800">Manage Blog Posts</h2>
                <Link
                  to="/admin/posts/new"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold shadow-md"
                >
                  Add New Post
                </Link>
              </div>
              {posts.length === 0 ? (
                <p className="text-gray-600 text-center">No blog posts found.</p>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{new Date(post.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link to={`/admin/posts/edit/${post._id}`} className="text-green-600 hover:text-green-900 mr-3">Edit</Link>
                            <button onClick={() => handleDeletePost(post._id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Kits Tab Content */}
          {activeTab === 'kits' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-800">Manage Biogas Kits</h2>
                <Link
                  to="/admin/kits/new"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold shadow-md"
                >
                  Add New Kit
                </Link>
              </div>
              {kits.length === 0 ? (
                <p className="text-gray-600 text-center">No biogas kits found.</p>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {kits.map((kit) => (
                        <tr key={kit._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{kit.name}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">₦{kit.price.toLocaleString()}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link to={`/admin/kits/edit/${kit._id}`} className="text-green-600 hover:text-green-900 mr-3">Edit</Link>
                            <button onClick={() => handleDeleteKit(kit._id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab Content */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">Contact Messages</h2>
              {messages.length === 0 ? (
                <p className="text-gray-600 text-center">No contact messages received.</p>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Received
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message) => (
                        <tr key={message._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{message.name}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{message.email}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900">{message.message.substring(0, 50)}...</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{new Date(message.timestamp).toLocaleDateString()}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button onClick={() => handleDeleteMessage(message._id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;