'use client';

import { useState } from 'react';
import SectionCharacter from './SectionCharacter';
import SectionItem from './SectionItem';
import SectionPath from './SectionPath';

export default function SectionCalc() {
  const [selectedInfo, setSelectedInfo] = useState('infoSectionCharacter');

  const sections = [
    { id: 'infoSectionCharacter', label: '캐릭터정보' },
    { id: 'infoSectionItem', label: '아이템정보' },
    { id: 'infoSectionPatchNote', label: '패치노트' }
  ];

  return (
    <section className="section-info">
      <div className="section-nav">
          {sections.map(section => (
              <div
                  key={section.id}
                  className={`lowerSection ${selectedInfo === section.id ? 'active' : ''}`}
                  onClick={() => setSelectedInfo(section.id)}
              >
                  {section.label}
              </div>
          ))}
      </div>

      {selectedInfo === 'infoSectionCharacter' && (
          <>
            <div>
              <div className="section-nav">
                <SectionCharacter />
              </div>
            </div>
          </>
      )}
      {selectedInfo === 'infoSectionItem' && (
          <>
            <div>
              <div className="section-nav">
                <SectionItem />
              </div>
            </div>
          </>
      )}
      {selectedInfo === 'infoSectionPatchNote' && (
          <>
            <div>
              <div className="section-nav">
                <SectionPath />
              </div>
            </div>
          </>
      )}


    </section>
  );
}