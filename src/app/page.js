'use client';

import { useState } from 'react';
import Header from '../app/components/Header';
import SectionOne from '../app/components/SectionOne';
import SectionTwo from '../app/components/SectionTwo';
import SectionThree from '../app/components/SectionThree';
import SectionFour from '../app/components/SectionFour';
import '../app/globals.css';

export default function Home() {
  const [activeSection, setActiveSection] = useState('section-one');

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="body">
      <Header onNavClick={handleNavClick} />
      <main>
        {activeSection === 'section-one' && <SectionOne />}
        {activeSection === 'section-two' && <SectionTwo />}
        {activeSection === 'section-three' && <SectionThree />}
        {activeSection === 'section-four' && <SectionFour />}
      </main>
      <footer>
        [ 건의&문의&커피 : <a href="https://open.kakao.com/o/gCsNT4Wg"><i className="fa-solid fa-carrot"></i></a> ] &nbsp;&nbsp;&nbsp;  [ 제작: 사탕주면따라가요 ]
      </footer>
    </div>
  );
}