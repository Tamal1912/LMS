///api/studentDashboard/studentProfile
import React, { useState, useEffect } from "react";
import { FiEdit2, FiUser, FiMail, FiPhone, FiBook, FiCalendar } from "react-icons/fi";
import useAuthStore from "../store/useAuthStore.js";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuthStore();
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    yearJoined: user?.yearJoined || "",
    program: user?.program || "",
    
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            My Profile
          </h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 rounded-lg bg-green-600 text-white"
              >
                Save Changes
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
                className="px-4 py-2 rounded-lg bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <FiUser className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-purple-600 font-medium">{profileData.program}</p>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiUser className="w-5 h-5" />
                    <span className="font-medium">Full Name</span>
                  </div>
                  <input
                    type="text"
                    value={profileData.name}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400 disabled:bg-gray-50"
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiMail className="w-5 h-5" />
                    <span className="font-medium">Email</span>
                  </div>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400 disabled:bg-gray-50"
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiPhone className="w-5 h-5" />
                    <span className="font-medium">Phone</span>
                  </div>
                  <input
                    type="tel"
                    value={profileData.phone}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400 disabled:bg-gray-50"
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiBook className="w-5 h-5" />
                    <span className="font-medium">Student ID</span>
                  </div>
                  <input
                    type="text"
                    value={user._id}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FiBook className="w-5 h-5" />
                      <span className="font-medium">Program</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.program}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400 disabled:bg-gray-50"
                      onChange={(e) => setProfileData({...profileData, program: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FiCalendar className="w-5 h-5" />
                      <span className="font-medium">Year Joined</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.yearJoined}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400 disabled:bg-gray-50"
                      onChange={(e) => setProfileData({...profileData, yearJoined: e.target.value})}
                    />
                  </div>
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
