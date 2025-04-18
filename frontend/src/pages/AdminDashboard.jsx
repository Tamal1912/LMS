// pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore.js';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const { trackAllStudents, allStudents } = useAdminStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // <-- this should be uint-based studentId

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
  }, [navigate, trackAllStudents]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/adminLogin');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || selectedStudentId === null) {
      alert('Please select a student and a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('studentId', selectedStudentId); // ✅ Send uint studentId

    try {
      const response = await axios.post('http://localhost:4000/api/v1/credentials/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful', response.data);
      alert('✅ Credential uploaded successfully.');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('❌ Error uploading file.');
    }
  };

  const handleVerify = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/credentials/verify/${studentId}`);
      if (response.data.valid === true) {
        alert('✅ Credential is valid!');
      } else {
        alert('⚠️ Credential is tampered with!');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      alert('❌ Error verifying credential.');
    }
  };
  

  if (!admin) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-gray-900">
      <div className="bg-white shadow-xl p-6 flex justify-between items-center rounded-lg mb-6 mx-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Admin Profile</h2>
          <p><strong>Email:</strong> {admin.email || 'N/A'}</p>
          <p><strong>Role:</strong> {admin.role || 'Administrator'}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-white">All Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allStudents.map((student) => (
            <div key={student._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{student.username}</h3>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> {student.email}</p>
              <p className="text-gray-600 mb-4"><strong>Phone:</strong> {student.phone}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleVerify(student.studentId)} // ✅ use student.studentId
                  className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Verify Credential
                </button>

                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedStudentId(student.studentId); // ✅ use student.studentId
                  }}
                  className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Upload Credential
                </button>
              </div>

              {isModalOpen && selectedStudentId === student.studentId && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 className="text-xl font-semibold mb-4">Upload Credential for {student.username}</h3>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="border p-2 w-full rounded-md mb-4"
                    />
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleUpload}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Upload
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
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
