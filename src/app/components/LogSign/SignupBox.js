'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../style/LoginSignBox.module.css';

export default function SignupBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [war3Id, setWar3Id] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  const { login, googleLogin, sendVerificationEmail } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!war3Id) {
      setError('war3 ID를 입력해야 합니다.');
      return;
    }

    try {
      await login(email, password);
      await saveUserData(auth.currentUser.uid, {
        email: email,
        nickname: nickname,
        war3Id: war3Id
      });

      await sendVerificationEmail();

      setSuccessMessage('인증이메일을 발송하였습니다. 이메일을 확인해주세요.');

      setPassword('');
      setWar3Id('');
      setNickname('');
      setEmail('');
    } catch (error) {
      console.error('회원가입 에러:', error);
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleGoogleSign = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!war3Id) {
      alert("war3 ID를 입력해주세요.");
      return;
    }

    try {
      const result = await googleLogin();
      if (result) {
        await saveUserData(auth.currentUser.uid, {
          email: auth.currentUser.email,
          nickname: nickname,
          war3Id: war3Id
        });

        await sendVerificationEmail();

        setSuccessMessage('인증이메일을 발송하였습니다. 이메일을 확인해주세요.');
      }
    } catch (error) {
      console.error('구글 가입 에러:', error);
      setError('구글 회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {!successMessage ? (
        <form className={styles.loginForm} onSubmit={handleSignup}>
          <h3>회원가입</h3>
          {!isGoogleSignup ? (
            <>
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
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="war3 ID"
                value={war3Id}
                onChange={(e) => setWar3Id(e.target.value)}
                required
              />
              <button type="submit">가입하기</button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="war3 ID"
                value={war3Id}
                onChange={(e) => setWar3Id(e.target.value)}
                required
              />
            </>
          )}
          <button 
            type="button" 
            onClick={() => setIsGoogleSignup(!isGoogleSignup)}
            className={styles.googleButton}
          >
            {isGoogleSignup ? "이메일로 가입하기" : "Google로 가입하기"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {isGoogleSignup && (
            <button type="button" onClick={handleGoogleSign}>Google로 가입하기</button>
          )}
        </form>
      ) : (
        <div className={styles.successMessage}>
          <h3>{successMessage}</h3>
        </div>
      )}
    </div>
  );
}