// EditUser.jsx
// Loads an existing user and updates them with a PUT request.

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams(); // Fetch user ID from URL
  const navigate = useNavigate();

  // Prefill form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing user data
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user data");
        setLoading(false);
      });
  }, [id]);

  // Handle input typing
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Submit updated user
  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        alert("User updated successfully! (simulated)");
        navigate("/users");
      })
      .catch(() => setError("Failed to update user"))
      .finally(() => setSaving(false));
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-gray-800 border border-gray-700 shadow rounded p-6 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 border border-gray-700 shadow rounded p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      {error && <p className="text-red-400">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-300">Name</label>
          <input
            name="name"
            value={formData.name}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-300">Email</label>
          <input
            name="email"
            value={formData.email}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold text-gray-300">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            onChange={handleChange}
            required
          />
        </div>

        <button
          disabled={saving}
          className="w-full py-2 bg-green-600 rounded text-white font-semibold hover:bg-green-500"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
