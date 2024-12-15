'use client';

import styles from '../../style/Home.module.css';
import JobRank from '../../utils/JobRank';
import { PreBlock11 } from '../PreBlocks';


export default function SectionHome() {

  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <div className={styles.homeDiv}>
          <h2>업데이트내역</h2>
          <pre>
            1. 과거 패치노트 - 진행중<br />
            2. 회원기능 중 티켓관련 함수오류 수정<br />
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
          <JobRank />
        </div>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>업뎃일정</h1>
            <PreBlock11 />
          </div>
        </div>
      </div>
    </section>
  );
}