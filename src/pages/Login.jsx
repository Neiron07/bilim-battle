import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
//import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);


  const validateFields = (fields) => {
    const errors = {};

    if (!fields.fullName || fields.fullName.length < 2) {
      errors.fullName = "Пожалуйста, введите корректное имя и фамилию (минимум 2 символа).";
    }

    if (!fields.email || !fields.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Пожалуйста, введите корректный адрес электронной почты.";
    }

    if (!fields.password || fields.password.length < 8) {
      errors.password = "Пожалуйста, введите пароль длиной не менее 8 символов.";
    }

    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://bilimjarys.online/identity/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user._id);
      setShowSuccessModal(true);
      setTimeout(() => window.location.assign("/tournaments"), 1000)
    } catch (err) {
      setShowErrorModal(true);
      setErrorMessage("Неверный пароль или логин!");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFields({
      fullName,
      email,
      password,
    });

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0]; // Получите имя первого поля с ошибкой
      setShowErrorModal(true);
      setErrorMessage(`Пожалуйста, заполните поле "${firstErrorField}" корректно.`);
      return;
    }

    try {
      const res = await axios.post("https://bilimjarys.online/identity/signup", {
        fullName: fullName,
        email: email,
        password: password,
        age: age,
        school: school,
      });
      console.log(res)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user._id);
      setShowSuccessModal(true);
      setTimeout(() => window.location.assign("/tournaments"), 1000)

    } catch (err) {
      if (err.response && err.response.status === 409) {
        setShowErrorModal(true);
        setErrorMessage("Такая почта уже привязана.");
      } else {
        setShowErrorModal(true);
        setErrorMessage("Ошибка при регистрации.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setErrorMessage("");
  };
  return (
    <section id="auth">
      <div className="container">
        <div className="flex-center" id="tabs">
          <p
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Войти
          </p>
          <p
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Регистрация
          </p>
        </div>
        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="join" type="submit">
              Войти
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <input
              type="text"
              placeholder="Фамилие и имя"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Возраст"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Школа"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="join">Зарегистрироваться</button>
          </form>
        )}
      </div>
      <Modal isOpen={showSuccessModal} onClose={handleCloseModal}>
        <h2>Успешно!</h2>
        <p>Вы успешно авторизовались!</p>
      </Modal>
      <Modal isOpen={showErrorModal} onClose={handleCloseModal}>
        <h2>Ошибка!</h2>
        <p>{errorMessage}</p>
      </Modal>
    </section>
  );
}
