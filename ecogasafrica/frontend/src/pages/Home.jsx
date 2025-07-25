// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import KitCard from '../components/KitCard';
import Loader from '../components/Loader';
import api from '../api';

const Home = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [featuredKits, setFeaturedKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, kitsRes] = await Promise.all([
          api.get('/posts?limit=3'), // Get latest 3 posts
          api.get('/kits?limit=3'),   // Get featured 3 kits
        ]);
        setLatestPosts(postsRes.data);
        setFeaturedKits(kitsRes.data);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-center py-20 px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fadeInDown">EcoGas Africa</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fadeInUp">
          Empowering communities through sustainable biogas energy and waste conversion innovation.
        </p>
        <Link to="/kits" className="inline-block bg-white text-green-800 hover:bg-green-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
          Explore Our Kits
        </Link>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">What We Do</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            EcoGasAfrica is dedicated to pioneering sustainable energy solutions across the continent. We design,
            develop, and distribute innovative biogas digester kits, turning organic waste into clean energy
            and valuable fertilizer. Join us in building a greener, healthier Africa.
          </p>
          <Link to="/about" className="mt-8 inline-block text-green-600 hover:underline">Learn More About Us &rarr;</Link>
        </div>
      </section>

      {/* Featured Kits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">Our Biogas Kits</h2>
          {featuredKits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredKits.map(kit => (
                <KitCard key={kit._id} kit={kit} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No kits available at the moment. Please check back later!</p>
          )}
          <div className="text-center mt-10">
            <Link to="/kits" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md">
              View All Kits
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">Latest from Our Blog</h2>
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map(post => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No blog posts yet. Stay tuned for updates!</p>
          )}
          <div className="text-center mt-10">
            <Link to="/blog" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md">
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Go Green?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact us today to learn more about our solutions or to get a custom quote for your biogas needs.
        </p>
        <Link to="/contact" className="inline-block bg-white text-green-800 hover:bg-green-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
          Get in Touch
        </Link>
      </section>
    </>
  );
};

export default Home;