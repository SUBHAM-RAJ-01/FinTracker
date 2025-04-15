// src/components/Navbar.js
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Apply selected theme to body
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/assets/mofinTrackerLogo.png" alt="mofinTracker Logo" />
        <span>mofinTracker</span>
      </div>

      <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
        <button onClick={toggleTheme} className={styles.link}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </nav>
  );
}
