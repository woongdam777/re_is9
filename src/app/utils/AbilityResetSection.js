import React, { useState, useEffect } from 'react';

export default function AbilityResetSection() {
  const [lockValue, setLockValue] = useState(1); // Default lock value
  const [inputSilverValue, setInputSilverValue] = useState(0);
  const [inputPageValue, setInputPageValue] = useState(0);
  const [maxReAbilltyCount, setMaxReAbilltyCount] = useState(0);

  useEffect(() => {
    calculateMaxAbility();
  }, [lockValue, inputSilverValue, inputPageValue]);

  function calculateMaxAbility() {
    let bs = 2000 * lockValue; // Silver cost based on lock value
    let bp = 10 * lockValue;   // Page cost based on lock value

    let silverCount = Math.floor(inputSilverValue / bs);
    let pageCount = Math.floor(inputPageValue / bp);

    setMaxReAbilltyCount(Math.min(silverCount, pageCount));
  }

  return (
    <div className="input-container">
      <div className="component-input">
        <label htmlFor="inputSilver">현재 은화:</label>
        <div>
          <input 
            type="number" 
            id="inputSilver" 
            placeholder="값 입력" 
            value={inputSilverValue} 
            onChange={(e) => setInputSilverValue(parseInt(e.target.value) || 0)} 
          />
          &nbsp;M
        </div>
      </div>

      <div className="component-input">
        <label htmlFor="inputPage">현재 순백의 주문서:</label>
        <div>
          <input 
            type="number" 
            id="inputPage" 
            placeholder="값 입력" 
            value={inputPageValue} 
            onChange={(e) => setInputPageValue(parseInt(e.target.value) || 0)} 
          />
          &nbsp;개
        </div>
      </div>

      <div className="component-input">
        <span>잠금 슬롯 개수</span>
        <div className="lock-select">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="lock-option">
              <input 
                type="radio" 
                name="lock" 
                id={`lock${i}`} 
                value={Math.pow(2, i)}
                checked={lockValue === Math.pow(2, i)}
                onChange={() => setLockValue(Math.pow(2, i))}
              />
              <label htmlFor={`lock${i}`}>{i}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="component-input">
        <span>재설정가능 최대횟수 :</span>
        <span id="maxReAbillty">{maxReAbilltyCount} 번</span>
      </div>
    </div>
  );
}