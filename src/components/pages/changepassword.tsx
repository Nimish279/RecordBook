// // src/components/pages/ChangePassword.tsx

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ChangePassword = () => {
//   const [form, setForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
// const API_URL = import.meta.env.VITE_API_URL;
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.newPassword !== form.confirmPassword) {
//       setMessage("New password and confirm password do not match.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `${API_URL}/api/profile/password`,
//         {
//           currentPassword: form.currentPassword,
//           newPassword: form.newPassword,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMessage(res.data.message || "Password changed successfully");
//       setTimeout(() => navigate("/dashboard/profile"), 1500);
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || "Error changing password");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Change Password</h2>

//       {message && <p className="text-red-600 mb-4">{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <label className="block mb-2 text-sm font-medium">Current Password</label>
//         <input
//           type="password"
//           name="currentPassword"
//           value={form.currentPassword}
//           onChange={handleChange}
//           className="w-full px-3 py-2 mb-4 border rounded"
//           required
//         />

//         <label className="block mb-2 text-sm font-medium">New Password</label>
//         <input
//           type="password"
//           name="newPassword"
//           value={form.newPassword}
//           onChange={handleChange}
//           className="w-full px-3 py-2 mb-4 border rounded"
//           required
//         />

//         <label className="block mb-2 text-sm font-medium">Confirm Password</label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           className="w-full px-3 py-2 mb-4 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;

// src/components/pages/ChangePassword.tsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ChangePassword = () => {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email: form.email,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      setMessage(res.data.message || "Password changed successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Change Password
        </h2>

        {message && (
          <p className="text-sm text-green-500 font-bold text-center mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              // type="password"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              placeholder="Enter new password"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              // onClick={() => setShowPassword(!showPassword)}
            />
            <div
              className="inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <input
              // type="password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Confirm new password"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <div
              className="inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          <button
            type="submit"
            // onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
