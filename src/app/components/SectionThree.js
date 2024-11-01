'use client';

import { useState } from 'react';
import { PreBlock4, PreBlock5, PreBlock6, PreBlock7, PreBlock8, PreBlock9 } from './PreBlocks';
import AwakenSection from '../utils/AwakenSection';
import AbilityResetSection from '../utils/AbilityResetSection';

export default function SectionThree() {
  const [selectedInfo, setSelectedInfo] = useState('infoSectionZero');

  return (
    <section className="section-three">
      <div className="section-nav">
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionZero')}>각성</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionOne')}>지옥파티</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionTwo')}>성장</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionThree')}>어빌</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionFore')}>펫스킬</div>
      </div>

      {/* 각성 섹션 */}
      {selectedInfo === 'infoSectionZero' && (
        <>
          <AwakenSection />
          <div className="formula">
            <PreBlock4 />
          </div>
        </>
      )}

      {/* 지옥파티 섹션 */}
      {selectedInfo === 'infoSectionOne' && (
        <div className="formula">
          <PreBlock5 />
        </div>
      )}

      {/* 성장 섹션 */}
      {selectedInfo === 'infoSectionTwo' && (
        <div className="formula">
          <PreBlock6 />
        </div>
      )}

      {/* 어빌 섹션 */}
      {selectedInfo === 'infoSectionThree' && (
        <>
          <AbilityResetSection />
          <div className="formula">
            <PreBlock7 />
            <PreBlock8 />
          </div>
        </>
      )}

      {/* 펫스킬 섹션 */}
      {selectedInfo === 'infoSectionFore' && (
        <div className="formula">
          <PreBlock9 />
        </div>
      )}
    </section>
  );
}