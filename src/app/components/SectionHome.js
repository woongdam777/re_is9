'use client';

import styles from '../style/Home.module.css';

export default function SectionHome() {
  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <h1>홈화면 [임시]</h1>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.pathNote}>
          <h1>패치노트  18.8 → 19</h1>
          <pre>
<br />
빙결의 무녀 / R:동화 : 지속시간 오류 및 버프 적용방식이 변경됩니다.<br /><br />
7티어 레이드의 난이도가 하향조정됩니다.<br />
-처단한다 패턴의 쿨타임이 1.5초 증가합니다.<br />
-체력이 약 15% 하향 조정되며, 쉴드 패턴의 쉴드량이 30% 하향조정됩니다.<br /><br />
수련장 티켓 초기화가 진행됩니다.<br /><br />
신규 지역이 추가 됩니다.<br />
-신규 지역에선 전용아이템과 신규 갑옷 장비를 획득할 수 있습니다.<br /><br />
전용 아이템이 추가 됩니다.
          </pre>
        </div>
        <div className={styles.jobRank}>
          <h1>직업 순위</h1>
          <ul>
            <li>검성</li>
            <li>용기사</li>
            <li>무도가</li>
            <li>그레이</li>
            <li>갓시노</li>
            <li>피슬</li>
            <li>방랑자</li>
            <li>라라</li>
            <li>오리</li>
            <li>버서커</li>
            <li>키나</li>
            <li>요우무</li>
          </ul>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className="pathNote">
          <h1>추가예정</h1>
          <pre>
            1. 지옥파티 포인트 - 상자구입가능 개수 파악?<br />
            2. 아이템 리스트 추가예정<br />
            3. 캐릭터별 점유율? - 차트<br />
            4. 색상변경
            5. 홈화면
            6. 패치노트<br />
            7. 로그인 및 간단한 게시판 추가 - 미정
          </pre>
        </div>
      </div>

    </section>
  );
}