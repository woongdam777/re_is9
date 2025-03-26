'use client';

import styles from '../../style/Home.module.css';
import { PreBlock11, PreBlock12 } from '../PreBlocks';


export default function SectionHome() {

  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <div className={styles.homeDiv}>
          <h2>업데이트내역</h2>
          <pre>
            검색기능 및 마이페이지 기능 재오픈
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. DB서버 개편(언젠가...?)<br />
          </pre>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeRight}>
          <div className={styles.homeDiv}>
            <h1>A21.2 패치노트</h1>
            <PreBlock12 />
          </div>
        </div>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>8레 패턴</h1>
            <PreBlock11 />
          </div>
        </div>
      </div>
    </section>
  );
}