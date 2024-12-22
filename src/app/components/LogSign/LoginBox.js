'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SignupBox from './SignupBox';
import styles from '../../style/LoginSignBox.module.css';

// 모바일 감지 커스텀 훅
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function LoginBox({ setActiveSection }) {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, error, login, googleLogin, logout, sendVerificationEmail } = useAuth();
  const [isNewUser, setIsNewUser] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (user) {
      const checkLoginTime = () => {
        const loginTime = localStorage.getItem('loginTime');
        const currentTime = new Date().getTime();
        if (loginTime && currentTime - parseInt(loginTime) > 1 * 60 * 60 * 1000) {
          logout();
        }
      };

      const timer = setInterval(checkLoginTime, 60000);
      return () => clearInterval(timer);
    }
  }, [user, logout]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      setEmail('');
      setPassword('');
      setActiveSection('mypage');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      if (result) {
        setActiveSection('mypage');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setActiveSection('section-home');
    }
  };

  const changeWar3ID = async () => {
    setActiveSection('profile');
  };

  const handleResendVerification = async () => {
    const result = await sendVerificationEmail();
    if (result) {
      alert('인증 이메일이 재발송되었습니다. 이메일을 확인해주세요.');
    }
  };

  const handleMyPageClick = () => {
    setActiveSection('mypage');
  };

  return (
    <aside className={styles.loginBox}>
      {!user ? (
        <>
          {!showSignup ? (
            <>
              <div>
                {isNewUser ? (
                  <div className={styles.successMessage}>
                    <h3>신규가입을 환영합니다.</h3>
                    <p>Google로 자동가입 완료되었습니다.</p>
                    <p>닉네임 및 war3 Id를 수정해주세요.</p>
                    <button
                      className={styles.toggleButton}
                      onClick={() => setShowSignup(true)}
                    >
                      회원가입하기
                    </button>
                  </div>
                ) : (
                  <form className={styles.loginForm} onSubmit={handleLogin}>
                    <h3>로그인</h3>
                    <div style={{ display: 'none' }}>
                      <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button type="submit">로그인</button>
                    </div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className={styles.googleButton}
                    >
                      Google로 로그인
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                    {error && error.includes('이메일 인증') && (
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        className={styles.resendButton}
                      >
                        인증 이메일 재발송
                      </button>
                    )}
                  </form>
                )}
                {isMobile && (
                  <div className={styles.warningMoblie}>
                    <h3>카카오톡 웹뷰에서는 로그인 안됩니다.</h3>
                    <h3>기본인터넷 앱 및 크롬앱을 이용해주세요.</h3>
                  </div>
                )}
                <div className={styles.buttonBox}>
                  {!isNewUser && (
                    <button
                      className={styles.toggleButton}
                      onClick={() => setShowSignup(true)}
                    >
                      회원가입하기
                    </button>
                  )}
                  {isNewUser && (
                    <button
                      className={styles.toggleButton}
                      onClick={() => setIsNewUser(false)}
                    >
                      처음으로
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div>
              <SignupBox />
              <button
                className={styles.toggleButton}
                onClick={() => {
                  setShowSignup(false);
                  setIsNewUser(false);
                }}
              >
                로그인으로
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.userInfo}>
          <div>
            <h3>{user.nickname ? `${user.nickname}님 환영합니다!` : '환영합니다!'}</h3>
            <p>{user.email}</p>
            {user.war3Id === 'none' ? (
              <p>war3 ID를 수정해주세요</p>
            ) : (
              <p>War3 ID : {user.war3Id}</p>
            )}
          </div>
          {isMobile ? (
            <div className={styles.mobileButtons}>
              <button onClick={changeWar3ID} aria-label="회원정보수정">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </button>
              <button onClick={handleMyPageClick} aria-label="마이페이지">
                <i className="fa-solid fa-gear"></i>
              </button>
              <button onClick={handleLogout} aria-label="로그아웃">
                <i className="fa-solid fa-share-from-square"></i>
              </button>
            </div>
          ) : (
            <>
              <button onClick={changeWar3ID}>회원정보수정</button>
              <button onClick={handleMyPageClick}>마이페이지</button>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          )}
        </div>
      )}
    </aside>
  );
}