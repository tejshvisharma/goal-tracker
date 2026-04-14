import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
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

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchGoals = useCallback(async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data.data.goals);
    } catch (err) {
      showMessage(getServerMessage(err, "Failed to load goals"), "error");
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await API.get("/user/me");
      setUserRole(res.data?.data?.role || "");
    } catch {
      setUserRole("");
    }
  }, []);

  const createGoal = async () => {
    if (!title.trim()) {
      showMessage("Goal title is required", "error");
      return;
    }

    try {
      const res = await API.post("/goals", { title });
      setTitle("");
      showMessage(res.data?.message || "Goal created successfully", "success");
      fetchGoals();
    } catch (err) {
      showMessage(getServerMessage(err, "Failed to create goal"), "error");
    }
  };

  const startEditing = (goal) => {
    setEditingId(goal._id);
    setEditingTitle(goal.title);
    setMessage("");
    setMessageType("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const updateGoal = async (id) => {
    if (!editingTitle.trim()) {
      showMessage("Goal title is required", "error");
      return;
    }

    try {
      const res = await API.put(`/goals/${id}`, { title: editingTitle });
      showMessage(res.data?.message || "Goal updated successfully", "success");
      setEditingId(null);
      setEditingTitle("");
      fetchGoals();
    } catch (err) {
      showMessage(getServerMessage(err, "Failed to update goal"), "error");
    }
  };

  const deleteGoal = async (id) => {
    try {
      const res = await API.delete(`/goals/${id}`);
      showMessage(res.data?.message || "Goal deleted successfully", "success");
      if (editingId === id) {
        cancelEditing();
      }
      fetchGoals();
    } catch (err) {
      showMessage(getServerMessage(err, "Failed to delete goal"), "error");
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/user/logout");
    } finally {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchCurrentUser();
  }, [fetchGoals, fetchCurrentUser]);

  return (
    <div className="dashboard">
      <div className="card">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Dashboard</h2>
            <p className="dashboard-subtitle">{goals.length} goal(s)</p>
          </div>

          <div className="dashboard-header-actions">
            {userRole === "admin" ? (
              <button
                type="button"
                className="btn-secondary nav-btn"
                onClick={() => navigate("/admin")}
              >
                Admin Panel
              </button>
            ) : null}

            <button
              type="button"
              className="btn-danger logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {message ? <p className={`message ${messageType}`}>{message}</p> : null}

        <div className="goal-input">
          <input
            value={title}
            placeholder="Add a new goal"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createGoal();
              }
            }}
          />
          <button type="button" className="add-goal-btn" onClick={createGoal}>
            Add Goal
          </button>
        </div>

        {goals.map((goal) => (
          <div className="goal" key={goal._id}>
            {editingId === goal._id ? (
              <input
                className="goal-edit-input"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    updateGoal(goal._id);
                  }
                }}
              />
            ) : (
              <span className="goal-text">{goal.title}</span>
            )}

            <div className="goal-actions">
              {editingId === goal._id ? (
                <>
                  <button type="button" onClick={() => updateGoal(goal._id)}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => startEditing(goal)}
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                className="btn-danger"
                onClick={() => deleteGoal(goal._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {goals.length === 0 ? (
          <p className="form-footer">No goals yet. Add your first one above.</p>
        ) : null}
      </div>
    </div>
  );
}
