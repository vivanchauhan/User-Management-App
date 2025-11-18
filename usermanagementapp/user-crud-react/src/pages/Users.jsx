// Users.jsx
// Mobile-friendly user list with real DELETE simulation

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // -----------------------------------
  // 🗑 REAL DELETE (API simulation)
  // -----------------------------------
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      // Send DELETE request (JSONPlaceholder simulates deletion)
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      // Remove user from UI instantly
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-40"></div>
        <div className="h-32 bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-blue-400">Manage Users</h1>

      {/* Table wrapper for mobile scroll */}
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-800 text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left hidden sm:table-cell">Email</th>
              <th className="p-3 text-left hidden sm:table-cell">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-700">
                <td className="p-3">{u.name}</td>
                <td className="p-3 hidden sm:table-cell">{u.email}</td>
                <td className="p-3 hidden sm:table-cell">{u.phone}</td>

                <td className="p-3 flex gap-2 justify-center flex-wrap">
                  <Link
                    to={`/users/${u.id}`}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>

                  <Link
                    to={`/users/edit/${u.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>

                  {/* ✨ REAL DELETE BUTTON */}
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
