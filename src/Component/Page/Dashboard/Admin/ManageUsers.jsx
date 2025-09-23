import React, { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // সব ইউজার লোড করা
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading users:", err);
        setLoading(false);
      });
  }, []);

  // ---------- ইউজার Action Handler ----------
  const handleUpdate = async (id, field, value) => {
    let url = "";
    let body = {};

    if (field === "status") {
      url = `http://localhost:3000/users/status/${id}`;
      body = { status: value };
    }
    if (field === "role") {
      url = `http://localhost:3000/users/role/${id}`;
      body = { role: value };
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const updated = users.map((u) =>
        u._id === id ? { ...u, ...body } : u
      );
      setUsers(updated);
    }
  };

  // ---------- Delete Handler ----------
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
      }
    }
  };

  // ---------- Filter ----------
  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.status === filter);

  // ---------- Loading Spinner ----------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header + Filter */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-blue-600 font-semibold">Manage Users</h1>
        <select
          className="border px-3 py-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-blue-300 rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left text-blue-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>

                {/* Role dropdown */}
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleUpdate(u._id, "role", e.target.value)}
                    className="border px-2 py-1 rounded capitalize"
                  >
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Status dropdown */}
                <td className="p-3">
                  <select
                    value={u.status}
                    onChange={(e) =>
                      handleUpdate(u._id, "status", e.target.value)
                    }
                    className="border px-2 py-1 rounded capitalize"
                  >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>

                {/* Delete Button */}
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
