import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faGamepad, faLifeRing, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from "../components/Modal";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBan, setIsBan] = useState(false);

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
            setIsBan(response.data.user.isBan)
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const navRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <nav className="navbar" ref={navRef}>
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
            <Link to={isLoggedIn ? `/user/${localStorage.getItem("id")}` : "/login"} className="menu-item" onClick={toggleMenu}>
              {isLoggedIn ? (
                <>
                  <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> <b>Мой аккаунт</b>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> <b>Войти</b>
                </>
              )}
            </Link>
            <div className="horizontal-liner"></div>
            <Link to="/tournaments" className="menu-item" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faGamepad} className="menu-item-icon" /> Турниры
            </Link>
            <Link to="/faq" className="menu-item" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faQuestionCircle} className="menu-item-icon"/> FAQ
            </Link>
            <Link to="https://t.me/bjsupport_bot" className="menu-item" onClick={toggleMenu}>
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
      <Modal isOpen={isBan} onClose={false}>
        <h2>Вы были забанены на платформе Bilim Jarys!</h2>
        <p>Вы имеете право подать аппеляцию, написав письмо на почту <b>bilimjarys@gmail.com</b></p>
      </Modal>
    </>
  );
}
