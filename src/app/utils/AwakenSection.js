// AwakenSection.js
import React, { useState, useEffect } from 'react';

const awakenLevels = [1, 5000, 20000, 100000, 500000, 2500000, 10000000, 50000000, 300000000, 1000000000];
const hellReward = [1000, 2000, 4000, 8000, 12000, 25000, 60000, 120000];

export default function AwakenSection() {
  const [awakenValue, setAwakenValue] = useState('');
  const [nowAwaken, setNowAwaken] = useState('');
  const [needAwaken, setNeedAwaken] = useState('');
  const [hellValue, setHellValue] = useState(5);
  const [clearNeeded, setClearNeeded] = useState(0);

  useEffect(() => {
    if (awakenValue) {
      calculateAwaken(awakenValue);
    }
    calculateClear();
  }, [awakenValue,hellValue]);

  function calculateAwaken(value) {
    const awakenValueInt = parseInt(value, 10);
    let now = 0;
    let result = 0;

    for (let i of awakenLevels) {
      if (awakenValueInt < i) {
        result = i - awakenValueInt;
        break;
      }
      now++;
    }

    setNowAwaken(`Lv ${now} / ${240 - (10 * (now - 1))}쿨 / 피해량 ${(now - 1) * 10}${(now >= 5) ? ' + 25% 증가' : '% 증가'}`);
    setNeedAwaken(`${result} 경험치`);
  }

  function calculateClear() {
    const needAwakenInt = parseInt(needAwaken.replace(/\D/g,'', ''), 10);
    const reward = hellReward[hellValue - 1]; 
    if (needAwakenInt && reward) {
      const bonusesNeeded = Math.ceil(needAwakenInt / reward);
      setClearNeeded(bonusesNeeded);
    } else {
      setClearNeeded(0);
    }
  }

  return (
    <div className="input-container">
      <div className="component-input">
        <label htmlFor="inputAwaken">현재 각성 경험치:</label>
        <input 
          type="number" 
          id="inputAwaken" 
          placeholder="값 입력" 
          value={awakenValue} 
          onChange={(e) => setAwakenValue(e.target.value)} 
        />
      </div>
      <div className="component-input">
        <span>현재 각성 레벨:</span>
        <span id="nowAwaken">{nowAwaken}</span>
      </div>
      <div className="component-input">
        <span>다음 각성 필요량:</span>
        <span id="needAwaken">{needAwaken}</span>
      </div>
      <div className="component-hell">
        <div className="component-input">
          <span>지옥파티 클리어 단계</span>
        </div>
        <div className="component-input">
          <div className="hell-select">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="hell-option">
                  <input 
                    type="radio" 
                    name="hell" 
                    id={`hell${i}`} 
                    value={i}
                    checked={hellValue === i}
                    onChange={() => setHellValue(i)}
                  />
                  <label htmlFor={`hell${i}`}>{i}</label>
                </div>
            ))}
          </div>
          <div>
            <span>필요 클리어 보너스 : </span>
            <span>{clearNeeded} 개</span>
          </div>
          <div>
            <span>필요 출석일수 : </span>
            <span>{Math.ceil(clearNeeded/5)} 개</span>
          </div>
        </div>
      </div>
    </div>
  );
}