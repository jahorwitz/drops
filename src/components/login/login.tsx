import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./logo.svg";
import arrow from "./arrow.svg"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const isValid = email.includes("@") && password.length >= 8;
  const navigate = useNavigate(); 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!e.target.validity.valid) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // The actual login logic will be implemented later (DROP-22)
    } else {
      if (!email.includes("@")) {
        setEmailError("Please enter a valid email.");
      }
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      }
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#fff5cc",
        borderRadius: "10px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <header style={{ marginBottom: "20px" }}>
      <button
        onClick={handleBackToHome}
        style={{
          width: "10px",
          height: "20px",
          position: "absolute",
          top: "53px",
          left: "20px",
          background: "none",
          border: "2px",
          padding: "0",
          cursor: "pointer",
        }}
      >
        <img
          src={arrow}
          alt="Back Arrow"
        />
      </button>
      <img
          src={Logo}
          alt="Drops Care Logo"
          style={{
            width: "88px",
            height: "112px",
            padding: "4px",
            display: "block",
            margin: "40px auto 0",
          }}
        />
      </header>
      <h2 style={{
        font: "Rubik",
        fontSize: "32px",
        fontWeight: "500",
        lineHeight: "38px",
        textAlign: "center",
        marginTop: "60px",
        marginBottom: "20px",

        }}>
        Log In
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "32px", marginBottom: "20px" }}>
          <label style={{
              display: "block",
              marginBottom: "4px",
              textAlign: "left",
              fontSize: "16px",
              font: "Rubik",
              fontWeight: "400",
              lineHeight: "19px",
               }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            required
          />
          {emailError && (
            <div style={{ color: "red", textAlign: "left", fontSize: "14px" }}>
              {emailError}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
           display: "block",
           marginBottom: "4px",
           textAlign: "left",
           fontSize: "16px",
           font: "Rubik",
           fontWeight: "400",
           lineHeight: "19px"
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            required
            minLength={8}
          />
          {passwordError && (
            <div style={{ color: "red", textAlign: "left", fontSize: "14px" }}>
              {passwordError}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "4px",
            cursor: isValid ? "pointer" : "not-allowed",
            border: "none",
            marginTop: "209px",
            font: "Rubik",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "22px"
          }}
        >
          Log In
        </button>
      </form>
      <footer style={{ marginTop: "32px" }}>
        <button
          onClick={handleBackToHome}
          style={{
            background: "none",
            border: "none",
            color: "#000",
            cursor: "pointer",
            font: "Rubik",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "22px",
            marginTop: "0px",
            marginBottom: "12px",
          }}
        >
          Or register
        </button>
      </footer>

    </div>
  );
};

export default Login;