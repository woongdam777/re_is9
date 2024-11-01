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
            <li onClick={() => onNavClick('section-one')}>
              <i className="fa-solid fa-link"></i> 링크
            </li>
            <li onClick={() => onNavClick('section-two')}>
              <i className="fa-solid fa-bolt"></i> 포스
            </li>
            <li onClick={() => onNavClick('section-three')}>
            <i className="fa-solid fa-circle-info"></i> 정보
            </li>
            <li onClick={() => onNavClick('section-four')}>
            <i className="fa-solid fa-magnifying-glass"></i> 검색
            </li>
            {/* 추가 항목 */}
          </ul>
        </nav>
      </div>
    </header>
  );
}