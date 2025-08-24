# 🎨 State Design Prompt

## 🎯 목적
기능별 상태 구조(Zustand)와 데이터 모델을 설계한다.
이 단계에서는 **상태 다이어그램 / 인터페이스 스케치**까지만 산출한다.

---

## 📌 사용 방법
1. 관련 기능/컴포넌트를 지정한다.
2. 상태 도메인 / 액션을 정의한다.
3. 선택자/파생 상태까지 포함한다.
4. 이 템플릿을 Cursor Agent (⌃+I)에 붙여넣는다.

---

## 🚦 가드레일
You are in **DESIGN-ONLY** mode.
DO NOT create or modify files.
DO NOT generate runnable code.
Only produce state sketches and outline in Markdown.
Stop after selectors / state diagram section.

---

## 입력 템플릿
Context:
- 기능/컴포넌트 이름:
- 연관된 도메인:
- 예상 상호작용:

State Model:
- 주요 상태 필드:
- 액션:
- 선택자:
- 파생 상태:

Output:
- TypeScript 인터페이스 (스케치)
- 상태 다이어그램 (텍스트 기반)

---

## Output contract
- Markdown only
- 인터페이스는 TypeScript 스케치 (실행 불가)
- 상태/액션/선택자를 명확히 구조화
- End with:
  - CONFIRM: READY FOR GENERATION STEP