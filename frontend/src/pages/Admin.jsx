import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getServerMessage = (error, fallback) => {
    const responseData = error.response?.data;

    if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
      return responseData.errors
        .map((item) => item?.message)
        .filter(Boolean)
        .join(" | ");
    }

    return responseData?.message || fallback;
  };

  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await API.get("/user/all-users");
      const allUsers = res.data?.data || [];
      setUsers(allUsers);
      setMessage(res.data?.message || "Users fetched successfully");
      setMessageType("success");
    } catch (err) {
      setMessage(getServerMessage(err, "Failed to load users"));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard">
      <div className="card">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Admin Panel</h2>
            <p className="dashboard-subtitle">{users.length} user(s)</p>
          </div>

          <div className="dashboard-header-actions">
            <button
              type="button"
              className="btn-secondary nav-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
            <button type="button" className="add-goal-btn" onClick={fetchUsers}>
              Refresh
            </button>
          </div>
        </div>

        {message ? <p className={`message ${messageType}`}>{message}</p> : null}

        {loading ? (
          <p className="form-footer">Loading users...</p>
        ) : (
          <div className="admin-list">
            {users.map((user) => (
              <div className="goal" key={user._id}>
                <div className="goal-text">
                  <strong>{user.username}</strong>
                  <p className="dashboard-subtitle">{user.email}</p>
                </div>
                <span className="role-badge">{user.role}</span>
              </div>
            ))}
          </div>
        )}

        {!loading && users.length === 0 ? (
          <p className="form-footer">No users found.</p>
        ) : null}
      </div>
    </div>
  );
}
