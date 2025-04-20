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
            1. 최신 패치노트 내용 적용
          </pre>          
        </div>  
        <div className={styles.homeDiv}>
          <h2>추가예정</h2>
          <pre>
            1. DB서버 개편(언젠가...?)<br />
          </pre>
        </div>
      </div>
      {/* <div className={styles.homeContainer}>
        <div className={styles.homeRight}>
          <div className={styles.homeDiv}>
            <PreBlock12 />
          </div>
        </div>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <PreBlock11 />
          </div>
        </div>
      </div> */}
    </section>
  );
}