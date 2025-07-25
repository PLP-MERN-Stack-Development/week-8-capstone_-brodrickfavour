// frontend/src/pages/BlogPostDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Loader from '../components/Loader';

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch blog post.');
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!post) return <div className="text-center text-gray-600 py-10">Post not found.</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
        <img src={post.imageUrl || '/images/default-blog.jpg'} alt={post.title} className="w-full h-80 object-cover rounded-xl mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-6">Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
        <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }}>
          {/* You might want a rich text editor like Draft.js or Quill for actual content formatting */}
        </div>
        <div className="mt-8 text-center">
          <Link to="/blog" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold">
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;