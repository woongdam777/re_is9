'use client';

import styles from '../style/Home.module.css';
import JobRank from '../utils/JobRank';
import { PreBlock11 } from './PreBlocks';


export default function SectionHome() {

  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <h1>홈화면 [임시]</h1>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeDiv}>
          <h2>업데이트내역</h2>
          <pre>
            1. 계산기 - 지옥파티 포인트[구입가능개수]<br />
            2. 사이트 색 추가[노랑,회색,국방색?]<br />
            3. 검색 - 전용템 강화수치 추가<br />
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. 과거 전체&캐릭별 패치노트<br />
            2. 로그인 및 간단한 게시판 추가 - 미정
            3. 버전별 캐릭별 평점 및 코멘트<br />
          </pre>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>패치노트 19.2 [임시]</h1>
            <PreBlock11 />
          </div>
          <div className={styles.homeDiv}>
            <h1>여기에 뭐 넣을까요?</h1>
            <pre>
              1. <br />
              2. <br />
              3. 
            </pre>
          </div>
        </div>
        <div className={styles.homeRight}>
          <JobRank />
        </div>
      </div>
      <div className={styles.homeContainer}>
        
      </div>
    </section>
  );
}