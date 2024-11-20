'use client';

import { useState } from 'react';
import Header from '../app/components/Header';
import LoginBox from './components/LoginBox';
import SectionLink from '../app/components/SectionLink';
import SectionHome from '../app/components/SectionHome';
import SectionInfo from '../app/components/SectionInfo';
import SectionCalc from './components/SectionCalc';
import SectionSearch from './components/SectionSearch';
import '../app/globals.css';

export default function Home() {
  const [activeSection, setActiveSection] = useState('section-home');

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="body">
      <Header onNavClick={handleNavClick} />
      <div className="content-wrapper">
        <LoginBox />
        <main>
          {activeSection === 'section-home' && <SectionHome />}
          {activeSection === 'section-link' && <SectionLink />}
          {activeSection === 'section-calc' && <SectionCalc />}
          {activeSection === 'section-info' && <SectionInfo />}
          {activeSection === 'section-search' && <SectionSearch />}
        </main>
      </div>
      <footer>
        [ 건의&문의&커피 : <a href="https://open.kakao.com/o/gCsNT4Wg"><i className="fa-solid fa-carrot"></i></a> ] &nbsp;&nbsp;&nbsp;  [ 제작: 사탕주면따라가요 ]
      </footer>
    </div>
  );
}