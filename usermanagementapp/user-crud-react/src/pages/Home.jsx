// Home.jsx
// Clean dashboard with skeleton loader

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for UI consistency
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // ⭐ Skeleton Loader
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Heading skeleton */}
        <div className="h-10 bg-gray-700 rounded w-1/2"></div>
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-8"></div>

        {/* Cards skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-32 bg-gray-700 rounded-xl"></div>
          <div className="h-32 bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // ⭐ Actual Content
  return (
    <div>
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-blue-400 mb-3">
        Welcome to UserManager 🚀
      </h1>

      <p className="text-gray-300 mb-8 text-lg">
        A clean and simple React + Tailwind CRUD application to manage users.
      </p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ADD USER */}
        <Link
          to="/users/add"
          className="bg-gray-700 border border-gray-600 p-6 rounded-xl shadow hover:shadow-xl 
                     hover:bg-gray-600 transition cursor-pointer"
        >
          <h2 className="text-2xl font-semibold mb-2">➕ Add User</h2>
          <p className="text-gray-300">
            Create a new user with name, email, and phone information.
          </p>
        </Link>

        {/* MANAGE USERS */}
        <Link
          to="/users"
          className="bg-gray-700 border border-gray-600 p-6 rounded-xl shadow hover:shadow-xl 
                     hover:bg-gray-600 transition cursor-pointer"
        >
          <h2 className="text-2xl font-semibold mb-2">📊 Manage Users</h2>
          <p className="text-gray-300">
            Edit, delete, or view details of all existing users.
          </p>
        </Link>
      </div>
    </div>
  );
}
