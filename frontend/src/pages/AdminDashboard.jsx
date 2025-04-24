import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore.js';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader.jsx';
import { Link } from 'react-router-dom';
import { api } from '@/lib/utils.js';

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  // ...existing state variables...

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) return navigate('/adminLogin');

    try {
      const parsedAdminData = JSON.parse(adminData);
      setAdmin(parsedAdminData);
    } catch (error) {
      console.error('Error parsing admin data:', error);
      localStorage.removeItem('adminUser');
      navigate('/adminLogin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  // ...existing methods...

  if (!admin) {
    return (
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <Loader size={50} color="#60A5FA" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white font-sans px-4">
      <div className="max-w-7xl mx-auto py-10">
        <div className="bg-white/10 backdrop-blur-md shadow-xl p-6 flex justify-between items-center rounded-xl mb-8 mt-3 py-4 border border-white/20">
          <h1 className="text-4xl font-bold text-white tracking-wide">Admin Dashboard</h1>
        
          <Link to="/adminDashboard/allCourses"
           className="text-gray-200 hover:text-white transition duration-300">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition">
              All Courses
            </button>
          </Link>

          <Link to="/adminDashboard/allTeachers"
            className="text-gray-200 hover:text-white transition duration-300">
           <button 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">
              All Teachers
           </button>
           </Link>

           <Link to="/adminDashboard/allPosts"
            className='text-gray-200 hover:text-white transition duration-300'>
           <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md transition">  
             All Posts
           </button>
           </Link>

           <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 text-white mb-10">
          <h2 className="text-2xl font-semibold mb-4">👨‍💼 Admin Profile</h2>
          <p className="text-lg"><strong>Email:</strong> {admin.email}</p>
          <p className="text-lg"><strong>Role:</strong> {admin.role || 'Administrator'}</p>
        </div>
        
        {/* Admin Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Link to="/adminDashboard/allCourses" className="block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 h-full">
              <div className="text-4xl mb-4 text-blue-400">📚</div>
              <h3 className="text-2xl font-bold mb-2">Courses</h3>
              <p className="text-gray-300">Manage all courses on the platform</p>
            </div>
          </Link>
          
          <Link to="/adminDashboard/allTeachers" className="block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 h-full">
              <div className="text-4xl mb-4 text-green-400">👨‍🏫</div>
              <h3 className="text-2xl font-bold mb-2">Teachers</h3>
              <p className="text-gray-300">Manage all teachers on the platform</p>
            </div>
          </Link>
          
          <Link to="/adminDashboard/allPosts" className="block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 h-full">
              <div className="text-4xl mb-4 text-yellow-400">📝</div>
              <h3 className="text-2xl font-bold mb-2">Posts</h3>
              <p className="text-gray-300">Manage all posts on the platform</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
