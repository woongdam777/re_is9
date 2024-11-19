import { useState, useEffect } from 'react';
import styles from '../style/SearchResult.module.css';

export default function Search({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveSearchHistory = (history) => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  };

  const handleSearch = async (searchKeyword) => {
    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(searchKeyword)}`);
      const data = await response.json();
      
      if (response.ok) {
        onSearch(data, null);
        // 성공적인 검색 후 검색어를 기록에 추가합니다.
        const newHistory = [searchKeyword, ...searchHistory.filter(item => item !== searchKeyword)].slice(0, 4);
        setSearchHistory(newHistory);
        saveSearchHistory(newHistory);
      } else {
        onSearch(null, data.error);
      }
    } catch (error) {
      onSearch(null, "데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      handleSearch(keyword);
    }
  };

  const handleHistoryClick = (item) => {
    setKeyword(item);
    handleSearch(item);
  };

  return (
    <div className="component-input">
      <label htmlFor="inputSearch">워크 아이디:</label>
      {searchHistory.length > 0 && (
        <div>
          <ul className={styles.searchHistory}>
            {searchHistory.map((item, index) => (
              <li key={index} onClick={() => handleHistoryClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="inputSearch"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="값 입력"
          />
          <button type="submit" id='searchBtn'>검색</button>
        </div>
      </form>
    </div>
  );
}