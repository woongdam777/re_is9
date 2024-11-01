import { useState } from 'react';

export default function Search({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      
      if (response.ok) {
        onSearch(data, null);
      } else {
        onSearch(null, data.error);
      }
    } catch (error) {
      console.error('Search error:', error);
      onSearch(null, "데이터를 가져오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="component-input">
      <label htmlFor="inputSearch">워크 아이디:</label>
      <div>
        <input
          type="text"
          id="inputSearch"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="값 입력"
        />
        <button id='searchBtn' onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
}