'use client';

import styles from '../style/Home.module.css';
import JobRank from '../utils/JobRank';


export default function SectionHome() {

  return (
    <section id="section-home" className="section-home">
      <div className={styles.homeContainer}>
        <h1>홈화면 [임시]</h1>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.homeLeft}>
          <div className={styles.homeDiv}>
            <h1>패치노트 19</h1>
            <pre className={styles.homeDivpre}>
빙결의 무녀<br />
수련장 보정이 70% → 100%로 상향 조정됩니다.<br />
R:동화<br />
＊지속시간 오류 및 버프 적용방식이 변경됩니다.    <br /><br />          

▣ 포스스톤 랭킹 점수 기준이 변경됩니다.<br />
수련장 개편이 진행됩니다.<br />
＊포스스톤 점수 + 펫 딜량 + 캐릭터 딜량을 기준으로 측정됩니다. (각각 자체 보정 적용)<br />
* 수련장 티켓 초기화가 진행됩니다.<br />
＊수련장 점수 기준이 변경됨에 따라 수련장 점수 초기화가 진행됩니다. <br /><br />

상위 포스스톤이 추가됩니다.<br />
＊신화 포스스톤 50중첩 시 진리의 서로 업그레이드 됩니다.<br />
[신화] 진리의 서<br />
＊기본 스탯 : 최종피해 350%, 치명타확률 +5%, 공격력 +10%<br />
1~4중첩 : 중첩당 최종피해 +50%<br />
5~10중첩 : 중첩당 최종피해 +25%<br />
11중첩~ : 중첩당 최종피해 +10%<br /><br />

7티어 레이드의 난이도가 하향조정됩니다.<br />
처단한다 패턴의 쿨타임이 1.5초 증가합니다<br />
체력이 약 15% 하향 조정되며, 쉴드 패턴의 쉴드량이 30% 하향조정됩니다.<br /><br />

지옥파티 보상 개편이 진행됩니다.<br />
단계별 보너스 보상드랍률이 증가하며, 6단계 부터 보너스 클리어 횟수에 비례하여 보너스 보상이 지급됩니다.<br />
6단계 15회 마다 펫 스킬 랜덤 상자(전체)<br />
7단계 15회 마다 펫 스킬 랜덤 상자(A~B)<br />
8단계 15회 마다 펫 스킬 랜덤 상자(A~B)*2<br /><br />

신규 지역이 추가 됩니다.<br />
＊신규 지역에선 전용아이템과 신규 갑옷 장비를 획득할 수 있습니다.<br /><br />

전용 아이템이 추가 됩니다.
            </pre>
          </div>
          <div className={styles.homeDiv}>
            <h1>추가예정</h1>
            <pre>
              1. 지옥파티 포인트 - 상자구입가능 개수 파악?<br />
              2. 아이템 리스트 추가예정<br />
              3. 홈화면<br />
              4. 패치노트<br />
              5. 로그인 및 간단한 게시판 추가 - 미정
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