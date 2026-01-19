import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");

  //TODO: role-based fetching ticket info
  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTickets(data || []);
    } catch (error) {
      console.error("Failed to fetch the tickets", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setForm({ title: "", description: "" }); // clear form fields
        fetchTickets(); // reload list of tickets with this new ticket
      } else {
        alert(data.message || "ticket creattion failed");
      }
    } catch (error) {
      console.error("error while creating the ticket", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Create Ticket */}
      <div className="flex justify-center mt-10">
        <div className="card w-full max-w-md shadow-xl bg-base-100">
          <form onSubmit={handleCreateTicket} className="card-body">
            <h2 className="card-title justify-center text-2xl">
              Create Ticket
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Ticket title"
              className="input input-bordered w-full"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Describe the issue"
              className="textarea textarea-bordered w-full"
              value={form.description}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      </div>

      {/* Tickets List */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/tickets/${item._id}`)}
              className="card bg-base-100 shadow-lg cursor-pointer hover:scale-[1.02] transition"
            >
              <div className="card-body">
                <h2 className="card-title text-xl">{item.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`badge ${
                      item.status === "TODO"
                        ? "badge-neutral"
                        : item.status === "IN_PROGRESS"
                        ? "badge-warning"
                        : item.status === "DONE"
                        ? "badge-success"
                        : "badge-ghost"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>

                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No tickets submitted yet.
          </p>
        )}
      </div>
    </div>
  );
}
export default Tickets;
