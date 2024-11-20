import { useState, useEffect } from 'react';
import styles from '../style/Home.module.css';
import JobChart from '../components/JobChart';

const versions = ['A19.2', 'A18.8', 'A17.91', 'A17.5'];

export default function VersionAndJobRank() {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [versionData, setVersionData] = useState(null);
  const [error, setError] = useState(null);

  const handleVersionChange = async (version) => {
    setSelectedVersion(version);
    await fetchData(version); 
  };

  const fetchData = async (version) => {
    try {
      const response = await fetch(`/api/rank?version=${version}`);
      const data = await response.json();
      
      if (response.ok) {
        setVersionData(data);
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
  }, []);

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