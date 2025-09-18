import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
} from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Make sure you have this utility as described earlier
import { useAuthStore } from "../store"; // Zustand store

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    const data = await loginUser(form.email, form.password);
    if (data.message === "Login successful") {
      setUser(data.user, data.token); // store user and token
      navigate("/");
    } else {
      setError(data.message || "Login failed.");
    }
  };

  return (
    <div
      className="k-d-flex k-justify-content-center k-align-items-center"
      style={{ minHeight: "100vh", background: "#f5f6fa" }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 12,
        }}
      >
        <CardHeader>
          <CardTitle
            style={{ fontSize: 24, fontWeight: 700, color: "#1976d2" }}
          >
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="k-form">
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="email"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="password"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
            {error && (
              <div style={{ color: "#d32f2f", marginBottom: 12, fontSize: 14 }}>
                {error}
              </div>
            )}
            <Button
              type="submit"
              themeColor="primary"
              size="large"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </form>
        </CardBody>
        <CardActions style={{ justifyContent: "center", paddingTop: 8 }}>
          <span style={{ fontSize: 14 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#1976d2", textDecoration: "underline" }}
            >
              Register
            </Link>
          </span>
        </CardActions>
      </Card>
    </div>
  );
}
