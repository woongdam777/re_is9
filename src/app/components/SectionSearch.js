'use client';

import { useRef, useState, useMemo } from 'react';
import Search from '../utils/Search';
import { captureAndCopy, captureAndDownload } from '../utils/ImageCapture';
import styles from '../style/SearchResult.module.css';

const calculateTotalForce = (fnString) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];
  const charges = fnString.split('|');
  return charges.reduce((sum, charge, index) => {
    const numCharge = parseInt(charge, 10);
    const multiplier = numbers[index] || 1;
    return isNaN(numCharge) ? sum : sum + (numCharge * multiplier);
  }, 0);
};

const extractForceLevel = (forceLevelString) => {
  const match = forceLevelString.match(/\((\d+)\)/);
  return match ? parseInt(match[1], 10) : 0;
};

export default function Home() {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const captureRef = useRef(null);

  const handleSearchResult = (result, error) => {
    setSearchResult(result);
    setError(error);
  };

  const handleCaptureAndCopy = () => {
    if (captureRef.current) {
      captureAndCopy(captureRef.current);
    }
  };

  const handleCaptureAndDownload = () => {
    if (captureRef.current) {
      captureAndDownload(captureRef.current);
    }
  };

  const { fnTotal, forceLevelValue, totalSum } = useMemo(() => {
    if (searchResult && searchResult.result['FN'] && searchResult.result['Force Level']) {
      const fnTotal = calculateTotalForce(searchResult.result['FN']);
      const forceLevelValue = extractForceLevel(searchResult.result['Force Level']);
      const totalSum = fnTotal + forceLevelValue;
      return { fnTotal, forceLevelValue, totalSum };
    }
    return { fnTotal: 0, forceLevelValue: 0, totalSum: 0 };
  }, [searchResult]);

  return (
    <section className="section-search">
      <div className="input-container">
        <div className={styles.awakenDetail}>
          <p>포스스톤 랭킹 300위까지만 검색가능</p>
          <p>저장시간과 업데이트시간은 다릅니다</p>
          <p>1시간 단위 업데이트[매시정각 5분내외 최신화]</p>
        </div>
        <Search onSearch={handleSearchResult} />
        <div ref={captureRef} id="searchResult">
          {error && <p className="error-message">{error}</p>}
          {searchResult && (
            <div className={styles.resultCard}>
              <h3>캐릭터 정보
                <div>
                  <i className="fa-regular fa-copy" onClick={handleCaptureAndCopy}></i>
                  <i className="fa-solid fa-download" onClick={handleCaptureAndDownload}></i>
                </div>
              </h3>
              <p className={styles.lastSave}>마지막 저장 시간: {searchResult.result.Date}</p>
              <table className={styles.resultTable}>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      {searchResult.result.Name} | {searchResult.result.Nickname}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {searchResult.result.Job}
                    </td>
                    <td>
                      【 Lv.{searchResult.result.Level} 】<br />
                      {searchResult.result['Force Level']}<br />
                      {searchResult.result['Hell Level']}
                    </td>
                  </tr>
                  <tr>
                    <th>포스스톤</th>
                    <td>{searchResult.result.Forcestone}</td>
                  </tr>
                  <tr>
                    <th>남은티켓수</th>
                    <td>{searchResult.result['Ticket Count']} 개</td>
                  </tr>
                  <tr>
                    <th>수련장점수</th>
                    <td>{searchResult.result['Train Score']} 점</td>
                  </tr>
                  {searchResult.result['FN'] && (
                    <>
                      <tr>
                        <th>보유량 / 총합</th>
                        <td>{fnTotal} / {totalSum}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <ForceTable fnString={searchResult.result['FN']} />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <p className={styles.lastUpdate}>마지막 업데이트 시간: {searchResult.updateTime}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ForceTable({ fnString }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];
  const charges = fnString.split('|');

  return (
    <table className={styles.resultFN}>
      <tbody>
        {[0, 1, 2, 3].map(rowIndex => (
          <tr key={rowIndex}>
            {charges.slice(rowIndex * 4, rowIndex * 4 + 4).map((charge, index) => {
              const number = numbers[rowIndex * 4 + index];
              return (
                <td key={index}>
                  [{number}] {charge}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}