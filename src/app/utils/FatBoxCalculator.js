import React, { useState, useMemo } from "react";
import styles from "../style/FatBoxCalc.module.css";

const fatBox = [
  { value: 4000000, name: "펫 스킬 랜덤상자 A등급" },
  { value: 600000, name: "펫 스킬 랜덤상자 A-B등급" },
  { value: 100000, name: "펫 스킬 랜덤상자 A-C등급" },
];

const hellGrade = [90, 180, 270, 540, 1800, 4500, 9000, 27000];

const calculatePetBoxes = (totalPoints) => {
  // Case 1: 가장 작은 상자만 구매
  const smallestBox = fatBox[fatBox.length - 1];
  const case1 = {
    name: smallestBox.name,
    count: Math.floor(totalPoints / smallestBox.value),
    totalCost: Math.floor(totalPoints / smallestBox.value) * smallestBox.value
  };

  // Case 2: 큰 상자부터 작은 상자 순으로 구매
  let remainingPoints = totalPoints;
  const case2 = fatBox.reduce((acc, box) => {
    const count = Math.floor(remainingPoints / box.value);
    if (count > 0) {
      acc.push({
        name: box.name,
        count: count,
        totalCost: count * box.value
      });
      remainingPoints -= count * box.value;
    }
    return acc;
  }, []);

  return { case1, case2 };
};

const FatBoxCalc = () => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [clearedStage, setClearedStage] = useState(1);
  const [clearBonus, setClearBonus] = useState(0);

  const totalPoints = useMemo(() => {
    const stagePoints = hellGrade[clearedStage - 1] || 0;
    return currentPoints + stagePoints * clearBonus;
  }, [currentPoints, clearedStage, clearBonus]);

  const result = useMemo(() => {
    return calculatePetBoxes(totalPoints);
  }, [totalPoints]);

  return (
    <div className="input-container">
      <div className="component-input">
        <label htmlFor="currentPoints">현재 보유 포인트:</label>
        <input
          type="number"
          id="currentPoints"
          value={currentPoints}
          onChange={(e) => setCurrentPoints(Number(e.target.value))}
        />
      </div>
      <div className="component-input">
        <span>클리어한 단계</span>
        <div className={styles.stageSelect}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((stage) => (
            <div key={stage} className={styles.stageOption}>
              <input
                type="radio"
                name="stage"
                id={`stage${stage}`}
                value={stage}
                checked={clearedStage === stage}
                onChange={() => setClearedStage(stage)}
              />
              <label htmlFor={`stage${stage}`}>{stage}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="component-input">
        <label htmlFor="clearBonus">클리어 보너스:</label>
        <input
          type="number"
          id="clearBonus"
          value={clearBonus}
          onChange={(e) => setClearBonus(Number(e.target.value))}
          min="1"
          max="20"
        />
      </div>
      <div className={styles.totalPoints}>
        <h3>총 계산된 포인트: {totalPoints.toLocaleString()} 포인트</h3>
      </div>
      {result && (
        <div className={styles.resultContainer}>
          <div className={styles.resultBox}>
            <h4>Case 1: A-C상자만</h4>
            <p>{result.case1.name}: {result.case1.count}개</p>
            <p>총 비용: {result.case1.totalCost.toLocaleString()} 포인트</p>
          </div>
          <div className={styles.resultBox}>
            <h4>Case 2: 비싼거부터</h4>
            {result.case2.map((box, index) => (
              <p key={index}>{box.name}: {box.count}개</p>
            ))}
            <p>총 비용: {result.case2.reduce((sum, box) => sum + box.totalCost, 0).toLocaleString()} 포인트</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FatBoxCalc;