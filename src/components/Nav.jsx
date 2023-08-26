import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faGamepad, faLifeRing } from '@fortawesome/free-solid-svg-icons';


export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserBalance(0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios.get(`https://bilimjarys.online/identity/me`, { headers })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('userData', JSON.stringify(response.data));
            setUserBalance(response.data.user.balance);
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <span className="logo-text">Bilim Jarys</span>
        </Link>
      </div>
      {isLoggedIn && (
        <span className="user-balance">Баланс: <strong>{userBalance} 🟡</strong></span>
      )}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu">
          <Link to={isLoggedIn ? `/user/${localStorage.getItem("id")}` : "/login"} className="menu-item">
            {isLoggedIn ? (
              <>
                <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> Мой аккаунт
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> Войти
              </>
            )}
          </Link>
          <div className="horizontal-liner"></div>
          <Link to="/tournaments" className="menu-item">
            <FontAwesomeIcon icon={faGamepad} className="menu-item-icon" /> Турниры
          </Link>
          <Link to="https://api.whatsapp.com/send/?phone=77761788978&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5,%D0%BF%D0%B8%D1%88%D1%83_%D1%81_bilimjarys" className="menu-item">
            <FontAwesomeIcon icon={faLifeRing} className="menu-item-icon" /> Тех. поддержка
          </Link>
          {isLoggedIn ? (
            <Link to="/" className="menu-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-item-icon" /> Выйти с аккаунта
            </Link>
          ) : null}
        </div>
      )}
    </nav>
  );
}
