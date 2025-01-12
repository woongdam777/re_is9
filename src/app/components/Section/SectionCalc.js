'use client';

import { useState } from 'react';
import ForceCalculator from '../../utils/ForceCalculator';
import { PreBlock1, PreBlock2, PreBlock3_1, PreBlock3_2, PreBlock4_1, PreBlock4_2, PreBlock5, PreBlock6, PreBlock7, PreBlock8, PreBlock9, PreBlock10_1, PreBlock10_2 } from '../PreBlocks';
import AwakenSection from '../../utils/AwakenSection';
import AbilityResetSection from '../../utils/AbilityResetSection';
import FatBoxCalc from '../../utils/FatBoxCalculator';

export default function SectionCalc() {
  const [selectedCalc, setselectedCalc] = useState('calcSectionForce');
  const [selectedForce, setSelectedForce] = useState('forceSectionOne');

  const sections = [
      { id: 'calcSectionForce', label: '포스' },
      { id: 'calcSectionAwaken', label: '각성' },
      { id: 'calcSectionAbility', label: '어빌' },
      { id: 'calcSectionHell', label: '지옥파티' },
      { id: 'calcSectionGrow', label: '성장' },
      { id: 'calcSectionPet', label: '펫스킬' },
      { id: 'calcSectionGear', label: '전용템' }
  ];
  const forceSections = [
      { id: 'forceSectionOne', label: '포스스톤' },
      { id: 'forceSectionTwo', label: '포스레벨' },
      { id: 'forceSectionThree', label: '수련장 기본점수' }
  ];
    
  return (
    <section className="section-calc">
      <div className="section-nav">
          {sections.map(section => (
              <div
                  key={section.id}
                  className={`lowerSection ${selectedCalc === section.id ? 'active' : ''}`}
                  onClick={() => setselectedCalc(section.id)}
              >
                  {section.label}
              </div>
          ))}
      </div>

      {/* 포스 섹션 */}
      {selectedCalc === 'calcSectionForce' && (
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
                        <PreBlock3_1 />
                      </div>
                  </>
              )}
              {selectedForce === 'forceSectionThree' && (
                  <>
                      <ForceCalculator selectedForce={selectedForce} />
                      <div className="formula">
                        <PreBlock3_2 />
                      </div>
                  </>
              )}
          </div>
        </>
      )}

      {/* 각성 섹션 */}
      {selectedCalc === 'calcSectionAwaken' && (
        <>
          <AwakenSection />
          <div className="formula">
            <PreBlock4_1 />
            <PreBlock4_2 />
          </div>
        </>
      )}

      {/* 지옥파티 섹션 */}
      {selectedCalc === 'calcSectionHell' && (
        <>
          <FatBoxCalc />
          <div className="formula">
            <PreBlock5 />
          </div>
        </>
      )}

      {/* 성장 섹션 */}
      {selectedCalc === 'calcSectionGrow' && (
        <div className="formula">
          <PreBlock6 />
        </div>
      )}

      {/* 어빌 섹션 */}
      {selectedCalc === 'calcSectionAbility' && (
        <>
          <AbilityResetSection />
          <div className="formula">
            <PreBlock7 />
            <PreBlock8 />
          </div>
        </>
      )}

      {/* 펫스킬 섹션 */}
      {selectedCalc === 'calcSectionPet' && (
        <div className="formula">
          <PreBlock9 />
        </div>
      )}

      {/* 전용템 섹션 */}
      {selectedCalc === 'calcSectionGear' && (
        <div className="formula">
          <PreBlock10_1 />
          <PreBlock10_2 />
        </div>
      )}

    </section>
  );
}