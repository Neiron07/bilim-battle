import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);


  function onChange() {
    setIsCaptchaSuccess(true)
  }
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

    if (!isCaptchaSuccessful) {
      // Если капча не пройдена, предотвратить отправку
      setShowErrorModal(true);
      setErrorMessage("Подтвердите, что вы не робот.");
      return;
    }

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
              placeholder="ФИО"
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
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="custom-select"
            >
              <option value="" disabled>
                Выберите класс
              </option>
              <option value="5">Ученик 5 класса</option>
              <option value="6">Ученик 6 класса</option>
              <option value="7">Ученик 7 класса</option>
              <option value="8">Ученик 8 класса</option>
              <option value="9">Ученик 9 класса</option>
              <option value="10">Ученик 10 класса</option>
              <option value="11">Ученик 11 класса</option>
              <option value="0">Родитель</option>
            </select>
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
            <div className="horizontal-line"></div>
            <ReCAPTCHA
              sitekey="6LcI5gwoAAAAAA2g0MZSLIQY-DyEBo2Z8iEw5MGZ"
              onChange={onChange}
            />
            <div className="terms">
              <p style={{ fontSize: 'smaller' }}>
                <span style={{ fontWeight: 'bold' }}>Примечание:</span> При регистрации на нашем сайте, вы сразу же соглашаетесь с нашими условиями использования.
                Пожалуйста, ознакомьтесь с нашим <a href="https://docs.google.com/document/d/1y6NIbUcGny4S92d7oEb40-3o6OjuiBWXYjwJdQLn6nk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>Пользовательским соглашением</a> и <a href="https://docs.google.com/document/d/1zf8sXhWOylNG8Y6IbibwvKiqOwWTyEqjnRICKEr-ZmM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>Политикой использования файлов cookie</a>, а также с нашими правилами Честной игры.
              </p>
            </div>
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
