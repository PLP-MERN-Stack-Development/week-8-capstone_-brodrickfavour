// frontend/src/components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <img src={post.imageUrl || '/images/default-blog.jpg'} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-2">{post.title}</h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post.content}</p>
        <Link to={`/blog/${post._id}`} className="text-green-600 hover:underline font-medium">Read More</Link>
      </div>
    </div>
  );
};

export default BlogCard;