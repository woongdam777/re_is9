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
            1. 모바일 로그인 안내문구 추가<br />
            2. 워크아이디 숫자0일시 미인식 수정<br />
            3. 프레임 최적화<br />
            4. 다크모드 마이페이지 글자색 수정<br />
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
        <div className={styles.homeRight}>
          <JobRank />
        </div>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>A20 패치노트 [임시]</h1>
            <PreBlock11 />
          </div>
        </div>
      </div>
    </section>
  );
}