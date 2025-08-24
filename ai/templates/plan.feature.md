# 📝 Feature Planning Prompt

## 🎯 목적
새로운 기능 아이디어를 정리 → 실행 가능한 이슈/작업 단위로 변환

---

## 📌 사용 방법
1. 기능 개요 / 목적을 입력한다.
2. 수용 기준(AC)을 구체적으로 작성한다.
3. 영향 영역(components/stores/api/styles/tests)을 명시한다.
4. 이 템플릿을 Cursor Agent (⌃+I)에 붙여넣는다.

---

## 🚦 가드레일
You are in **PLANNING-ONLY** mode.
DO NOT create or modify files.
DO NOT generate runnable code.
Only produce a planning document (Markdown).
Stop after the **Tasks → Issues** section.

---

## 입력 템플릿
Feature:
- 이름:
- 목적/가치:
- 사용자 시나리오:

Acceptance Criteria (AC):
- [ ] AC-1
- [ ] AC-2
- [ ] AC-3

Scope:
- Impact: components / stores / api / styles / tests
- Out-of-scope:
- Constraints: Zustand + SCSS only; no new libraries

Output:
- GitHub Issue bodies (title, description, task list)

---

## Output contract
- Format: Markdown only
- No code blocks except **TypeScript interface sketches** (not runnable)
- Do not propose exact file paths beyond `/src/...` sketches
- End with:
  - CONFIRM: READY FOR DESIGN STEP
