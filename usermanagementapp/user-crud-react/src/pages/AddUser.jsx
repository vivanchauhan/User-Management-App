// AddUser.jsx
// Form with page-loading skeleton + submit loader

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Page loading skeleton
  const [loading, setLoading] = useState(true);

  // Submit loading (button loading)
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Fake page loader effect (for UI consistency)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // PAGE SKELETON
  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-xl border border-gray-700 shadow animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-3 w-1/4"></div>
        <div className="h-10 bg-gray-700 rounded mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-3 w-1/4"></div>
        <div className="h-10 bg-gray-700 rounded mb-6"></div>
        <div className="h-5 bg-gray-700 rounded mb-3 w-1/4"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    );
  }

  // Form input handler
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        alert("User added successfully! (simulated)");
        navigate("/users");
      })
      .catch(() => setError("Failed to add user"))
      .finally(() => setSaving(false));
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 border border-gray-700 shadow rounded p-6">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      {error && <p className="text-red-400">{error}</p>}

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-300">Name</label>
          <input
            name="name"
            type="text"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold text-gray-300">Phone</label>
          <input
            name="phone"
            type="text"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            placeholder="Enter phone"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={saving}
          className="w-full py-2 bg-blue-600 rounded text-white font-semibold hover:bg-blue-500"
        >
          {saving ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
