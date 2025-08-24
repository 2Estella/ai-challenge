# 04) Test & a11y Sweep (테스트/접근성 마무리 점검)

## 🎯 Goal
기능 완성 후, 단위/컴포넌트/E2E 테스트와 접근성을 한 번에 스윕하여 품질 게이트를 통과시킨다.

## 📥 Inputs
- 구현된 컴포넌트/페이지
- 상호작용 시나리오(핵심 플로우)
- 접근성 요구(role, label, focus trap 등)

## ✅ Checklist
### Unit/Component (Vitest + RTL)
- [ ] 렌더링 테스트 (필수 요소/텍스트/role 확인)
- [ ] 상호작용 테스트 (클릭/입력/토글)
- [ ] 스토어 반영 테스트 (selectors 결과)
- [ ] 에러/빈 상태 브랜치

### E2E (Playwright)
- [ ] 핵심 유저 플로우(해피패스)
- [ ] 경계 조건(빈 결과/에러 배너)
- [ ] UI 회귀 스냅샷(선택)

### a11y
- [ ] 위젯 role/aria-label 적절성
- [ ] 키보드 내비게이션(Tab/Shift+Tab)
- [ ] 모달/메뉴 포커스 트랩 및 복귀
- [ ] 포커스 표시(:focus-visible)

## 🧩 Steps
1) RTL 단위/컴포넌트 테스트 보강
2) Playwright로 페이지 흐름 1~2개 작성
3) a11y 수동 점검 + 간단한 자동화 검사
4) Typecheck/Lint/Test 전체 돌려 그린 상태 확인
5) CI에서 동일 게이트 통과

## 🤖 Agent Prompt (use in Cursor Agent ⌃+I)
Enhance tests and accessibility for the implemented feature.

Targets:
- Components/Pages: <list>
- Scenarios: <list of user flows>

Requirements:
- RTL: render + interaction + store selector assertions
- Playwright: at least one happy path
- a11y: roles/labels/focus trap/keyboard nav

Verify:
- Run npm run typecheck && npm run lint && npm test
- Summarize gaps and create TODO list if any


## 📤 Outputs
- 강화된 `*.test.ts(x)` 파일들
- `playwright` 테스트
- a11y 점검 결과와 수정 PR(필요 시)
