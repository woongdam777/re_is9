'use client';

import React, { useState } from 'react';
import itemsData from '../data/items.json';  // JSON 데이터 가져오기
import styles from '../style/SectionInfo.module.css'; // CSS 모듈 가져오기

export default function SectionInfo() {
  const categories = ['무기', '갑옷', '악세', '신발', '유물', '각인', '보석', "기타"];
  const [selectedCategory, setSelectedCategory] = useState('유물');
  const [selectedItem, setSelectedItem] = useState(null);
  const selectedItems = itemsData[selectedCategory] || [];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleIngredientClick = (ingredientName) => {
    const ingredientItem = selectedItems.find((item) => item.name === ingredientName);
    if (ingredientItem) {
      setSelectedItem(ingredientItem);
    }
  };

  return (
    <section id="section-info" className="component-input">
      <div className="input-container">
        <h1>아이템 정보</h1>
        <div className={styles.categoryButtons}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              disabled={selectedCategory === category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <h2>{selectedCategory} 아이템</h2>
        <div className={styles.content}>
          <div className={styles.itemList}>
            <ul>
              {selectedItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={styles.itemListItem}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.itemInfo}>
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
                      className={styles.ingredientItem}
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