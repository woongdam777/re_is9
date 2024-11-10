'use client';

import { useState } from 'react';
import ForceCalculator from '../utils/ForceCalculator';
import { PreBlock1, PreBlock2, PreBlock3, PreBlock4, PreBlock5, PreBlock6, PreBlock7, PreBlock8, PreBlock9 } from './PreBlocks';
import AwakenSection from '../utils/AwakenSection';
import AbilityResetSection from '../utils/AbilityResetSection';

export default function SectionCalc() {
  const [selectedInfo, setSelectedInfo] = useState('infoSectionZero');
  const [selectedForce, setSelectedForce] = useState('forceSectionOne');

  return (
    <section className="section-calc">
      <div className="section-nav">
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionForce')}>포스</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionZero')}>각성</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionOne')}>지옥파티</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionTwo')}>성장</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionThree')}>어빌</div>
        <div id="lowerSection" onClick={() => setSelectedInfo('infoSectionFore')}>펫스킬</div>
      </div>

      {/* 포스 섹션 */}
      {selectedInfo === 'infoSectionForce' && (
        <>
          <div>
            <div className="section-nav">
              <div id="lowerSection" onClick={() => setSelectedForce('forceSectionOne')}>포스스톤</div>
              <div id="lowerSection" onClick={() => setSelectedForce('forceSectionTwo')}>포스레벨</div>
            </div>
              {selectedForce === 'forceSectionOne' && (
                  <>
                      <ForceCalculator selectedForce={selectedForce} />
                      <ul id="resultList"></ul>
                      <div className="formula">
                          <PreBlock1 />
                          <PreBlock2 />
                      </div>
                  </>
              )}
              {selectedForce === 'forceSectionTwo' && (
                  <>
                      <ForceCalculator selectedForce={selectedForce} />
                      <div className="formula">
                        <PreBlock3 />
                      </div>
                  </>
              )}
          </div>
        </>
      )}

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