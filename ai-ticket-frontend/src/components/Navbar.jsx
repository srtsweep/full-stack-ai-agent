import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold" href="/">
          INGNX
        </a>
      </div>

      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <>
            <a className="btn btn-info btn-sm" href="/admin">
              Admin
            </a>
            <button className="btn btn-error btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a className="btn btn-info btn-sm" href="/login">
              Login
            </a>
            <a className="btn btn-success btn-sm" href="/signup">
              Signup
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
