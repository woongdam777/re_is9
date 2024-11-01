// AwakenSection.js
import React, { useState, useEffect } from 'react';

const awakenLevels = [1, 5000, 20000, 100000, 500000, 2500000, 10000000, 50000000, 300000000, 1000000000];

export default function AwakenSection() {
  const [awakenValue, setAwakenValue] = useState('');
  const [nowAwaken, setNowAwaken] = useState('');
  const [needAwaken, setNeedAwaken] = useState('');

  useEffect(() => {
    if (awakenValue) {
      calculateAwaken(awakenValue);
    }
  }, [awakenValue]);

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
    </div>
  );
}