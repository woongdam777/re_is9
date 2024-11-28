import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, database, ref, update } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence, sendEmailVerification, isSignInWithEmailLink, signInWithEmailLink, updateProfile, signInWithCredential } from 'firebase/auth';
import { saveUserData, getUserData } from '../data/users';

const AuthContext = createContext({
  user: null,
  error: '',
  loading: true,
  login: async () => {},
  googleLogin: async () => false,
  logout: async () => {},
  setError: () => {},
  sendVerificationEmail: async () => false,
  completeEmailVerification: async () => false
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userData = await getUserData(currentUser.uid);
          if (userData) {
            if (!currentUser.emailVerified) {
              const isVerificationComplete = await completeEmailVerification();
              if (!isVerificationComplete) {
                await signOut(auth);
                setError('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
                setUser(null);
              }
            } else {
              setUser({ ...currentUser, ...userData });
            }
          } else {
            await signOut(auth);
            setError('가입된 정보가 없습니다. 회원가입을 해주세요.');
            setUser(null);
          }
        } catch (error) {
          console.error("사용자 데이터 로드 중 오류 발생:", error);
          setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const loadGoogleSDK = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };
  
  const signInWithGoogleSDK = () => {
    return new Promise((resolve, reject) => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: '977785714936-s3ekn039hbevbh3dnkvguvm7qirq3r79.apps.googleusercontent.com',
        scope: 'email profile',
        callback: (response) => {
          if (response.error) {
            console.error('Error:', response.error);
            reject(response);
          } else {
            resolve(response);
          }
        },
      });
      client.requestAccessToken();
    });
  };
  
  const handleGoogleLoginResult = async (result) => {
    try {
      const userData = await getUserData(result.user.uid);
      if (!userData) {
        await saveUserData(result.user.uid, {
          email: result.user.email,
          nickname: result.user.displayName || '',
          war3Id: 'none',
          emailVerified: result.user.emailVerified
        });
        setError('신규등록완료. 재로그인해주세요.');
        return false;
      }
      const updatedUserData = await getUserData(result.user.uid);
      setUser({ ...result.user, ...updatedUserData });
      setError('');
      return true;
    } catch (error) {
      console.error('사용자 데이터 처리 중 오류 발생:', error);
      setError('사용자 정보 처리에 실패했습니다.');
      return false;
    }
  };
  
  const googleLogin = async () => {
    try {
      if (isMobile()) {
        await loadGoogleSDK();
        const response = await signInWithGoogleSDK();
        const credential = GoogleAuthProvider.credential(null, response.access_token);
        const result = await signInWithCredential(auth, credential);
        return handleGoogleLoginResult(result);
      } else {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return handleGoogleLoginResult(result);
      }
    } catch (error) {
      console.error('Google 로그인 중 오류 발생:', error);
      setError('Google 로그인에 실패했습니다.');
      return false;
    }
  };
  
  const login = async (email, password) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let userData = await getUserData(userCredential.user.uid);
      if (!userData) {
        setError('회원가입 기록이 없습니다. 먼저 회원가입을 해주세요.');
        return;
      }
      const now = new Date();
      const formattedDate = now.toLocaleString();
      const userRef = ref(database, `users/${userCredential.user.uid}`);
      await update(userRef, { lastLogin: formattedDate });
      userData.lastLogin = formattedDate;
      localStorage.setItem('loginTime', now.getTime().toString());
      setUser({ ...userCredential.user, ...userData });
      setError('');
      if (!userCredential.user.emailVerified) {
        setError('이메일 인증이 필요합니다. 인증 이메일을 확인해주세요.');
        await sendVerificationEmail();
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('등록되지 않은 이메일입니다. 회원가입을 해주세요.');
      } else if (error.code === 'auth/wrong-password') {
        setError('비밀번호가 올바르지 않습니다. 다시 확인해주세요.');
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    }
  };

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      if (updatedUser.emailVerified) {
        await saveUserData(updatedUser.uid, { emailVerified: true });
        const updatedUserData = await getUserData(updatedUser.uid);
        setUser({ ...updatedUser, ...updatedUserData });
        setError('');
      } else {
        setError('이메일 인증이 필요합니다. 인증 이메일을 확인해주세요.');
      }
    }
  };

  const completeEmailVerification = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        await updateProfile(auth.currentUser, { emailVerified: true });
        await saveUserData(result.user.uid, { email: result.user.email, emailVerified: true });
        const updatedUserData = await getUserData(result.user.uid);
        setUser({ ...result.user, ...updatedUserData });
        setError('');
        return true;
      } catch (error) {
        console.error("이메일 인증 완료 중 오류 발생:", error);
        setError('이메일 인증을 완료하는 데 실패했습니다.');
        return false;
      }
    }
    return false;
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setError('인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
        return true;
      } catch (error) {
        console.error("인증 이메일 발송 중 오류 발생:", error);
        setError('인증 이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        return false;
      }
    } else {
      setError('로그인 상태가 아닙니다.');
      return false;
    }
  };

  const updateUserProfile = async (updatedData) => {
    if (!auth.currentUser) {
      setError('사용자가 로그인되어 있지 않습니다.');
      return false;
    }
    try {
      await updateProfile(auth.currentUser, {
        displayName: updatedData.nickname || auth.currentUser.displayName,
      });
      await saveUserData(auth.currentUser.uid, {
        nickname: updatedData.nickname,
        war3Id: updatedData.war3Id,
      });
      const updatedUserData = await getUserData(auth.currentUser.uid);
      setUser({ ...auth.currentUser, ...updatedUserData });
      setError('');
      return true;
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      setError('프로필 업데이트에 실패했습니다.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('loginTime');
      localStorage.removeItem('myPageData');
      setUser(null);
      setError('');
      return true;
    } catch (error) {
      setError('로그아웃 중 오류가 발생했습니다.');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      error,
      loading,
      login,
      googleLogin,
      logout,
      setError,
      sendVerificationEmail,
      completeEmailVerification,
      checkEmailVerification,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}