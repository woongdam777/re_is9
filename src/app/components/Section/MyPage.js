"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../style/MyPage.module.css";
import ChartComponent from '../TicketChart';
import ForceChart from '../ForceChart';
import dynamic from 'next/dynamic';

const CACHE_KEY = 'myPageData';
const CACHE_DURATION = 10 * 60 * 1000; // 5 minutes in milliseconds

const LottieComponent = dynamic(() => import('../LottieComponent'), { ssr: false });

export default function MyPage() {
  const { user } = useAuth();
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setIsLoading(true);
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setSearchResult(data);
            setIsLoading(false);
            return;
          }
        }
        await handleSearch(user.war3Id);
      };
      fetchData();
      const intervalId = setInterval(() => fetchData(), CACHE_DURATION);
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const handleSearch = async (war3Id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/mypage?keyword=${encodeURIComponent(war3Id)}`
      );
      const data = await response.json();

      if (response.ok) {
        setSearchResult(data);
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
    } finally {
      setIsLoading(false);
    }
  };

  
  function ForceTable({ fnString }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 33, 40, 50];
    const charges = fnString.split('|').map(Number);
    const totalSum = charges.reduce((sum, charge) => sum + charge, 0);
    const curForce = searchResult.result["Force Level"];
    const extractedNumber = curForce.match(/\((\d+)\)/)?.[1];
    const totalForce = totalSum + (extractedNumber ? parseInt(extractedNumber) : 0);

    return (
      <div className={styles.forceCard}>
        <span>인벤토리 포스보유량</span>
        <table className={styles.resultFN}>
          <tbody>
            {chunk(charges, 3).map((rowCharges, rowIndex) => (
              <tr key={rowIndex}>
                {rowCharges.map((charge, index) => {
                  const numberIndex = rowIndex * 3 + index;
                  const number = numbers[numberIndex] || numberIndex + 1;
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
        <div className={styles.totalSum}>총합: {totalSum}</div>
        <div className={styles.totalSum}>총포스: {totalForce}</div>
      </div>
    );
  }

  function chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

  function formatNumber(num) {
    const trillion = 1_000_000_000_000;
    const billion = 1_000_000_000;
    const million = 1_000_000;

    let results = [];
    
    if (num >= million) {
      results.push(`${Math.floor(num / million).toLocaleString()} M (백만)`);
    }
    if (num >= billion) {
      results.push(`${Math.floor(num / billion).toLocaleString()} B (십억)`);
    }
    if (num >= trillion) {
      results.push(`${Math.floor(num / trillion).toLocaleString()} T (조)`);
    }

    return results;
  }

  return (
    <section id="my-page" className="my-page">
      <div className={styles.myPageContainer}>
        {isLoading ? (
          <div>
            <div className={styles.loading}>데이터를 불러오는 중...</div>
          </div>
        ) : (
          <>
            {error && <p className={styles.error}>{error}</p>}
            {searchResult ? (
              <div className={styles.resultCard}>
                <div className={styles.cardTitle}>
                  <div>
                    <h4 className={styles.characterName}>
                      {searchResult.result.Name}{" "}
                      {searchResult.result.Nickname && (
                        <span className={styles.nickname}>{searchResult.result.Nickname}</span>
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
                    <div className={styles.jobCard}>
                      <div className={styles.JobImg}>
                          <LottieComponent type="circle" width={40} height={40} />
                      </div>
                      <div>
                        <p>{searchResult.result.Job}</p>
                        <p>레벨: {searchResult.result.Level}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <p>포스 : {searchResult.result["Force Level"]}</p>
                      <p>각성 : {searchResult.result["Hell Level"]}</p>
                      <p>강화 : {searchResult.result["Class Item"]}</p>
                      <p>스톤 : {searchResult.result.Forcestone}</p>
                      <p>티켓: {searchResult.result["Ticket Count"]} 개</p>
                      <p>수련장: {searchResult.result["Train Score"]} 점</p>
                    </div>
                  </div>
                  <div className={styles.goodsInfo}>
                    <div className={styles.statCard}>
                      <p>금: {Number(searchResult.result["Money"].split("|")[0]).toLocaleString()}</p>
                      <p>은: {Number(searchResult.result["Money"].split("|")[1]).toLocaleString()}</p>
                      <br />
                      <span>실버 단위 환산</span>
                      {formatNumber(Number(searchResult.result["Money"].split("|")[1])).map((value, index) => (
                        <div key={index}>
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <ForceTable fnString={searchResult.result['FN']} />
                  </div>
                </div>
                <div className={styles.chartInfo}>
                  <div>
                    <span>티켓변동</span>
                    <div className={styles.chartContainer}>
                      <ChartComponent fnChart={searchResult.flowTicket} />
                    </div>
                  </div>
                  <div>
                    <span>인벤토리 포스변동</span>
                    <div className={styles.chartContainer}>
                      <ForceChart fnChart={searchResult.flowForce} />
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <>
                {user.war3Id==='none' ? (
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
          </>
        )}
      </div>
    </section>
  );
}
