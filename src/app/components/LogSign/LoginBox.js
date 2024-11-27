import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SignupBox from './SignupBox';
import styles from '../../style/LoginSignBox.module.css';

export default function LoginBox({ setActiveSection }) {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, error, login, googleLogin, logout, sendVerificationEmail } = useAuth();
  const [isNewUser, setIsNewUser] = useState(false);

  // 로그인 세션 타임아웃 체크
  useEffect(() => {
    if (user) {
      const checkLoginTime = () => {
        const loginTime = localStorage.getItem('loginTime');
        const currentTime = new Date().getTime();
        if (loginTime && currentTime - parseInt(loginTime) > 1 * 60 * 60 * 1000) {
          logout();
        }
      };

      const timer = setInterval(checkLoginTime, 60000); // 1분마다 체크
      return () => clearInterval(timer);
    }
  }, [user, logout]);

  // 리다이렉트 결과 처리

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
                    {/* 로그인 폼을 임시로 숨김 */}
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
          <h3>{user.nickname ? `${user.nickname}님 환영합니다!` : '환영합니다!'}</h3>
          <p>{user.email}</p>
          {user.war3Id === 'none' ? (
            <>
              <p>war3 ID를 수정해주세요</p>
            </>
          ) : (
            <p>워크아이디 : {user.war3Id}</p>
          )}
          <button onClick={changeWar3ID}>회원정보수정</button>
          <button onClick={handleMyPageClick}>마이페이지</button>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      )}
    </aside>
  );
}