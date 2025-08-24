# 03) UI ↔ Slice Loop (컴포넌트와 상태 연결 반복 루프)

## 🎯 Goal
UI 컴포넌트를 작은 단위로 생성하고, zustand selector로 연결 → 상호작용/스타일 → 단위 테스트까지 한 루프에서 완료.

## 📥 Inputs
- 컴포넌트 명세(단일 책임, props, 이벤트)
- 연결할 store selector/액션
- 레이아웃/스타일 요구(BEM, SCSS 모듈)

## ✅ Checklist
- [ ] 단일 책임(1 컴포넌트 = 1 역할)
- [ ] Props 인터페이스 상단 정의, 필수/옵션/기본값 명확
- [ ] Store selector 최소 구독(shallow)
- [ ] SCSS 모듈 + BEM 네이밍 준수
- [ ] a11y: 역할/레이블/키보드 포커스
- [ ] 단위/컴포넌트 테스트 기본 시나리오 1개 이상

## 🧩 Steps
1) TSX 스캐폴드(Props/마크업/aria)
2) zustand selector 연결 + 액션 바인딩
3) SCSS 모듈 생성(BEM) & 연결
4) 상호작용(핸들러)과 파생 값(useMemo) 정리
5) 테스트(렌더/상호작용/a11y) 추가
6) 리팩토링(중복/파생 상태 제거), 스냅샷 확인

## 🤖 Agent Prompt (use in Cursor Agent ⌃+I)
Generate and connect a UI component.

Component:
- Name: <ComponentName>
- Responsibility: <single purpose>
- Props: <required/optional with types>
- Store: selectors/actions to use

UI/Styles:
- SCSS module: <ComponentName>.module.scss
- BEM block: .<ComponentName>

Tests:
- Render and basic interaction
- a11y checks (role/label/focus)

Constraints:
- No inline styles, SCSS only
- Strict TS, no any
- Minimal subscriptions via selectors (shallow)


## 📤 Outputs
- `components/<ComponentName>.tsx`
- `components/<ComponentName>.module.scss`
- `components/<ComponentName>.test.tsx`
