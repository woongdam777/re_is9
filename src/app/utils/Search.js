'use client';

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
    const lowerCaseKeyword = searchKeyword.toLowerCase();
    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(lowerCaseKeyword)}`);
      const data = await response.json();
      
      if (response.ok) {
        onSearch(data, null);
        const newHistory = [lowerCaseKeyword, ...searchHistory.filter(item => item !== lowerCaseKeyword)].slice(0, 4);
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
      <label htmlFor="inputSearch">워크아이디:</label>
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
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            placeholder="소문자로 입력해주세요"
          />
          <button type="submit" id='searchBtn'>검색</button>
        </div>
      </form>
    </div>
  );
}