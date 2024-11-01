import { useRef, useState } from 'react';
import Search from '../utils/Search';
import { captureAndCopy, captureAndDownload } from '../utils/ImageCapture';
import styles from '../style/SearchResult.module.css';

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

  return (
    <section className="section-four">
      <div className="input-container">
        <div className="awakenDetail">
          <p>1시간 단위로 업데이트[5분정도 소요]</p>
          <p>포스스톤 랭킹 300위까지만 검색가능</p>
        </div>
        <Search onSearch={handleSearchResult} />
        <div ref={captureRef} id="searchResult">
          {error && <p className="error-message">{error}</p>}
          {searchResult && (
            <div className={styles.resultCard}>
              <h3>캐릭터 정보
                <div>
                  <i className="fa-regular fa-copy" onClick={() => handleCaptureAndCopy()}></i>
                  <i className="fa-solid fa-download" onClick={() => handleCaptureAndDownload()}></i>
                </div>
              </h3>
              <p className={styles.lastSave}>마지막 저장 시간: {searchResult.result.Date}</p>
              <table className={styles.resultTable}>
                <tbody>
                  <tr>
                    <th>워크 아이디</th>
                    <td>{searchResult.result.Name}</td>
                  </tr>
                  <tr>
                    <th>닉네임</th>
                    <td>{searchResult.result.Nickname}</td>
                  </tr>
                  <tr>
                    <th>클래스</th>
                    <td>{searchResult.result.Job}</td>
                  </tr>
                  <tr>
                    <th>【레벨】 포스</th>
                    <td>【Lv.{searchResult.result.Level}】 {searchResult.result['Force Level']}</td>
                  </tr>
                  <tr>
                    <th>각성 레벨</th>
                    <td>{searchResult.result['Hell Level']}</td>
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
              <p className={styles.lastUpdate}>마지막 업데이트: {searchResult.updateTime}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}