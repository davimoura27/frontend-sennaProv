import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { MagnifyingGlass, Sun, Moon, User } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";
import { authService } from "../../services/api/api";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [username, setUsername] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagem}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <ul className={styles.listHeader}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/favoritos">Favoritos</Link>
        </li>

        <li>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? (
              <Sun size={20} weight="bold" />
            ) : (
              <Moon size={20} weight="bold" />
            )}
          </button>
        </li>

        <li>
          {isLoggedIn ? (
            <div className={styles.userInfo} onClick={handleLogout}>
              <User size={24} weight="fill" className={styles.userIcon} />
              <span className={styles.username}>{username}</span>
            </div>
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          )}
        </li>
      </ul>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
