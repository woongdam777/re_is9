// SectionTwo.js

'use client';

import { useState } from 'react';
import { PreBlock1, PreBlock2, PreBlock3 } from './PreBlocks';
import ForceCalculator from '../utils/ForceCalculator';

export default function SectionTwo() {
    const [selectedForce, setSelectedForce] = useState('forceSectionOne');
  
    return (
      <section id="section-two" className="section-two">
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
      </section>
    );
}