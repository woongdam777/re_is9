'use client';

import { useState } from 'react';
import ForceCalculator from '../../utils/ForceCalculator';
import { PreBlock1, PreBlock2, PreBlock3, PreBlock4_1, PreBlock4_2, PreBlock5, PreBlock6, PreBlock7, PreBlock8, PreBlock9, PreBlock10_1, PreBlock10_2 } from '../PreBlocks';
import AwakenSection from '../../utils/AwakenSection';
import AbilityResetSection from '../../utils/AbilityResetSection';
import FatBoxCalc from '../../utils/FatBoxCalculator';

export default function SectionCalc() {
  const [selectedInfo, setSelectedInfo] = useState('infoSectionForce');
  const [selectedForce, setSelectedForce] = useState('forceSectionOne');

  const sections = [
      { id: 'infoSectionForce', label: '포스' },
      { id: 'infoSectionAwaken', label: '각성' },
      { id: 'infoSectionAbility', label: '어빌' },
      { id: 'infoSectionHell', label: '지옥파티' },
      { id: 'infoSectionGrow', label: '성장' },
      { id: 'infoSectionPet', label: '펫스킬' },
      { id: 'infoSectionGear', label: '전용템' }
  ];
  const forceSections = [
      { id: 'forceSectionOne', label: '포스스톤' },
      { id: 'forceSectionTwo', label: '포스레벨' }
  ];
    
  return (
    <section className="section-calc">
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

      {/* 포스 섹션 */}
      {selectedInfo === 'infoSectionForce' && (
        <>
          <div>
            <div className="section-nav">
                {forceSections.map(section => (
                    <div
                        key={section.id}
                        className={`lowerSection ${selectedForce === section.id ? 'active' : ''}`}
                        onClick={() => setSelectedForce(section.id)}
                    >
                        {section.label}
                    </div>
                ))}
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
      {selectedInfo === 'infoSectionAwaken' && (
        <>
          <AwakenSection />
          <div className="formula">
            <PreBlock4_1 />
            <PreBlock4_2 />
          </div>
        </>
      )}

      {/* 지옥파티 섹션 */}
      {selectedInfo === 'infoSectionHell' && (
        <>
          <FatBoxCalc />
          <div className="formula">
            <PreBlock5 />
          </div>
        </>
      )}

      {/* 성장 섹션 */}
      {selectedInfo === 'infoSectionGrow' && (
        <div className="formula">
          <PreBlock6 />
        </div>
      )}

      {/* 어빌 섹션 */}
      {selectedInfo === 'infoSectionAbility' && (
        <>
          <AbilityResetSection />
          <div className="formula">
            <PreBlock7 />
            <PreBlock8 />
          </div>
        </>
      )}

      {/* 펫스킬 섹션 */}
      {selectedInfo === 'infoSectionPet' && (
        <div className="formula">
          <PreBlock9 />
        </div>
      )}

      {/* 전용템 섹션 */}
      {selectedInfo === 'infoSectionGear' && (
        <div className="formula">
          <PreBlock10_1 />
          <PreBlock10_2 />
        </div>
      )}

    </section>
  );
}