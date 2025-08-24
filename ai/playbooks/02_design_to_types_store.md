# 02) Design → Types & Store (상태 설계와 타입/스토어 반영)

## 🎯 Goal
도메인 타입/계약을 정의하고, Zustand store(s)와 셀렉터/액션을 표준 형태로 스캐폴딩한다.

## 📥 Inputs
- 도메인 모델/엔터티 정의(초안)
- 상태가 필요한 화면/컴포넌트 목록
- API 계약(없으면 msw로 가짜 계약)

## ✅ Checklist
- [ ] 도메인 타입: `types/`에 선언, UI와 API가 공유
- [ ] Store: `State`, `Actions` 인터페이스 분리
- [ ] Async 액션: loading/error/empty 상태 포함
- [ ] Selectors: 최소 구독 + shallow 비교
- [ ] Persist/Immer 등 미들웨어 필요성 검토
- [ ] JSDoc: 액션 목적/파라미터/리턴 명시

## 🧩 Steps
1) 도메인 타입 스케치 → `types/`에 선언
2) slice 단위(store 파일) 범위 확정
3) 초기값/파생 상태/액션 시그니처 정의
4) API 유무 확인 → msw 핸들러/타입 동기화
5) 대표 selector/유틸 생성
6) 샘플 사용 코드(컴포넌트) 스텁 작성

## 🤖 Agent Prompt (use in Cursor Agent ⌃+I)
Design Zustand store and types for the feature below.

Feature Context:
- Domain: <domain-name>
- Required State: <keys and shapes>
- Actions: <action list with intent>
- Async: <yes/no; loading/error handling rules>

Constraints:
- Place types under /src/types
- Create one store file per slice under /src/stores
- Provide selectors with shallow compare
- JSDoc for each action

Output:
- TypeScript: domain types, store file(s), selectors
- Minimal usage example snippet

## 📤 Outputs
- `types/*.ts`, `stores/*Store.ts` (+ selectors)
- msw 핸들러(필요 시)와 타입 정합성 유지