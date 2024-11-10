'use client';

import React, { useState } from 'react';
import itemsData from '../data/items.json';  // JSON 데이터 가져오기

export default function SectionInfo() {
  // 카테고리 목록
  const categories = ['무기', '갑옷', '악세', '신발', '유물', '각인', '보석',"기타"];

  // 선택된 카테고리 상태 (기본값은 '유물')
  const [selectedCategory, setSelectedCategory] = useState('유물');

  // 선택된 아이템 상태 (기본값은 첫 번째 아이템)
  const [selectedItem, setSelectedItem] = useState(null);

  // 선택된 카테고리의 아이템 목록
  const selectedItems = itemsData[selectedCategory] || [];

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);  // 카테고리 변경 시 선택된 아이템 초기화
  };

  // 아이템 클릭 핸들러
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // 아이템 이름을 클릭했을 때 해당 아이템으로 이동
  const handleIngredientClick = (ingredientName) => {
    const ingredientItem = selectedItems.find((item) => item.name === ingredientName);
    if (ingredientItem) {
      setSelectedItem(ingredientItem);
    }
  };

  return (
    <section id="section-info" className="section-info">
      <div className="input-container" >
        <h1>아이템 정보</h1>
        {/* 카테고리 버튼 */}
        <div>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              disabled={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <h2>{selectedCategory} 아이템</h2>
        <div style={{ display: 'flex' }}>
          {/* 왼쪽: 아이템 목록 */}
          <div style={{ marginTop: '20px', flex: 1, padding: '10px' ,height: '500px',   overflow: 'auto'}}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {selectedItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {/* 오른쪽: 선택된 아이템 정보 */}
          <div className="item-info" style={{ flex: 2, padding: '10px' }}>
            {selectedItem ? (
              <div>
                <h2>{selectedItem.name}</h2>
                <p><strong>효과:</strong> {selectedItem.effect}</p>
                <p><strong>재료:</strong></p>
                <ul>
                  {selectedItem.combination.map((ingredient) => (
                    <li
                      key={ingredient.item}
                      onClick={() => handleIngredientClick(ingredient.item)}
                      style={{
                        cursor: 'pointer',
                        color: '#0070f3',
                        textDecoration: 'underline',
                      }}
                    >
                      {ingredient.item} ({ingredient.quantity}개)
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>아이템을 선택해주세요.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
