import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  return (
    <section id="auth">
      <div className="container">
        <div className="flex-center" id="tabs">
          <p
            className={activeTab === "login" ? "active" : ""}
            onClick={() => {
              setActiveTab("login");
            }}
          >
            Sign in
          </p>
          <p
            className={activeTab === "register" ? "active" : ""}
            onClick={() => {
              setActiveTab("register");
            }}
          >
            Sign up
          </p>
        </div>
        {activeTab === "login" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              axios
                .post("https://bilimjarys.online/identity/login", {
                  email: email,
                  password: password,
                })
                .then((res) => {
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("id", res.data.user._id);
                  window.location.assign("/tournaments");
                })
                .catch((err) => {
                  alert("Incorrect password or login!");
                });
            }}
          >
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button className="join" type="submit">
              Sign in
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              axios
                .post("https://bilimjarys.online/identity/signup", {
                  fullName: fullName,
                  email: email,
                  password: password,
                })
                .then((res) => {
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("id", res.data.user._id);
                  window.location.assign("/tournaments");
                })
                .catch((err) => {
                  alert(err);
                });
            }}
          >
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button className="join">Sign up</button>
          </form>
        )}
      </div>
    </section>
  );
}
