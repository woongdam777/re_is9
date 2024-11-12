'use client';

import Link from 'next/link';
import styles from '../style/Header.module.css';

export default function Header({ onNavClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.mainTitle}>
          <h1 className={styles.gradientText}>War3 IS9</h1>
        </Link>
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
            {/* 추가 항목 */}
          </ul>
        </nav>
      </div>
    </header>
  );
}