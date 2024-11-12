'use client';

import { useState, useEffect } from 'react';
import styles from '../style/Header.module.css';

export default function Header({ onNavClick }) {
  const [darkMode, setDarkMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme);
    document.body.setAttribute('data-theme', savedTheme); // data-theme 속성 설정
  }, []);

  const toggleDarkMode = () => {
    const newMode = darkMode === 'dark' ? 'light' : 'dark';
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode);
    document.body.setAttribute('data-theme', newMode); // data-theme 속성 업데이트
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleContainer}>
          <div className={styles.mainTitle} onClick={() => onNavClick('section-home')}>
            <h1 className={styles.gradientText}>War3 IS9</h1>
          </div>
          <div className={styles.darkBtn} onClick={toggleDarkMode}>
            {darkMode === 'dark' ? (<i className="fa-solid fa-sun"></i>) : (<i className="fa-solid fa-moon"></i>)}
          </div>
        </div>
        <nav>
          <ul className={styles.navList}>
            <li onClick={() => onNavClick('section-home')}>
              <i className="fa-solid fa-house"></i> <span>홈</span>
            </li>
            <li onClick={() => onNavClick('section-link')}>
              <i className="fa-solid fa-link"></i> <span>링크</span>
            </li>
            <li onClick={() => onNavClick('section-calc')}>
              <i className="fa-solid fa-calculator"></i> <span>계산기</span>
            </li>
            <li onClick={() => onNavClick('section-info')}>
              <i className="fa-solid fa-circle-info"></i> <span>아이템</span>
            </li>
            <li onClick={() => onNavClick('section-search')}>
              <i className="fa-solid fa-magnifying-glass"></i> <span>검색</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}