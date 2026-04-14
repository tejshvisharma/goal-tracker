import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const res = await API.post("/user/register", form);
      setMessage(res.data?.message || "Registration successful");
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (err) {
      setMessage(getServerMessage(err, "Registration failed"));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        {message ? <p className={`message ${messageType}`}>{message}</p> : null}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
