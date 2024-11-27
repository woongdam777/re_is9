"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../style/MyPage.module.css";

const CACHE_KEY = 'myPageData';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function MyPage() {
  const { user } = useAuth();
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setSearchResult(data);
            return;
          }
        }
        await handleSearch(user.war3Id);
      };

      fetchData();

      // Set up interval for periodic updates
      const intervalId = setInterval(() => fetchData(), CACHE_DURATION);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const handleSearch = async (war3Id) => {
    try {
      const response = await fetch(
        `/api/mypage?keyword=${encodeURIComponent(war3Id)}`
      );
      const data = await response.json();

      if (response.ok) {
        setSearchResult(data);
        // Cache the data with a timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      } else {
        setSearchResult(null);
        setError("데이터를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      setSearchResult(null);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };


  return (
    <section id="my-page" className="my-page">
      <div className={styles.myPageContainer}>
        <h1>마이페이지[임시]</h1>
      </div>
      <div className={styles.myPageContainer}>
        {/* {error && <p className={styles.error}>{error}</p>} */}
        {searchResult ? (
          <div className={styles.resultCard}>
            <div className={styles.cardTitle}>
              <div>
                <h4 className={styles.characterName}>
                  {searchResult.result.Name}{" "}
                  {searchResult.result.Nickname && (
                    <span className={styles.nickname}> | {searchResult.result.Nickname}</span>
                  )}
                </h4>
              </div>
              <div className={styles.cardTime}>
                <p>마지막 저장 시간: {searchResult.result.Date}</p>
                <p>마지막 업데이트 시간: {searchResult.updateTime}</p>
              </div>
            </div>

            <div className={styles.characterInfo}>
              <div className={styles.levelInfo}>
                <h2>캐릭터 정보</h2>
                <p>{searchResult.result.Job}</p>
                <p>레벨: {searchResult.result.Level}</p>
                <p>포스 레벨: {searchResult.result["Force Level"]}</p>
                <p>각성 레벨: {searchResult.result["Hell Level"]}</p>
                <p>전용템 강화: {searchResult.result["Class Item"]}</p>
                <p>골드: {searchResult.result["Money"].split("|")[0]}</p>
                <p>실버: {searchResult.result["Money"].split("|")[1]}</p>
              </div>
              <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                  <h5>포스스톤</h5>
                  <p>{searchResult.result.Forcestone}</p>
                </div>
                <div className={styles.statCard}>
                  <h5>남은 티켓 수</h5>
                  <p>{searchResult.result["Ticket Count"]} 개</p>
                </div>
                <div className={styles.statCard}>
                  <h5>수련장 점수</h5>
                  <p>{searchResult.result["Train Score"]} 점</p>
                </div>
              </div>
            </div>
            <div className={styles.forceInfo}>
              <div>
                <span>인벤토리 포스보유량</span>
                <ForceTable fnString={searchResult.result['FN']} />
              </div>
              <div>
                <span>포스변동</span>
                
              </div>
            </div>

          </div>
        ) : (
          <>
            {!user.war3Id ? (
              <div>
                <p>war3 ID가 없습니다.</p>
                <p>회원정보 (war3 ID)를 수정해주세요</p>
              </div>
            ) : (
              <div>
                <p>war3 ID 수정 후 30분 뒤에 정상작동합니다.</p>
                <p>기다려주세요</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ForceTable({ fnString }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 33, 40, 50];
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