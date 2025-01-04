'use client';

import styles from '../../style/Home.module.css';
import { PreBlock11 } from '../PreBlocks';


export default function SectionHome() {

  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <div className={styles.homeDiv}>
          <h2>업데이트내역</h2>
          <pre>
            1. 과거 패치노트(수작업) - 자동화 진행중<br />
            2. 몇가지 오류 수정<br />
            3. 레이아웃 변경<br />
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. 캐릭별 스킬<br />
            2. 버전별 캐릭별 평점 및 코멘트<br />
          </pre>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeRight}>

        </div>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>8레 패턴 힌트</h1>
            <PreBlock11 />
          </div>
        </div>
      </div>
    </section>
  );
}