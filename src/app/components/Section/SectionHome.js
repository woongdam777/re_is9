'use client';

import styles from '../../style/Home.module.css';
import JobRank from '../../utils/JobRank';
import { PreBlock11 } from '../PreBlocks';


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
            1. 로그인 구역 추가 - 구현중<br />
            2. 티켓변화량 임시오픈<br />
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. 비회원인경우 - 기존기능유지, 검색 티켓변화량 2시간분량감소<br />
            2. 로그인시 본인 데이터만 - 10시간? 포스 및 티켓변화량<br />
            3. 간단한 게시판 추가<br />
            4. 버전별 캐릭별 평점 및 코멘트
          </pre>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>패치노트 19.2 [임시]</h1>
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