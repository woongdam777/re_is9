import { useState, useEffect } from 'react';
import styles from '../style/Home.module.css';
import JobChart from '../components/JobChart';

const versions = ['A19.6', 'A19.3', 'A18.8', 'A17.91', 'A17.5'];
const CACHE_KEY = 'jobRankData';
const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

export default function VersionAndJobRank() {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [versionData, setVersionData] = useState(null);
  const [error, setError] = useState(null);

  const handleVersionChange = (version) => {
    setSelectedVersion(version);
    fetchData(version);
  };

  const fetchData = async (version) => {
    const cachedData = localStorage.getItem(`${CACHE_KEY}_${version}`);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setVersionData(data);
        return;
      }
    }

    try {
      const response = await fetch(`/api/rank?version=${version}`);
      const data = await response.json();
      
      if (response.ok) {
        setVersionData(data);
        localStorage.setItem(`${CACHE_KEY}_${version}`, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        setError(null);
      } else {
        setVersionData(null);
        setError(data.error);
      }
    } catch (error) {
      setVersionData(null);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData(selectedVersion);
    const intervalId = setInterval(() => fetchData(selectedVersion), CACHE_DURATION);
    return () => clearInterval(intervalId);
  }, [selectedVersion]);

  return (
    <div className={styles.jobComponent}>
      <div className={styles.jobRankTitle}>
        <div className={styles.buttonGroup}>
          {versions.map((version) => (
            <button
              key={version}
              onClick={() => handleVersionChange(version)}
              className={selectedVersion === version ? styles.active : ''}
            >
              {version}
            </button>
          ))}
        </div>
      </div>
     
      {versionData && (
        <div className={styles.jobRankChart}>
          <h4>{versionData.version} 직업별 인원 분포</h4>
          <h6>수련장초기화 후 | {versionData.date} 기준</h6>
          <h6>총인원 : {versionData.total} 명</h6>
          <JobChart ranks={versionData.ranks} />
        </div>
      )}
      
      {error && <p>Error: {error}</p>}
    </div>
  );
}