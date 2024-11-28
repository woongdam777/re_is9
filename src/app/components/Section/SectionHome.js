'use client';

import styles from '../../style/Home.module.css';
import JobRank from '../../utils/JobRank';
import { PreBlock11 } from '../PreBlocks';


export default function SectionHome() {

  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <h1>홈화면</h1>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeDiv}>
          <h2>업데이트내역</h2>
          <pre>
            1. 로그인 구현완<br />
            2. 프로필 포스변동 역순수정<br />
            3. 강제 소문자 입력기능 추가<br />
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. 패치노트<br />
            2. 버전별 캐릭별 평점 및 코멘트<br />
          </pre>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>A20 패치노트 [임시]</h1>
            <PreBlock11 />
          </div>
        </div>
        <div className={styles.homeRight}>
          <JobRank />
        </div>
      </div>
    </section>
  );
}