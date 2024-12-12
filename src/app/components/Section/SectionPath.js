'use client';

import React, { useState } from 'react';
import patchNotesData from '../../data/oldPathNote.json'; 
import styles from '../../style/PatchNotes.module.css';

export default function PatchNotes() {
  const [selectedVersion, setSelectedVersion] = useState(null); 

  const displayedVersions = patchNotesData;

  const handleVersionClick = (version) => {
    setSelectedVersion(version); 
  };

  return (
    <section id="patch-notes" className="component-input">
      <div className="input-container">
        <h1>패치 노트</h1>
        <div className={styles.content}>
          <div className={styles.versionList}>
            <ul>
              {displayedVersions.map((patch) => (
                <li
                  key={patch.version}
                  onClick={() => handleVersionClick(patch)}
                  className={`${styles.versionListItem} ${selectedVersion?.version === patch.version ? styles.active : ''}`}
                >
                  {patch.version}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.patchInfo}>
            {selectedVersion ? (
              <div className={styles.patchInfoBlock}>
                <h2><strong>버전</strong> {selectedVersion.version}</h2>
                <p><strong>날짜:</strong> {selectedVersion.date}</p>
                <div className={styles.patchContent}>
                  {selectedVersion.content.split('\n').map((ver, index) => (
                    <p key={index}>{ver}</p>
                  ))}
                </div>
              </div>
            ) : (
              <p>버전을 선택해주세요.</p> 
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
