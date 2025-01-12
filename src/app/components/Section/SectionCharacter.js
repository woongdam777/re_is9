'use client';

import React, { useState } from 'react';
import charactersData from '../../data/characterSkills.json';
import styles from '../../style/SectionCharacter.module.css';

export default function CharacterInfo() {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(charactersData)[0]);
  const [selectedCharacter, setSelectedCharacter] = useState(Object.keys(charactersData[Object.keys(charactersData)[0]])[0]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCharacter(Object.keys(charactersData[category])[0]);
    setSelectedSkill(null);
  };

  const handleCharacterChange = (character) => {
    setSelectedCharacter(character);
    setSelectedSkill(null);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  return (
    <section className={styles.characterInfo}>
      <div className={styles.selected}>
        <div className={styles.categorySelect}>
          {Object.keys(charactersData).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.characterSelect}>
          {Object.keys(charactersData[selectedCategory]).map((character) => (
            <button
              key={character}
              onClick={() => handleCharacterChange(character)}
              className={`${styles.characterButton} ${selectedCharacter === character ? styles.active : ''}`}
            >
              {character}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.characterImage}>
          <h3>{selectedCharacter}</h3>
          <div className={styles.imagePlaceholder}>
            <p>캐릭터</p>
            <p>이미지</p>
          </div>
        </div>
        <div className={styles.skillInfo}>
          <div className={styles.skillList}>
            {Object.entries(charactersData[selectedCategory][selectedCharacter][0]).map(([key, skill]) => (
              <button
                key={key}
                onClick={() => handleSkillClick(skill)}
                className={`${styles.skillButton} ${selectedSkill?.name === skill.name ? styles.active : ''}`}
              >
                {key}
              </button>
            ))}
          </div>
          <div className={styles.skillDetails}>
            {selectedSkill ? (
              <>
                <h2>{selectedSkill.name}</h2>
                <p><strong>타입:</strong> {selectedSkill.type}</p>
                <p><strong>설명:</strong></p>
                {selectedSkill.description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                {selectedSkill.damage && <p><strong>피해량:</strong> {selectedSkill.damage}</p>}
                <p><strong>쿨다운:</strong> {selectedSkill.cooldown}</p>
              </>
            ) : (
              <p>스킬을 선택해주세요.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
