# EPIC
[EPIC] Albamon Search Filters (Mobile Web)

Description
모바일 상세 조건검색 UI/상태/적용 흐름 전반을 구현한다. 모든 하위 이슈가 포함된다.

Tasks
- [ ] 하위 이슈 진행/트래킹
- [ ] 설계/데모 문서 갱신
- [ ] QA 리스트 정리

AC
- [ ]  하위 이슈 모두 완료되고 데모 플로우가 모바일에서 동작
- [ ]  주요 시나리오 2개(주말 알바, 단기 오전 알바) 데모 가능

Test Notes
- E2E 스모크(시나리오 2개)만 EPIC에서 커버


---

## 1) 전역 상태 (Zustand) & 타입 스키마
[Store] Filter Store 생성 및 전역 제공

Description
필터 상태/액션/검증 로직을 전역에서 사용 가능하도록 Zustand로 구현. 기본값/제한(최대 선택 수 등) 반영.

Tasks
- [ ] 타입 정의: FilterState, Region, Category, Period, Weekday, TimeRange, Gender, AgeRange, EmploymentType, KeywordFilter
- [ ] 기본값/제한값 상수 분리(/config)
- [ ] 액션: set/append/remove/reset/bulkSet
- [ ] 파생 셀렉터: 카운트, 라벨 텍스트(예: “20–30세”, “2/10”)
- [ ] 검증: 최대 선택 수/범위/상호배타 로직
- [ ] Provider/Wiring: 앱 상단에서 store 제공

AC
- [ ] 모든 필터 값이 store 한 곳에서 진실 소스(single source of truth)
- [ ] 제한(예: 지역/카테고리 최대 10, 고용형태 7) 위반 시 set 거부
- [ ] reset 호출 시 전 필터 기본값으로 복구

Test Notes

유닛: 액션/검증/파생 셀렉터

## 2) 근무지역 선택
[UI] Region Selector (Multi up to 10)

Description
지역 다중 선택 모달/시트. 검색, 추가/삭제, 선택 칩, 카운터(0/10) 표시.

Tasks

 지역 검색 인풋(로컬 필터)

 리스트(시/도 > 구/군) 탐색/선택

 선택 칩/삭제, 카운터 UI

 Store 연동: append/remove/clear

AC

 최대 10개까지 추가 가능, 11번째 시도 시 비활성 처리/토스트

 칩 삭제/전체 삭제 동작

 카운터 실시간 업데이트

Test Notes

경계값: 0, 10, 11개 시도

## 3) 업직종 선택
[UI] Category Selector (Multi up to 10)

Description
업직종(대분류/소분류) 다중 선택 UI. 카운터(0/10), 선택 칩.

Tasks

 대/소분류 트리 UI

 다중 선택/해제

 선택 칩/카운터

 Store 연동

AC

 최대 10개 제한 적용

 선택/해제/초기화 정상 동작

Test Notes

소분류만/대분류만 선택 시도 등 케이스

## 4) 근무기간
[UI] Work Period (Multi)

Description
사전 정의 옵션(1일, ≤1주, 1주1개월, 13개월, 36개월, 612개월, ≥1년 등) 복수 선택.

Tasks

 체크박스 그룹

 라벨/도움말

 Store 연동

AC

 다중 선택 가능, 초기값 “무관”

 선택 해제 시 무관 복귀 가능

Test Notes

선택 0개 상태 처리(=무관)

## 5) 근무요일
[UI] Work Days (Presets + Custom, up to 3)

Description
프리셋(월일/월토/월금) + 개별 요일 토글(월일). 최대 3개 선택. “요일 협의 제외” 토글.

Tasks

 프리셋 버튼 + 개별 요일 토글

 선택 합산 카운팅(프리셋/개별 혼합 허용)

 “협의 제외” 토글

 상호배타/최대 3개 검증

 Store 연동

AC

 프리셋과 개별 토글 혼합 시 총 선택 수 3 초과 불가

 “협의 제외” ON 시 협의 공고는 결과 카운트에서 제외

Test Notes

프리셋 2 + 개별 2(총 4) 시도 → 마지막 거부

## 6) 근무시간
[UI] Work Hours (Presets + Custom)

Description
프리셋(오전/오후/저녁/야간 등) 또는 사용자 지정 시작/종료 시간(<input type="time"> 활용). “시간 협의 제외” 토글.

Tasks

 프리셋 토글 그룹

 커스텀 시간 범위 입력/검증(start < end)

 협의 제외 토글

 상호배타 규칙(프리셋 선택 시 커스텀 비우기 등)

 Store 연동

AC

 커스텀 범위 유효성 검사

 협의 제외 적용 시 협의 공고 카운트 제외

Test Notes

경계(예: 06:00–12:00), 잘못된 입력(12:00–06:00)

## 7) 성별 필터
[UI] Gender Filter (+ ‘무관 제외’)

Description
성별 단일 선택(무관/남자/여자) + “무관 제외” 토글(무관 공고 숨김).

Tasks

 라디오 그룹 + 토글

 Store 연동

AC

 라디오 단일 선택 동작

 무관 제외 ON 시 ‘성별 무관’ 공고 제외

Test Notes

남자 선택 + 무관 제외 ON 조합 등

## 8) 연령 범위
[UI] Age Range (10–80)

Description
최소/최대 나이 입력(두 개의 number 인풋)과 “연령 무관 제외” 토글. 라벨로 “20–30세” 표시.

