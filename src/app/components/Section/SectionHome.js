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
            현재
            https://m16tool.xyz/ 사이트 인증서 만료<br />
            데이터 가져오는 것이 위험<br />
            검색기능 및 마이페이지 기능 잠금<br /><br />
            • m16에서 인증서 갱신해야 해결가능<br />
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