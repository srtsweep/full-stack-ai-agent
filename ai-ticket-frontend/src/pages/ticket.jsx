import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  const fetchTicket = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Ticket not found");
      }

      const data = await res.json();
      setTicket(data.ticket);

      setError(false);
    } catch (error) {
      console.error("Failed to fetch the ticket", error);
      setError(true);
      setTicket(null);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (!ticket && !error) {
    return <p className="text-3xl text-center">loading ticket...</p>;
  }

  if (error) {
    return <p className="text-3xl text-center">Error 404! Ticket not found.</p>;
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-center mb-8">
          🎫 Ticket Details
        </h2>

        {/* Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold">{ticket.title}</h3>

              <span
                className={`badge badge-lg ${
                  ticket.status === "TODO"
                    ? "badge-neutral"
                    : ticket.status === "IN_PROGRESS"
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {ticket.status.replace("_", " ")}
              </span>
            </div>

            {/* Description (always shown) */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">
                Description
              </h4>
              <p className="text-base leading-relaxed text-gray-200">
                {ticket.description}
              </p>
            </div>

            {/* Helpful Notes (optional) */}
            {ticket.helpfulNotes && (
              <div className="bg-base-200 rounded-lg p-4 border border-base-300">
                <h4 className="text-sm font-semibold text-gray-400 mb-1">
                  Helpful Notes
                </h4>
                <p className="text-sm text-green-300">{ticket.helpfulNotes}</p>
              </div>
            )}

            {/* Related Skills (optional) */}
            {Array.isArray(ticket.relatedSkills) &&
              ticket.relatedSkills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">
                    Related Skills
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {ticket.relatedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full
                         bg-blue-600/20 text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Assigned To (optional) */}
            {ticket.assignedTo?.email && (
              <div className="flex items-center justify-between border-t border-base-300 pt-4">
                <p className="text-sm text-gray-400">
                  Assigned to{" "}
                  <span className="text-gray-200 font-medium">
                    {ticket.assignedTo.email}
                  </span>
                </p>
              </div>
            )}
            <p className="text-xm text-gray-500">
              Created {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TicketDetailsPage;
