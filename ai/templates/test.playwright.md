# ✅ Playwright Test Prompt

## 🎯 목적
주요 사용자 시나리오를 **E2E 테스트**로 검증한다.
이 단계에서는 Playwright 기반 테스트 코드만 생성한다.

---

## 📌 사용 방법
1. 테스트 대상 컴포넌트/플로우를 지정한다.
2. 주요 시나리오(AC 기반)를 적는다.
3. Cursor Agent (⌃+I)에 붙여넣는다.

---

## 🚦 가드레일
You are in **TEST-GENERATION-ONLY** mode.
MUST create runnable Playwright test code (`*.spec.ts`).
Follow project conventions (TypeScript, MSW mock if needed).
Keep tests fast, deterministic (no arbitrary `timeout`).

---

## 입력 템플릿
Context:
- 테스트 대상 (페이지/컴포넌트):
- 시나리오 (AC):
  - [ ] 시나리오 1
  - [ ] 시나리오 2
  - [ ] 시나리오 3

Constraints:
- Zustand state only (no other state libs)
- SCSS 기반 UI
- Mock API with MSW (no real calls)

---

## Output contract
- Playwright test code in TypeScript (`*.spec.ts`)
- 테스트는 Happy Path + Critical Regression 최소 커버
- 코드 블록은 반드시 실행 가능해야 함
- End with:
  - CONFIRM: TEST CASES GENERATED