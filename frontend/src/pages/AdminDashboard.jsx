import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader.jsx';
import { Link } from 'react-router-dom';
import { api } from '@/lib/utils.js';

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const { trackAllStudents, allStudents } = useAdminStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [verifyingStudentId, setVerifyingStudentId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) return navigate('/adminLogin');

    try {
      const parsedAdminData = JSON.parse(adminData);
      setAdmin(parsedAdminData);
      trackAllStudents();
    } catch (error) {
      console.error('Error parsing admin data:', error);
      localStorage.removeItem('adminUser');
      navigate('/adminLogin');
    }
  }, [navigate, trackAllStudents]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile || selectedStudentId === null) {
      toast.error('Please select a student and a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('studentId', selectedStudentId);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await api.post('https://lms-backend-r8mx.onrender.com/credentials/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      toast.success('Credential uploaded successfully!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error uploading credential. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleVerify = async (studentId) => {
    try {
      setVerifyingStudentId(studentId);
      const response = await api.get(`https://lms-backend-r8mx.onrender.com/credentials/verify/${studentId}`);
      setVerifyingStudentId(null);
      if (response.data.valid) {
       toast.success('Credential is valid!');
      } else {
        alert('⚠️ Credential is tampered with!');
      }
    } catch (error) {
      setVerifyingStudentId(null);
      toast.error('Error verifying credential.');
    }
  };

  if (!admin) {
    return (
      <div className=" w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <Loader size={50} color="#60A5FA" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white font-sans px-4">
      <div className=" max-w-7xl mx-auto py-10">
        <div className="bg-white/10 backdrop-blur-md shadow-xl p-6 flex justify-between items-center rounded-xl  mb-8 mt-3 py-4 border border-white/20">
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

        <h2 className="text-3xl font-semibold mb-6 text-white tracking-wide">👥 All Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allStudents.map((student) => (
            <div key={student._id} className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-2">{student.username}</h3>
              <p className="text-gray-200 mb-1"><strong>Email:</strong> {student.email}</p>
              <p className="text-gray-200 mb-2"><strong>Phone:</strong> {student.phone}</p>
              <p className="text-gray-200 mb-2"><strong>Year Joined:</strong> {student.yearJoined}</p>
              <p className="text-gray-200 mb-2"><strong>Program:</strong> {student.program || 'N/A'}</p>
              

              <div className="flex justify-between items-center gap-2">
                {student.isVerified ? (
                  <span className="text-green-400 font-semibold">✅ Verified</span>
                ) : verifyingStudentId === student.studentId ? (
                  <Loader size={20} className="text-green-400 font-semibold " />
                ) : (
                  <>
                    <button
                      onClick={() => handleVerify(student.studentId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm shadow-md"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedStudentId(student.studentId);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm shadow-md"
                    >
                      Upload
                    </button>
                  </>
                )}
              </div>

              {isModalOpen && selectedStudentId === student.studentId && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                  <div className="bg-white text-black p-6 rounded-lg shadow-xl w-96">
                    <h3 className="text-xl font-semibold mb-4">
                      Upload Credential for {student.username}
                    </h3>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="border border-gray-300 p-2 w-full rounded-md mb-4"
                      disabled={isUploading}
                    />
                    
                    {isUploading && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 text-center">{uploadProgress}% Uploaded</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className={`${
                          isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        } text-white px-4 py-2 rounded-md transition-colors`}
                      >
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        disabled={isUploading}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
