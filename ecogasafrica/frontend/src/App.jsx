// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout'; // We'll create this
import Home from './pages/Home';
import Kits from './pages/Kits';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PostEditor from './pages/PostEditor';
import KitEditor from './pages/KitEditor';
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="kits" element={<Kits />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/posts/new" element={<PostEditor />} />
            <Route path="admin/posts/edit/:id" element={<PostEditor />} />
            <Route path="admin/kits/new" element={<KitEditor />} />
            <Route path="admin/kits/edit/:id" element={<KitEditor />} />
          </Route>
          {/* Add other protected routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;