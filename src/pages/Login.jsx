import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MiniHeader from "../components/MiniHeader";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import LoginCSS from "../css/login.module.css";
import { LoginApi } from "../api/api";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");

    if (loggedIn && userType) {
      setIsLoggedIn(JSON.parse(loggedIn));
      setUserType(JSON.parse(userType));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await LoginApi({ username, password });
      setUserType(data.user.role);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userType", JSON.stringify(data.user.role));

      if (data.user.role === "user") {
        const address = "321 Oak St, Madrid, Madrid 28001";
        localStorage.setItem("Address", address);
        toast.success("You logged in as a User!");
      }

      if (data.user.role === "guest") {
        toast.success("You logged in as Guest!");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("Address");
    localStorage.removeItem("wishlist");
  };

  return (
    <div className={LoginCSS.page}>
      <MiniHeader />
      <Header />
      <div className={LoginCSS.content}>
        {isLoggedIn ? (
          <Profile userType={userType} handleLogout={handleLogout} />
        ) : (
          <div className={LoginCSS.container}>
            <div className={LoginCSS.card}>
              <h1 className={LoginCSS.loginTitle} style={{ color: "#1B4332" }}>
                Login
              </h1>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  className={LoginCSS.input}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className={LoginCSS.input}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className={LoginCSS.btn}>
                  Login
                </button>
              </form>
              <p className={LoginCSS.terms}>
                You are agreed to our Terms and Conditions!
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
