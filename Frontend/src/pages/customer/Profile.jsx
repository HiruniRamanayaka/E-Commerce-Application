import React from "react";
import { useSelector } from "react-redux";
import { User, Mail, Phone, ShieldCheck, CalendarCheck } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-2xl m-10 mx-auto p-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-[#3e2c1d] mb-6 text-center">👤 My Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center space-x-3">
          <User className="text-amber-700 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium text-gray-800">{user?.userName || "—"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="text-amber-700 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">{user?.email || "—"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="text-amber-700 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-lg font-medium text-gray-800">{user?.phone || "—"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-amber-700 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-medium text-gray-800 capitalize">{user?.role || "customer"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:col-span-2">
          <CalendarCheck className="text-amber-700 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-lg font-medium text-gray-800">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;