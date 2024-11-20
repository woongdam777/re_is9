'use client';

import { useState } from 'react';
import styles from '../style/LoginBox.module.css';

export default function LoginBox() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <aside className={styles.loginBox}>
      {!isLoggedIn ? (
        <div className={styles.loginForm}>
          <h3>로그인[구현중]</h3>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <button onClick={() => setIsLoggedIn(true)}>로그인</button>
        </div>
      ) : (
        <div className={styles.userInfo}>
          <h3>환영합니다!</h3>
          <button onClick={() => setIsLoggedIn(false)}>로그아웃</button>
        </div>
      )}
    </aside>
  );
}