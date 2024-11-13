import { useState, useEffect } from 'react';
import styles from '../style/Home.module.css';
import JobChart from '../components/JobChart';

const versions = ['v18.8'];

export default function VersionAndJobRank() {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [versionData, setVersionData] = useState(null);
  const [error, setError] = useState(null);

  const handleVersionChange = async (version) => {
    setSelectedVersion(version);
    await fetchData(version); // Fetch data for the selected version
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
    <div>
      <div className={styles.jobRankTitle}>
        <h2>버전 선택</h2>
        <div className="button-group">
          {versions.map((version) => (
            <button
              key={version}
              onClick={() => handleVersionChange(version)}
              className={selectedVersion === version ? 'active' : ''}
            >
              {version}
            </button>
          ))}
        </div>
      </div>
     
      {versionData && (
        <div className={styles.jobRankChart}>
          <h4>{versionData.version} 직업별 인원 분포</h4>
          <h6>{versionData.date} 기준, 수련장사용인원</h6>
          <h6>총인원 : {versionData.total} 명</h6>
          <JobChart ranks={versionData.ranks} />
          {/* <ul>
            {Object.entries(versionData.ranks).map(([job, { score, count }]) => (
              <li key={job}>
                {job}: 점수 {score}, 인원 {count}
              </li>
            ))}
          </ul> */}

        </div>
      )}
      
      {error && <p>Error: {error}</p>}
    </div>
  );
}