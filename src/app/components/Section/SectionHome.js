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
            1. 아이템 및 패치노트 통합<br />
            2. 캐릭터 스킬 정보 추가 중<br />
            3. 직업별 차트 오류 수정<br />
            4. 과거 패치노트(수작업) - 자동화 진행중<br />
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. 버전별 캐릭별 평점 및 코멘트<br />
          </pre>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeRight}>
          <div className={styles.homeDiv}>
            <h1>A21 패치노트</h1>
            <PreBlock12 />
          </div>
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