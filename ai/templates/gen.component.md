# 🏗️ Component Generation Prompt

## 🎯 목적
디자인된 컴포넌트를 실제 React + TS + SCSS 코드로 생성한다.
(재사용 가능 / SRP 원칙 / props 계약 명확)

---

## 📌 사용 방법
1. 컴포넌트 이름과 목적을 지정한다.
2. props 계약 / emit 이벤트 정의를 적는다.
3. UI 레이아웃/스타일 요구사항을 작성한다.
4. 이 템플릿을 Cursor Agent (⌃+I)에 붙여넣는다.

---

## 🚦 가드레일
You are in **GENERATION-ONLY** mode.
MUST create runnable React + TypeScript + SCSS code.
Follow Clean Code + 프로젝트 컨벤션.
Generate exactly **one component per run**.

---

## 입력 템플릿
Component:
- 이름:
- 목적:
- props:
- emit:
- UI 요구사항:

Constraints:
- Zustand 상태만 사용
- SCSS 모듈만 사용
- No external UI libraries

---

## Output contract
- 코드 블록은 반드시 실행 가능한 React + TS + SCSS
- Props 정의: property, type, default, required 명시
- Emit 이벤트: 타입과 기능 설명 포함
- End with:
  - CONFIRM: COMPONENT GENERATED