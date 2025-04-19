///api/studentDashboard/studentProfile
import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiBook, FiCalendar,FiArrowLeft,FiThumbsUp } from "react-icons/fi";
import useAuthStore from "../store/useAuthStore.js";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader.jsx";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  


  const { user, updateUser,loading ,getProfile} = useAuthStore();
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    yearJoined: "",
    program:  "",
    
  });

  // Update profileData when user data changes
    useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        yearJoined: user.yearJoined || "",
        program: user.program || "",
      });
    }
  }, [user]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading("Updating profile...");
    
    try {
      const result = await updateUser(user._id, profileData);
      
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("An error occurred while updating profile");
    }
  };

  const handleVerifyAccount = () => {
    const adminEmail = "admin@example.com"; 
    const subject = encodeURIComponent("Request for Account Verification");
    const body = encodeURIComponent(
      `Hi Admin,
  
  I would like to verify my student account. Below are my details:
  
  Name: ${profileData.username}
  Email: ${profileData.email}
  Phone: ${profileData.phone}
  Program: ${profileData.program}
  Student ID: ${user._id}
  
  Thank you!`
    );
  
   //opens Gmail directly
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${subject}&body=${body}`;
  
    window.open(gmailUrl, "_blank"); 
  };
  
  
  

  return (
    loading ? <div className="flex justify-center items-center h-screen"><Loader/></div> :
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 bg-white/90 p-6 rounded-xl shadow-md">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
          >
            
              <FiArrowLeft />
              <span className="text-lg">Back to Dashboard</span>
          </button>

          
          <div className="flex items-center gap-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setProfileData({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                      yearJoined: user?.yearJoined || "",
                      program: user?.program || "",
                    });
                  }}
                  className="px-6 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
  {user?.isVerified ? (
    <span className="text-green-600 font-semibold flex items-center gap-2">
      <FiThumbsUp /> Account already verified
    </span>
  ) : (
    <button
      onClick={handleVerifyAccount}
      className="px-6 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600"
    >
      Click to Verify
      <h5>wait for 24 hours to verify</h5>
    </button>
  )}
</div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Profile Picture Card */}
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 transform hover:scale-102 transition-all duration-500 border border-white/20">
              <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 flex items-center justify-center">
                    <FiUser className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">{profileData.username}</h2>
              <p className="text-indigo-600 font-semibold text-xl text-center">{profileData.program}</p>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-3 text-gray-600">
                  <FiBook className="w-6 h-6 text-indigo-500" />
                  <span className="text-lg">ID: {user._id?.slice(-6)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="md:col-span-2">
            <div className="w-full h-full bg-white/80 rounded-3xl shadow-lg p-8 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-gray-700">
                    <FiUser className="w-5 h-5 text-blue-500" />
                    Username
                  </label>
                  <input
                    type="text"
                    value={profileData.username}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg border-blue-500"
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-gray-700">
                    <FiMail className="w-5 h-5 text-blue-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg border-blue-500"
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-gray-700">
                    <FiPhone className="w-5 h-5 text-blue-500" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg border-blue-500"
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-gray-700">
                    <FiBook className="w-5 h-5 text-blue-500" />
                    Program
                  </label>
                  <input
                    type="text"
                    value={profileData.program}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg border-blue-500"
                    onChange={(e) => setProfileData({...profileData, program: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-gray-700">
                    <FiCalendar className="w-5 h-5 text-blue-500" />
                    Year Joined
                  </label>
                  <input
                    type="text"
                    value={profileData.yearJoined}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg border-blue-500"
                    onChange={(e) => setProfileData({...profileData, yearJoined: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
 
