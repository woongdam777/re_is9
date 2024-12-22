'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from '../app/components/Header';
import LoginBox from './components/LogSign/LoginBox';
import MyPage from './components/Section/MyPage';
import Profile from './components/Section/Profile';
import SectionHome from './components/Section/SectionHome';
import SectionLink from './components/Section/SectionLink';
import SectionInfo from './components/Section/SectionInfo';
import SectionCalc from './components/Section/SectionCalc';
import SectionPath from './components/Section/SectionPath';
import SectionSearch from './components/Section/SectionSearch';
import { AuthProvider } from './contexts/AuthContext';
import '../app/globals.css';

function MainContent() {
  const [activeSection, setActiveSection] = useState('section-home');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setActiveSection('mypage');
    } else {
      setActiveSection('section-home');
    }
  }, [user]);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };
 
  return (
    <div className="body">
      <Header onNavClick={handleNavClick} />
      <div className="content-wrapper">
        <LoginBox setActiveSection={setActiveSection} />
        <main>
          {activeSection === 'mypage' && user && <MyPage />}
          {activeSection === 'profile' && user && <Profile />}
          {activeSection === 'section-home' && <SectionHome />}
          {activeSection === 'section-link' && <SectionLink />}
          {activeSection === 'section-calc' && <SectionCalc />}
          {activeSection === 'section-info' && <SectionInfo />}
          {activeSection === 'section-path' && <SectionPath />}
          {activeSection === 'section-search' && <SectionSearch />}
        </main>
      </div>
      <footer>
        [ 건의&문의&커피 : <a href="https://open.kakao.com/o/gCsNT4Wg"><i className="fa-solid fa-carrot"></i></a> ] &nbsp;&nbsp;&nbsp;  [ 제작: 사탕주면따라가요 ]
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}