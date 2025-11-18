// UserDetails.jsx
// Shows detailed info about a user + Edit and Delete buttons.

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch selected user by ID
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Handle Delete (simulated)
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("User deleted (simulated)");
        navigate("/users"); // redirect back to users page
      })
      .catch(() => alert("Failed to delete user"));
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl shadow max-w-lg mx-auto animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/2 mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-3"></div>
        <div className="h-5 bg-gray-700 rounded mb-3"></div>
        <div className="h-5 bg-gray-700 rounded mb-3"></div>
        <div className="h-5 bg-gray-700 rounded mb-3"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 border border-gray-700 rounded shadow max-w-lg mx-auto">
      {/* Name */}
      <h1 className="text-3xl font-bold mb-4 text-blue-400">{user.name}</h1>

      {/* User Info */}
      <div className="space-y-2 mb-6">
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="text-lg">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-lg">
          <strong>Website:</strong> {user.website}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-3">
        {/* EDIT BUTTON */}
        <Link
          to={`/users/edit/${user.id}`}
          className="px-4 py-2 bg-blue-600 rounded text-white font-semibold hover:bg-blue-500"
        >
          Edit User
        </Link>

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 rounded text-white font-semibold hover:bg-red-500"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