Tasks

 min/max 입력, 유효성 검사(min ≤ max, 범위 10~80)

 표시 라벨 구성

 무관 제외 토글

 Store 연동

AC

 잘못된 범위 입력 시 저장 불가/에러 표시

 라벨 항상 최신 반영

Test Notes

경계값: 10–80, 역전 입력(30–20)

## 9) 고용형태
[UI] Employment Type (Multi up to 7)

Description
알바/정규직/계약직/인턴 등 다중 선택, 최대 7개.

Tasks

 체크/칩 UI

 카운터

 Store 연동

AC

 최대 7개 제한

 선택/해제/초기화 정상

Test Notes

7개 선택 후 8번째 시도

## 10) 키워드 필터
[UI] Include/Exclude Keywords (20 / 100)

Description
포함 키워드(최대 20), 제외 키워드(최대 100) 태그 인풋. 추가/삭제, 카운터.

Tasks

 태그 인풋(쉼표/엔터 추가, 백스페이스 삭제)

 개수 제한/중복 제거

 카운터/에러 메시지

 Store 연동

AC

 포함 20, 제외 100 제한 준수

 태그 삭제/전체 비우기 동작

Test Notes

대량 입력, 중복/공백 처리

## 11) 결과 건수 표시
[Logic] Result Count 실시간 업데이트

Description
필터 변경 시 CTA(“X건의 결과보기”) 숫자 즉시 갱신. 데이터 소스는 모킹(API or 로컬 JSON).

Tasks

 필터 → 쿼리 변환 함수

 모킹 데이터 필터링/카운트(성능 고려, 디바운스)

 CTA 텍스트 동기화

 로딩/에러 상태

AC

 필터 조합 변경 시 300ms 이내 숫자 업데이트

 협의 제외/무관 제외 등이 카운트에 반영

Test Notes

연속 조작 디바운스 확인, 엣지 필터 조합

## 12) 적용/네비게이션
[Flow] Apply 버튼 동작 (검색 실행/이동 훅)

Description
“결과보기” 클릭 시 현재 필터들을 파라미터 객체로 직렬화하여 검색 실행(또는 결과 페이지로 네비게이션). 실제 리스트 구현은 범위外.

Tasks

 직렬화 규칙 정의(간결/재현성)

 네비게이션 훅/콜백(주입 가능)

 빈 결과/오류 처리

AC

 직렬화 결과가 항상 동일 입력 → 동일 출력

 외부에서 주입한 navigate(searchParams) 호출됨

Test Notes

단위: 직렬화 규칙 고정성, 통합: 더미 navigate 호출

## 13) 전체 초기화
[UI] Reset All Filters

Description
“초기화” 버튼 클릭 시 모든 상태 기본값으로 리셋, 카운터/라벨/토글 동기화.

Tasks

 Reset 버튼 UI

 Store reset() 호출

 비활성 조건(이미 기본 상태)은 버튼 비활성

AC

 클릭 1회로 전체 리셋

 UI와 상태 완전 동기화

Test Notes

리셋 후 바로 적용 시 파라미터 비움

## 14) 전역 지속성
[Infra] Global Persistence (Cross-Page)

Description
동일 세션 내 다른 페이지에서도 필터 유지. (예: sessionStorage 동기화 or URL 동기화 중 택1/병행)

Tasks

 하이드레이션 로직(초기 로드 시 복구)

 변경 감지 → 저장

 스키마 버전/마이그레이션 가드

AC

 새 페이지 진입 시 필터 복구

 버전 불일치 시 안전한 초기화

Test Notes

새 탭/새로고침, 버전 변경 시나리오

## 15) 접근성/모바일 UX
[A11y] Mobile & Touch UX + Focus

Description
모바일 터치 타겟(44px), 포커스/읽기 순서, 스크린 리더 라벨 등 기본 접근성 보장.

Tasks

 터치 타겟/간격 SCSS

 포커스 스타일/키보드 내비게이션

 ARIA 라벨/역할 지정

 스크린 리더용 라이브 리전(카운트 변경 알림)

AC

 터치 타겟 최소 44px

 카운트 변경 시 보조기기에서 읽힘

Test Notes

탭 순서, iOS/Android 스크린 리더 간단 확인

## 16) 스타일 가이드
[Styles] SCSS 구조/토큰 정리

Description
컴포넌트 단위 SCSS 모듈, 변수/믹스인/유틸 클래스로 공통화. 다크모드 제외.

Tasks

 /styles/_variables.scss, _mixins.scss, _utilities.scss

 컴포넌트별 모듈 SCSS

 모바일 레이아웃(시트/모달/칩/토글/버튼)

AC

 SCSS 변수/믹스인으로 중복 제거

 주요 컴포넌트에 모듈 SCSS 적용

Test Notes

스타일 회귀는 시각 확인(스토리샷 선택)

## 17) 테스트 모음
[Tests] Unit & Integration for Filters

Description
주요 로직(제한/검증/직렬화/카운트)의 단위/통합 테스트.

Tasks

 Store 유닛 테스트(액션/검증/셀렉터)

 각 UI 컴포넌트 상호작용 테스트

 카운트 로직 통합 테스트(협의/무관 제외 포함)

 Apply/Reset 플로우 테스트

AC

 핵심 경로 커버리지 80%+

 시나리오 1/2 통합 테스트 통과

Test Notes

MSW 활용 시 더미 엔드포인트로 count 응답