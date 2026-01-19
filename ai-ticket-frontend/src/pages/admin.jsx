import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatingSkills, setUpdatingSkills] = useState(false);
  const [deletingSkills, setDeletingSkills] = useState(false);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        // console.log("received data: ", data);
      } else {
        alert("response was not ok, failed to fetch users");
      }
    } catch (error) {
      console.error("error! failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = async (user) => {
    if (user.role === "admin") {
      alert("alert! admin role cannot be modified");
      return;
    }

    const updatedRole = user.role === "user" ? "moderator" : "user";

    setUpdating(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            role: updatedRole,
            skills: user.skills,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        fetchUsers(); // fetch users with updated role of this user
      } else {
        alert("response not ok , couldn't update the user");
      }
    } catch (error) {
      console.error("error while updating the user", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateUserSkills = async (user) => {
    if (user.role === "admin") {
      alert("alert! admin skills cannot be added");
      return;
    }

    const existingSkills = user.skills;
    const newSkill = prompt("Enter new skill");
    let updatedSkills = [];
    if (newSkill !== null) {
      updatedSkills = [...existingSkills, newSkill];
    } else {
      updatedSkills = [...existingSkills];
    }

    setUpdatingSkills(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            role: user.role,
            skills: updatedSkills,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        fetchUsers(); // fetch users with updated skillset of this user
      } else {
        alert("response not ok , couldn't add the user skill");
      }
    } catch (error) {
      console.error("error while adding the user skill", error);
    } finally {
      setUpdatingSkills(false);
    }
  };

  const handleDeleteUserSkills = async (user, skill) => {
    if (user.role === "admin") {
      alert("alert! admin skills cannot be deleted");
      return;
    }

    const existingSkills = user.skills;
    let updatedSkills = [];
    if (existingSkills !== null) {
      updatedSkills = existingSkills.filter(
        (existingSkill) => existingSkill !== skill
      );
    }

    setDeletingSkills(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            role: user.role,
            skills: updatedSkills,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        fetchUsers(); // fetch users with updated skillset of this user after deletion of particular skill
      } else {
        alert("response not ok , couldn't delete the user skill");
      }
    } catch (error) {
      console.error("error while deleting the user skill", error);
    } finally {
      setDeletingSkills(false);
    }
  };

  if (loading) {
    return <p className="italic text-sm">Loading users...⏳</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">👥 User Management</h2>

      {users.length === 0 ? (
        <p className="text-gray-400 italic">No users found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 rounded-xl shadow-md p-5
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-200"
            >
              {/* Header */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-white break-all">
                  {user.email}
                </h3>
                <span
                  className={`inline-block mt-1 px-3 py-1 text-xs rounded-full
                ${
                  user.role === "admin"
                    ? "bg-red-600/20 text-red-400"
                    : user.role === "moderator"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-green-600/20 text-green-400"
                }`}
                >
                  {user.role.toUpperCase()}
                </span>
              </div>

              {/* Meta */}
              <p className="text-sm text-gray-400 mb-4">
                Created on{" "}
                <span className="text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>

              {/* Skills */}
              <div>
                <div className="flex">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Skills
                  </h4>
                  <button
                    className="btn btn-xs btn-outline btn-secondary mb-2 ml-1"
                    disabled={updatingSkills || user.role === "admin"}
                    onClick={() => {
                      handleUpdateUserSkills(user);
                    }}
                  >
                    {user.role === "admin" ? "Admin" : "Add"}
                  </button>
                </div>
                {Array.isArray(user.skills) && user.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <button
                        key={index}
                        disabled={deletingSkills || user.role === "admin"}
                        onClick={() =>
                          confirm(
                            `delete this skill: ${skill} of user: ${user.email}?`
                          ) && handleDeleteUserSkills(user, skill)
                        }
                        className="
    group flex items-center gap-1
    px-3 py-1 text-xs font-medium
    rounded-full
    bg-blue-600/20 text-blue-300
    hover:bg-red-600/20 hover:text-red-300
    transition
    disabled:opacity-50 disabled:cursor-not-allowed
  "
                      >
                        <span>{skill}</span>

                        <span className="text-red-400 opacity-0 group-hover:opacity-100 transition">
                          ✕
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-gray-500">
                    No skills listed
                  </p>
                )}
              </div>

              <button
                className="btn btn-outline btn-accent mt-1.5"
                disabled={updating || user.role === "admin"}
                onClick={() => handleUpdateUser(user)}
              >
                {user.role === "admin" ? "Admin" : "Toggle role"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Admin;
