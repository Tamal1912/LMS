
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useAdminStore} from '../store/useAdminStore.js';

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const {trackAllStudents, allStudents} = useAdminStore();

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    
   
    
    if (!adminData) {
      console.log('No admin data found, redirecting to login');
      navigate('/adminLogin');
      return;
    }
    
    try {
      
      const parsedAdminData = JSON.parse(adminData);
      setAdmin(parsedAdminData);
      
      trackAllStudents();
    } catch (error) {
      console.error('Error parsing admin data:', error);
      localStorage.removeItem('adminUser');
      navigate('/adminLogin');
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/adminLogin');
  };

  if (!admin) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
          <p><strong>Email:</strong> {admin.email || 'N/A'}</p>
          <p><strong>Role:</strong> {admin.role || 'Administrator'}</p>
        </div>
        
        
        
        {/* Student Lists */}
        <div className='flex gap-4 items-center mb-4'>
          
          <Link to="/adminDashboard/allTeachers">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            All Teachers
          </button>
          </Link>
          
          <Link to="/adminDashboard/allCourses">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          All Courses
          </button>
          </Link>

        </div>
        <h2 className="text-xl font-semibold mb-4">All Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allStudents.map((student) => (
            <div key={student._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">{student.username}</h3>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone}</p>
              {/* Get Verified Button */}
          

            {/* if the student is verified then show verified else show get verified */}
            <h3 className="text-lg font-semibold mb-2 text-blue-500 font-[Poppins] font-bold">Get Verified</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Get Verified
            </button>
          
             
            </div>            
          ))}

          
        </div>

        
      </div>
    </div>
  );
}

// Simple stat card component
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboard;
