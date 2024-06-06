import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MiniHeader from "../components/MiniHeader";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import LoginCSS from "../css/login.module.css";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");

    if (loggedIn && userType) {
      setIsLoggedIn(JSON.parse(loggedIn));
      setUserType(JSON.parse(userType));
    }
  }, []);

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("userType", JSON.stringify(type));

    if (type === "user") {
      const address =
        "Akshya Nagar, 1st Block, 1st Cross, Ramamurthy Nagar, Bangalore-560016";
      localStorage.setItem("Address", address);
    }

    if (type === "guest") {
      toast.success("You logged in as Guest!");
    } else if (type === "user") {
      toast.success("You logged in as a User!");
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
              <h1 className={LoginCSS.loginTitle}>Login</h1>
              <button
                className={LoginCSS.btn}
                onClick={() => handleLogin("guest")}
              >
                Login as Guest
              </button>
              <button
                className={LoginCSS.btn}
                onClick={() => handleLogin("user")}
              >
                Login as User
              </button>
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
