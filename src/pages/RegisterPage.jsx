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
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useAuthStore } from "../store";

const USER_TYPES = [
  { text: "Select user type", value: "select" },
  { text: "Admin", value: "admin" },
  { text: "Job Seeker", value: "job_seeker" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    user_type: "",
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
    if (
      !form.fullname ||
      !form.email ||
      !form.password ||
      !form.passwordConfirm ||
      !form.user_type
    ) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    const data = await registerUser(
      form.email,
      form.password,
      form.fullname,
      form.user_type
    );
    if (data.message === "User registered successfully") {
      setUser(data.user, data.token);
      navigate("/dashboard");
    } else {
      setError(data.message || "Registration failed.");
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
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="k-form">
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="fullname"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                Full Name
              </label>
              <Input
                id="fullname"
                type="text"
                value={form.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                required
              />
            </div>
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
            <div style={{ marginBottom: 16 }}>
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
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="passwordConfirm"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                Confirm Password
              </label>
              <Input
                id="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={(e) =>
                  handleChange("passwordConfirm", e.target.value)
                }
                required
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="user_type"
                style={{ fontWeight: 500, marginBottom: 4, display: "block" }}
              >
                User Type
              </label>
              <DropDownList
                id="user_type"
                data={USER_TYPES}
                textField="text"
                dataItemKey="value"
                value={
                  USER_TYPES.find((item) => item.value === form.user_type) ||
                  USER_TYPES[0]
                }
                onChange={(e) =>
                  handleChange("user_type", e.value ? e.value.value : "")
                }
                required
                placeholder="Select user type"
                style={{ width: "100%" }}
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
              Register
            </Button>
          </form>
        </CardBody>
        <CardActions style={{ justifyContent: "center", paddingTop: 8 }}>
          <span style={{ fontSize: 14 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", textDecoration: "underline" }}
            >
              Login
            </Link>
          </span>
        </CardActions>
      </Card>
    </div>
  );
}
