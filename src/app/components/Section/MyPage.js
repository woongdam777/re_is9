'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../style/MyPage.module.css';

export default function MyPage() {
  const { user } = useAuth();
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      handleSearch(user.war3Id);  // 사용자의 war3Id를 검색
    }
  }, [user]);

  const handleSearch = async (searchKeyword) => {
    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(searchKeyword)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResult(data);
      } else {
        setSearchResult(null);
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
        <h1>공사중</h1>
      </div>
      <div className={styles.myPageContainer}>
        {error && <p className={styles.error}>{error}</p>}
        {searchResult ? (
          <div className={styles.resultCard}>
          <h3>캐릭터 정보</h3>
          <p className={styles.lastSave}>마지막 저장 시간: {searchResult.result.Date}</p>
          <table className={styles.resultTable}>
            <tbody>
              <tr>
                <td colSpan="2">
                  {searchResult.result.Name} {searchResult.result.Nickname && <span>| {searchResult.result.Nickname}</span>}
                </td>
              </tr>
              <tr>
                <td>
                  {searchResult.result.Job}
                </td>
                <td>
                  <div className={styles.textLeft}>
                    Lv.{searchResult.result.Level}<br />
                    {searchResult.result['Force Level']}<br />
                    {searchResult.result['Hell Level']}<br />
                    전용템 강화 : {searchResult.result['Class Item']}
                  </div>
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
              </tbody>
              </table>
            </div>
        ):(
          <div>
            <p>war3 ID가 없습니다.</p>
            <p>회원정보 (war3 ID)를 수정해주세요</p>
          </div>
        )}
      </div>
    </section>
  );
}