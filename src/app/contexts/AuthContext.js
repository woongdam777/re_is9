import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../utils/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  setPersistence, 
  browserSessionPersistence,
  sendEmailVerification,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updateProfile 
} from 'firebase/auth';
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

  const login = async (email, password) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let userData = await getUserData(userCredential.user.uid);
      
      if (!userData) {
        await saveUserData(userCredential.user.uid, {
          email: userCredential.user.email,
          nickname: '',
          war3Id: ''
        });
        userData = await getUserData(userCredential.user.uid);
      }
      
      localStorage.setItem('loginTime', new Date().getTime().toString());
      setUser({ ...userCredential.user, ...userData });
      setError('');

      if (!userCredential.user.emailVerified) {
        setError('이메일 인증이 필요합니다. 인증 이메일을 확인해주세요.');
        await sendVerificationEmail();
      }
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Google login successful:", userCredential);
      const userData = await getUserData(userCredential.user.uid);
      
      if (!userData) {
        await saveUserData(userCredential.user.uid, {
          email: userCredential.user.email,
          nickname: userCredential.user.displayName || '',
          war3Id: '',
          emailVerified: userCredential.user.emailVerified
        });
      }
      
      const updatedUserData = await getUserData(userCredential.user.uid);
      setUser({ ...userCredential.user, ...updatedUserData });
      
      if (!userCredential.user.emailVerified) {
        setError('이메일 인증이 필요합니다. 인증 이메일을 확인해주세요.');
        await sendVerificationEmail();
      } else {
        setError('');
      }
      
      return true;
    } catch (error) {
      console.error('Google 로그인 중 오류 발생:', error);
      setError('Google 로그인에 실패했습니다.');
      return 'false';
    }
  };

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      if (updatedUser.emailVerified) {
        // 이메일이 인증되었다면 사용자 데이터 업데이트
        await saveUserData(updatedUser.uid, {
          emailVerified: true
        });
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

        await updateProfile(auth.currentUser, {
          emailVerified: true
        });

        await saveUserData(result.user.uid, {
          email: result.user.email,
          emailVerified: true
        });

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

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('loginTime');
      setUser(null);
      setError('');
    } catch (error) {
      setError('로그아웃 중 오류가 발생했습니다.');
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
      checkEmailVerification 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}