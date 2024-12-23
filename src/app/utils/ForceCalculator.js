// utils/ForceCalculator.js

import React, { useState, useEffect, useCallback } from "react";

const denominations = [
  { value: 75000000, name: "진리의서" },
  { value: 1500000, name: "신화" },
  { value: 300000, name: "고대" },
  { value: 100000, name: "에픽" },
  { value: 25000, name: "레전더리" },
  { value: 5000, name: "유니크" },
  { value: 1000, name: "레어" },
  { value: 100, name: "매직" },
  { value: 1, name: "노말" },
];

const forceLevels = [
  1, 100, 250, 625, 1600, 6400, 16000, 38000, 83600, 334400, 800000, 1600000,
  2400000, 3200000, 5000000, 75000000,
];

const ForceCalculator = ({ selectedForce }) => {
  const calculateAndDisplay = useCallback(() => {
    const inputValue = document.getElementById("inputValue");
    const ticketValue = document.getElementById("ticketValue");
    const resultList = document.getElementById("resultList");
    const tenScore = document.getElementById("tenScore");
    const ticketUse = document.getElementById("ticketUse");
    const petScore = document.getElementById("petScore");

    let ticketCount = parseInt(ticketValue.value) / 10;
    let value =
      parseInt(inputValue.value) * 10 * 0.88 * Math.floor(ticketCount) * 0.1;
    let ticketRemainCount = parseInt(ticketValue.value) % 10;

    ticketUse.innerHTML =
      Math.floor(ticketCount) * 10 + "개 / " + ticketRemainCount + "개";
    tenScore.innerHTML = Math.floor(value) * 10 + " 점";
    petScore.innerHTML =
      Math.floor(
        Math.ceil(inputValue.value * 7.295) *
          Math.floor(ticketCount) *
          0.88 *
          10.4
      ) + " EXP";

    if (isNaN(value) || value < 0) {
      resultList.innerHTML = "<li>수련장 점수를 입력하세요.</li>";
      return;
    }

    let results = [];
    for (let denomination of denominations) {
      let quotient = Math.floor(value / denomination.value);
      if (quotient > 0) {
        results.push({ ...denomination, count: quotient });
      }
      value %= denomination.value;
    }

    displayResults(results);
  }, []);

  const displayResults = (results) => {
    const resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    if (results.length === 0) {
      resultList.innerHTML =
        "<li>토벌 가능한 최소 티켓수 10개이상 입력하세요.</li>";
      return;
    }

    results.forEach((result) => {
      const li = document.createElement("li");
      li.textContent = `${result.name} (${result.value.toLocaleString()}): ${
        result.count
      }개`;
      resultList.appendChild(li);
    });
  };

  const calculateAndDisplay2 = useCallback(() => {
    const inputForce = document.getElementById("inputForce");
    const nowForceDisplay = document.getElementById("nowForce");
    const needForceDisplay = document.getElementById("needForce");

    const forceValue = parseInt(inputForce.value, 10);

    let nowLevel = 0;
    let requiredForce = 0;

    for (let level of forceLevels) {
      if (forceValue < level) {
        requiredForce = level - forceValue;
        break;
      }
      nowLevel++;
    }

    nowForceDisplay.innerHTML = "Lv " + nowLevel;
    needForceDisplay.innerHTML = requiredForce + " 포스";
  }, []);

  useEffect(() => {
    if (selectedForce === "forceSectionOne") {
      const inputValueField = document.getElementById("inputValue");
      const ticketValueField = document.getElementById("ticketValue");

      inputValueField.addEventListener("input", calculateAndDisplay);
      ticketValueField.addEventListener("input", calculateAndDisplay);

      return () => {
        inputValueField.removeEventListener("input", calculateAndDisplay);
        ticketValueField.removeEventListener("input", calculateAndDisplay);
      };
    } else if (selectedForce === "forceSectionTwo") {
      const inputForceField = document.getElementById("inputForce");

      inputForceField.addEventListener("input", calculateAndDisplay2);

      return () => {
        inputForceField.removeEventListener("input", calculateAndDisplay2);
      };
    }
  }, [selectedForce, calculateAndDisplay, calculateAndDisplay2]);


    const [stones, setStones] = useState({
      normal: 0, magic: 0, rare: 0, unique: 0, legendary: 0,
      epic: 0, ancient: 0, mythic: 0, truthBook: 0,
    });
  
    const stoneNames = {
      normal: "노말", magic: "매직", rare: "레어", unique: "유니크",
      legendary: "레전더리", epic: "에픽", ancient: "고대", mythic: "신화", truthBook: "진리의 서",
    };
  
    const [totalStoneScore, setTotalStoneScore] = useState(0);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setStones((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    };
  
    useEffect(() => {
      const calculateTotal = () => {
        const stoneOrder = ['normal', 'magic', 'rare', 'unique', 'legendary', 'epic', 'ancient', 'mythic', 'truthBook'];
        const baseScores = {
          normal: 150, magic: 1950, rare: 5400, unique: 12300, legendary: 24750, epic: 42000, ancient: 88650, mythic: 204150, truthBook: 393750
        };
        const additionalScores = {
          normal: 0, magic: 0, rare: 1, unique: 4, legendary: 20, epic: 60, ancient: 180, mythic: 900, truthBook: 45000
        };
  
        let totalScore = 0;
        let highestStoneType = null;
  
        // 가장 높은 등급의 돌 찾기
        for (let i = stoneOrder.length - 1; i >= 0; i--) {
          if (stones[stoneOrder[i]] > 0) {
            highestStoneType = stoneOrder[i];
            break;
          }
        }
  
        if (highestStoneType) {
          // 가장 높은 등급의 돌의 기본 점수 적용
          totalScore += baseScores[highestStoneType];
  
          // 모든 돌에 대해 추가 점수 계산
          stoneOrder.forEach(stoneType => {
            if (stones[stoneType] > 0) {
              if (stoneType === highestStoneType) {
                // 가장 높은 등급의 돌은 개수에서 1을 뺀 만큼 추가 점수 적용
                totalScore += additionalScores[stoneType] * (stones[stoneType]);
              } else {
                // 나머지 돌들은 모든 개수에 대해 추가 점수 적용
                totalScore += additionalScores[stoneType] * stones[stoneType];
              }
            }
          });
        }
  
        return totalScore;
      };
  
      setTotalStoneScore(calculateTotal());
    }, [stones]);

  return (
    <>
      {selectedForce === "forceSectionOne" && (
        <div className="input-container">
          <div className="component-input">
            <label htmlFor="inputValue">수련장 점수:</label>
            <input type="number" id="inputValue" placeholder="값 입력" />
          </div>
          <div className="component-input">
            <label htmlFor="ticketValue">보유한 티켓:</label>
            <input type="number" id="ticketValue" defaultValue={10} />
          </div>
          <div className="component-input">
            <span>토벌 점수:</span>
            <span id="tenScore"></span>
          </div>
          <div className="component-input">
            <span>소모된 티켓 / 남은 티켓:</span>
            <span id="ticketUse"></span>
          </div>
          <div className="component-input">
            <span>펫 경험치:</span>
            <span id="petScore"></span>
          </div>
          <div className="component-result">
            <ul id="resultList">수련장점수를 입력해주세요.</ul>
          </div>
        </div>
      )}

      {selectedForce === "forceSectionTwo" && (
        <div className="input-container">
          <div className="component-input">
            <label htmlFor="inputForce">현재 포스:</label>
            <input type="number" id="inputForce" placeholder="값 입력" />
          </div>
          <div className="component-input">
            <span>현재 포스 레벨:</span>
            <span id="nowForce"></span>
          </div>
          <div className="component-input">
            <span>다음 포스 필요량:</span>
            <span id="needForce"></span>
          </div>
        </div>
      )}

    {selectedForce === "forceSectionThree" && (
        <div className="input-container">
            <h2>보유스톤</h2>
            <div className="component-input">
                {Object.entries(stones).map(([key, value]) => (
                <div key={key} className="input-stone">
                    <label htmlFor={key}>{stoneNames[key]}:</label>
                    <input
                    type="number"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    />
                </div>
                ))}
            </div>
            <div className="component-input">
                <strong>총점: {totalStoneScore.toLocaleString()}</strong>
            </div>
        </div>
      )}
    </>
  );
};

export default ForceCalculator;
