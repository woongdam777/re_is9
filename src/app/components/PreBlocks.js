export function PreBlock1() {
  const pres = `
▣ 최종피해 증가량    

노말[5%] 매직[10%] 레어[18%] 유닉[30%] 레전[45%]
에픽[65+(중첩*5)%] / 70 75
고대[95+(중첩*7)] / 102 109 116 123
신화[140+(중첩*?)]
1~10 중첩당 10%
150 160 170 180 190 / 200 210 220 230 240

11~20 중첩당 7%
247 254 261 268 275 / 282 289 296 303 310

21~50 중첩당 3%
313 316 319 322 325 / 328 331 334 337 340
343 346 349 352 355 / 358 361 364 367 370
373 376 379 382 385 / 388 391 394 397 400

51~ 중첩당 1%
401~
`;
  return (
    <pre>{pres}</pre>
  );
}
export function PreBlock2() {
  const pres =`
▣ 계산식(소수점 버림)

※주의 : 대략적인 수치이니 참고만 하기!

토벌점수 = 수련장 점수&times;10&times;0.88
1회 포스스톤 획득량 = 수련장 점수&times;0.0973  
토벌 포스스톤 획득량 = 수련장 점수&times;0.1&times;10&times;0.88
1회 펫 경험치 = 수련장 점수&times;7.295
토벌 펫 경험치 = 수련장 점수&times;7.295&times;10&times;0.88&times;10.4
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock3() {
    const pres =`
▣ 포스레벨 필요 경험치

1레벨 : 1
2레벨 : 100        
3레벨 : 250     
4레벨 : 625            
5레벨 : 1600     
6레벨 : 6400   
7레벨 : 16000
8레벨 : 38000
9레벨 : 83600
10레벨 : 334400
11레벨 : 800000
12레벨 : 1600000
13레벨 : 2400000
14레벨 : 3200000
15레벨 : 5000000
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock4_1() {
    const pres =`
▣ 각성기

* 각성기의 레벨에 비례하여 각성기의 효과가 증가
1레벨당 쿨타임 10초 감소          
1레벨당 피해량 10% 증가
5레벨 마다 피해량 25% 추가 증가

[필요 각성 경험치]
1레벨 : 1
2레벨 : 5,000
3레벨 : 20,000        
4레벨 : 100,000        
5레벨 : 500,000        
6레벨 : 2,500,000        
7레벨 : 10,000,000        
8레벨 : 50,000,000 
9레벨 : 300,000,000
10레벨 : 1,000,000,000
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock4_2() {
  const pres =`
▣ 반복 클리어 보상
[클리어보너스 있을 경우만 획득]
[클리어보너스 있을 경우 포인트 30배]

1단계 : 각성 경험치 1000,   3P
2단계 : 각성 경험치 2000,   6P
3단계 : 각성 경험치 4000,   9P
4단계 : 각성 경험치 8000,   180P 
5단계 : 각성 경험치 12000,  600P 
6단계 : 각성 경험치 25000,  150P
7단계 : 각성 경험치 60000,  300P
8단계 : 각성 경험치 120000, 900P
`;
return (
  <pre>{pres}</pre>
);
}

export function PreBlock5() {
    const pres =`
▣ 지옥파티(최대 5인) - 하루 최대 5회, 출석체크 횟수 초기화

최초 클리어 보상
1단계 : 알수없는 마스터리 북
2단계 : 진리의 돌, 황금 사과
3단계 : 깨달음의 주문서
4단계 : 50만 각성 경험치, 깨달음의 주문서
5단계 : 200만 각성 경험치, 펫 스킬 랜덤 상자
6단계 : 500만 각성 경험치, 펫 스킬 랜덤 상자(A~B등급)
7단계 : 1000만 각성 경험치, 펫 스킬 랜덤 상자(A등급)
8단계 : 5000만 각성 경험치, 펫 스킬 랜덤 상자(A등급)

▣ 반복 클리어 보상 [클리어보너스 있을 경우만 획득]
1단계 : 각성 경험치 1000
2단계 : 각성 경험치 2000
3단계 : 각성 경험치 4000
4단계 : 각성 경험치 8000, 깨달음의 주문서(확률 등장)
5단계 : 각성 경험치 12000, 펫 스킬 랜덤 상자(확률 등장), 깨달음의 주문서(확률 등장)
6단계 : 각성 경험치 25000, 펫 스킬 랜덤 상자(확률 등장), 깨달음의 주문서(확률 등장)
7단계 : 각성 경험치 60000, A~B펫 스킬 랜덤 상자(확률 등장), 펫 스킬 랜덤 상자(확률 등장), 깨달음의 주문서(확률 등장)
8단계 : 각성 경험치 120000, A펫 스킬 랜덤 상자(확률 등장), A~B펫 스킬 랜덤 상자(확률 등장), 펫 스킬 랜덤 상자(확률 등장), 깨달음의 주문서(확률 등장)

▣ 클리어 시 획득 포인트 [클리어보너스 있을 경우 30배 획득]
1단계 : 3P
2단계 : 6P
3단계 : 9P
4단계 : 18P
5단계 : 60P
6단계 : 150P
7단계 : 300P
8단계 : 900P
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock6() {
    const pres =`
▣ 신규 성장 무기 3종[7레이드]

성장형 무기를 장착한 상태로 포스레벨이 존재하는 몬스터를
처치 시 그 유닛의 포스레벨 만큼 성장형 무기의 경험치가
누적되는 시스템 입니다.
성장형 무기의 경험치가 일정치만큼 달성할 때 마다
성장형 무기의 레벨이 올라가며, 무기레벨에 비례하여
공격력이 증가합니다.

레벨[1] = 3000
레벨[2] = 6000    
레벨[3] = 20000    
레벨[4] = 50000    
레벨[5] = 100000    
레벨[6] = 160000    
레벨[7] = 240000    
레벨[8] = 340000    
레벨[9] = 500000    
레벨[10] = 1000000
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock7() {
    const pres =`
▣ 어빌리티

각각 효과를 부여할 수 있는 슬롯 6개가 주어지며
재화를 소모하여 무작위 효과가 부여됩니다.
효과 재부여시 잠금 활성화된 슬롯을 제외한
모든 슬롯에 효과가 재부여 됩니다.

효과 재부여에 소모되는 재화
-> 순백의 주문서 10장, 20억 은화
잠금 활성화 시 소모 재화의 2배가 소모됩니다.              

잠금 슬롯 1개 : 2배  / 순백의 주문서 20장, 40억 은화
잠금 슬롯 2개 : 4배  / 순백의 주문서 40장, 80억 은화           
잠금 슬롯 3개 : 8배  / 순백의 주문서 80장, 160억 은화          
잠금 슬롯 4개 : 16배 / 순백의 주문서 160장, 320억 은화
잠금 슬롯 5개 : 32배 / 순백의 주문서 320장, 640억 은화
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock8() {
    const pres =`
▣ 등장 확률

유니크 : 72.5% / 레전더리 : 22.5% 
에픽 : 4.3%    / 신화 : 0.7%         

# 유니크
공격력 +50 / 힘 +100 / 민첩 +100 / 지능 +100
이동속도 +10 / 방어력 +25

# 레전더리
공격력 +120 / 힘 +200 / 민첩 +200 / 지능 +200
이동속도 +20 / 방어력 +50 / 공격력 +1.5%

# 에픽
공격력 +200 / 최종피해 +1.0% / 추가피해 +1.0%
공격력 +3% / 치명타 확률 +1.0% / 방어 관통 +1.0%
아이템 드랍률 +3% / 은화 획득량 +4.5%

# 신화
치명타 확률 +2.0% / 방어 관통 +2.0% / 최종피해 +3.5%
공격력 +6.0% / 아이템 드랍률 +6% / 은화 획득량 +9%

중복 부여 가능
ex) 슬롯1:방어 관통 +2.0%
    슬롯2:방어 관통 +2.0%
    슬롯3:방어 관통 +2.0%
    슬롯4:방어 관통 +2.0%
`;
  return (
    <pre>{pres}</pre>
  );
}    

export function PreBlock9() {
    const pres =`
▣ 펫 스킬
지옥파티 클리어시 낮은 확률 획득, 최대 2개까지 장착
등급 A~C, n = 등급 비례 효과, 등급이 올라갈 수록 효과가 증폭

소울 애로우 - 마지막 공격'단일'대상
0.8초마다 공격력 * 5.1 / 7.2 / 9.5 추가 피해

베리어 - 10초마다 n초간 최대체력 n% 쉴드 부여
3초지속 10% / 5초지속 15% / 7초지속 20% 

찬스 어택 - 펫공격 한번 더
8% / 14.4.% / 28.8% 확률

위협 - 10초마다 방관증가
6초지속 4% / 10초지속 6%

저주 - '단일'대상 받는 피해량 10%, 중첩불가
5초마다 3초지속 / 5초지속

축복 - 10초마다 공격력 증폭
6초지속 15% / 10초지속 25% 

축복 - 10초마다 치명타 증가
6초지속 12% / 10초지속 20%

행운의 주사위 - 10초마다 주스탯을 n~n% 증가
6초지속 3~8% / 10초지속 5~10%
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock10_1() {
  const pres =`
▣ 전용 아이템

전용아이템의 강화수치는 공유됩니다.
전용아이템은 직업별로 1가지씩 존재하고, 장착 시 스킬이 강화됩니다.
전용아이템은 강화가 가능하며 최대 12단계까지 강화가 가능합니다.
강화 시도 시 강화단계별로 은화가 소모되며, 실패 시 70% 확률로 강화단계가 하락합니다.
2단계 연속하락시 확정강화가 적용됩니다.
마을내 대장장이NPC에게서 전용아이템 강화를 진행할 수 있습니다.

▣ 강화 단계별 능력치 / 소모은화 / 성공확률

1단계: 공격력 +1.5% / 1,000M / 100%  
2단계: 공격력 +3.5% / 2,000M / 80%  
3단계: 공격력 +6.0% / 4,000M / 70%  
4단계: 공격력 +9.0% / 10,000M / 60%  
5단계: 공격력 +12.5% / 20,000M / 40%  
6단계: 공격력 +16.5% / 50,000M / 40%  
7단계: 공격력 +21% / 100,000M / 30%  
8단계: 공격력 +26% / 150,000M / 30%  
9단계: 공격력 +31.5% / 200,000M / 20%  
10단계: 공격력 +37.5% / 250,000M / 10%  
11단계: 공격력 +44% / 500,000M / 5%  
12단계: 공격력 +51% / 1,000,000M / 3%
`;
  return (
    <pre>{pres}</pre>
  );
}

export function PreBlock10_2() {
  const pres =`
▣ 전용템 효과는 A19업로드 전까지 테스트 도중 여러차례 변경될 수 있습니다.

버서커 - 극마혈광검
E: 갈증이 강화 기본 발동확률이 7% 증가, 피해량 계수가 30% 증가
T: 버서크 퓨리의 피해량 계수가 250% 증가, 방어관통 10% 효과 추가

소울이터 - 사신의 낫
E: 데스오더가 공격 시 9% 확률로 발동
T: 디엔드의 피해량 계수가 250% 증가, 방어관통 10% 효과 추가

창술사 - 궁니르
Q: 집중이 강화 집중스택 1당 치명타 피해량 12% 증가
T: 은하유성탄의 피해량 계수가 250% 증가, 방어관통 10% 효과 추가

화염마법사 - 불의 성배
Q: 불의 축복이 강화 마력소모량 50% 감소, 피해량 계수가 50% 증가
T: 파이어 익스플로전의 피해량 계수가 140% 증가, 방어관통 10% 효과 추가

무도가 - 분신진권
Q: 태극권이 강화 비활성화 시 태극 회복량 1 -> 2 증가, 피해량 계수가 100% 증가
W: 연계권법 최대 콤보 달성 시 추가효과 부여

검성 - 차원검
Q: 청월연참의 피해량 계수 30% 증가.
T: 극귀검술-심검의 쿨타임이 30초 -> 20초로 감소

방랑자 - 명도
Q: 신월참의 피해량 계수 30% 증가
T: 신안극수의 지속시간이 5초, 0.5초당 마나회복량이 4 증가

용기사 - 아스칼론
Q: 용의발톱의 피해량 계수 30% 증가
T: 하늘찌르기의 피해량 계수가 200% 증가, 방어관통 10% 효과 추가

비질란테 - 페일노트
Q: 크리티컬 샷 발동 시 공허의 화살이 10% 확률로 추가 발동
T: 얼티밋 블래스터의 피해량 계수가 30% 증가, 방어관통 10% 효과 추가

레인저 - 아스트라
Q: 뇌격탄의 발동확률이 5% 증가
T: 네이팜탄의 피해량 계수가 40% 증가, 방어관통 10% 효과 추가

그림자검객 - 마사무네
Q: 그림자 연격의 패시브 효과가 추가 공격 시 9% 확률로 발동
T: 신귀극참의 피해량 계수가 250% 증가, 방어관통 10% 효과 추가

무녀 - 윤회의 고리
Q: 고드름이 매 1초마다 공격 시 발동, 피해량 계수가 50% 증가
T: 현신의 피해량 계수가 250% 증가, 방어관통 10% 효과 추가, 범위 내 아군에게 40초간 치명타 확률 15% 증가

`;
  return (
    <pre>{pres}</pre>
  );
}