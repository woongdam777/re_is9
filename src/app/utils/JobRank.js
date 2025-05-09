import { useState, useEffect, useCallback } from "react";
import styles from "../style/JobRank.module.css";
import JobChart from "../components/JobChart";

export default function VersionAndJobRank() {
  const [allVersionsData, setAllVersionsData] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/rank");
      const data = await response.json();

      if (response.ok) {
        const reversedData = Object.fromEntries(
          Object.entries(data).reverse()
        );
        setAllVersionsData(reversedData);
        setSelectedVersion(Object.keys(reversedData)[0]);
        setError(null);
      } else {
        setAllVersionsData(null);
        setError(data.error);
      }
    } catch (error) {
      setAllVersionsData(null);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVersionChange = (version) => {
    setSelectedVersion(version);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allVersionsData) {
    return <div>No data available</div>;
  }

  const versions = Object.keys(allVersionsData);

  return (
    <div className={styles.jobComponent}>
      {/* <div className={styles.jobRankTitle}>
        <div className={styles.buttonGroup}>
          {versions.map((version) => (
            <button
              key={version}
              onClick={() => handleVersionChange(version)}
              className={selectedVersion === version ? styles.active : ""}
            >
              {version}
            </button>
          ))}
        </div>
      </div> */}

      {selectedVersion && allVersionsData[selectedVersion] && (
        <div className={styles.jobRankChart}>
          <h4>{allVersionsData[selectedVersion].version} 직업별 인원 분포</h4>
          <h6>
            {allVersionsData[selectedVersion].date} 기준 | 총인원 : {allVersionsData[selectedVersion].total} 명
          </h6>
          <h6>주의! 실시간아님 | 직변포함 누적인원통계</h6>
          <JobChart ranks={allVersionsData[selectedVersion].ranks} />
        </div>
      )}
    </div>
  );
}
