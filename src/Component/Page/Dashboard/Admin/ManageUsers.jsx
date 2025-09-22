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

  // Action Handler
  const handleAction = async (id, action) => {
    let url = "";
    let body = {};

    if (action === "block") {
      url = `http://localhost:3000/users/status/${id}`;
      body = { status: "blocked" };
    }
    if (action === "activate") {
      url = `http://localhost:3000/users/status/${id}`;
      body = { status: "active" };
    }
    if (action === "volunteer") {
      url = `http://localhost:3000/users/role/${id}`;
      body = { role: "volunteer" };
    }
    if (action === "admin") {
      url = `http://localhost:3000/users/role/${id}`;
      body = { role: "admin" };
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

  // ফিল্টার
  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.status === filter);

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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

      <div className="overflow-x-auto text-cyan-500 bg-white rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-600">
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
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3 capitalize">{u.status}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleAction(u._id, "block")}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    Block
                  </button>
                  <button
                    onClick={() => handleAction(u._id, "activate")}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleAction(u._id, "volunteer")}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    Make Volunteer
                  </button>
                  <button
                    onClick={() => handleAction(u._id, "admin")}
                    className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Make Admin
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
