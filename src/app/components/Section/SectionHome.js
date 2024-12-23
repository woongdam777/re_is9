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
            1. 검색기능 수정완료<br />
            2. 과거 패치노트(수작업) - 자동화 진행중<br />
            3. 계산기 - 수련장기본점수 계산식수정<br />
            4. 8레 아이템 추가<br />
            5. 아이템 하위재료클릭시 하위조합식으로 이동
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
          <JobRank />
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