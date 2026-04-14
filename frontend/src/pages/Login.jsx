import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const res = await API.post("/user/login", form);
      setMessage(res.data?.message || "Logged in successfully");
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (err) {
      setMessage(getServerMessage(err, "Login failed"));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        {message ? <p className={`message ${messageType}`}>{message}</p> : null}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="form-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
