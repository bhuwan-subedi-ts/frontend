import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardBody, CardActions } from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    // TODO: Submit login to backend
    alert(`Logging in as ${form.email}`);
  };

  return (
    <div className="k-d-flex k-justify-content-center k-align-items-center" style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <Card style={{ maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderRadius: 12 }}>
        <CardHeader>
          <CardTitle style={{ fontSize: 24, fontWeight: 700, color: "#1976d2" }}>
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="k-form">
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email" style={{ fontWeight: 500, marginBottom: 4, display: "block" }}>Email</label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="password" style={{ fontWeight: 500, marginBottom: 4, display: "block" }}>Password</label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={e => handleChange("password", e.target.value)}
                required
              />
            </div>
            {error && (
              <div style={{ color: "#d32f2f", marginBottom: 12, fontSize: 14 }}>
                {error}
              </div>
            )}
            <Button type="submit" themeColor="primary" size="large" style={{ width: "100%" }}>
              Login
            </Button>
          </form>
        </CardBody>
        <CardActions style={{ justifyContent: "center", paddingTop: 8 }}>
          <span style={{ fontSize: 14 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2", textDecoration: "underline" }}>
              Register
            </Link>
          </span>
        </CardActions>
      </Card>
    </div>
  );
}