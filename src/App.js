import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About';
import CourseHome from './components/allcourses/CourseHome';
import Team from './components/team/Team';
import Pricing from './components/pricing/Pricing';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';
import Footer from './components/common/footer/Footer';
import Home from './components/home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Modulez from './components/allcourses/Modulez';
import './App.css';  // Ensure you have global styles imported here
import ParentComponent from './components/allcourses/Parentcomponent';
import Cart from './components/pricing/cart';
import Payment from './components/pricing/Payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import Assessment from './components/admin/Assessment';
import Leaderboard from './components/admin/Leaderboard';
import AdminSettings from './components/admin/Admins';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/courses" element={<CourseHome />} />
        <Route path="/team" element={<Team />} />
        <Route path="/enroll" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/journal" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coursecard" element={<CourseHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/module" element={<Modulez />} />
        <Route path="/enrolled" element={<ParentComponent />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
