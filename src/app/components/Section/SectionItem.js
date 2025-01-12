'use client';

import React, { useState } from 'react';
import itemsData from '../../data/items.json'; 
import styles from '../../style/SectionInfo.module.css';

export default function SectionInfo() {
  const categories = ['무기', '갑옷', '악세', '신발', '유물', '각인', '보석', '아바타', "전용템", '기타'];
  const [selectedCategory, setSelectedCategory] = useState('무기');
  const [selectedItem, setSelectedItem] = useState(null);
  const selectedItems = itemsData[selectedCategory] || [];
  const [isReversed, setIsReversed] = useState(false);

  const handleToggleOrder = () => {
    setIsReversed((prev) => !prev); // 현재 상태를 반전
  };

  const displayedItems = isReversed ? selectedItems.slice().reverse() : selectedItems;

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
        <div className={styles.semiTitle}>
          {selectedCategory} 아이템
          <button onClick={handleToggleOrder}>
            {isReversed ? '반전' : '반전'}
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.itemList}>
            <ul>
              {displayedItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`${styles.itemListItem} ${selectedItem?.name === item.name ? styles.iactive : ''}`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.itemInfo}>
            {selectedItem ? (
              <div className={styles.itemInfoBlock}>
                <h2>{selectedItem.name}</h2>
                {selectedItem.effect &&
                  <>
                    <p><strong>[효과]</strong></p>
                    {selectedItem.effect.split('\\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </>
                }
                {selectedItem.combination && (
                  <>
                    <p><strong>[재료]</strong></p>
                    <ul>
                      {selectedItem.combination.map((ingredient) => (
                        <li
                          key={ingredient.item}
                          onClick={() => handleIngredientClick(ingredient.item)}
                          className={styles.ingredientItem}
                        >
                          {ingredient.item}
                          {ingredient.quantity && ` (${ingredient.quantity}개)`}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
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