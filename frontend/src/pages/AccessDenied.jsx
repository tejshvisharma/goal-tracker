import { Link, useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card access-card">
        <h2>Access Denied</h2>
        <p className="form-footer">
          You do not have permission to access this page.
        </p>

        <div className="access-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
