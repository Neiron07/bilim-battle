import axios from "axios";
import { useState } from "react";

//import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(""); // Добавленное поле "age"
  const [school, setSchool] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  //const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

  /* function onChange(value) {
    setIsCaptchaSuccess(true)
  } */
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
            Войти
          </p>
          <p
            className={activeTab === "register" ? "active" : ""}
            onClick={() => {
              setActiveTab("register");
            }}
          >
            Регистрация
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
              Войти
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
                  age: age,
                  school: school
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
              placeholder="Фамилие и имя"
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
              type="number"
              placeholder="Возраст"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Школа"
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
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
              {/*<ReCAPTCHA
              sitekey="6Lf1fY8nAAAAAJ_PUo0Dokms8mL2EvakFPQszcNB"
              onChange={onChange}
            /> */}
            <button className="join">Зарегистрироваться</button>
          </form>
        )}
      </div>
    </section>
  );
}
