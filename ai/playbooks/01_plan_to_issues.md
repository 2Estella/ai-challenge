# 01) Plan → Issues (기능 아이디어를 실행 가능한 이슈로 분해)

## 🎯 Goal
아이디어/요구사항을 명확한 수용 기준(AC)과 작업 단위 이슈로 쪼개어, 에이전트가 실행 가능한 형태로 만든다.

## 📥 Inputs
- 기능 개요(문제/가치/사용자 시나리오)
- 영향 영역(components, stores, api, styles, tests)
- 제약(Zustand/SCSS, 라이브러리 추가 금지 등)

## ✅ Checklist
- [ ] 기능 목적/가치가 한 줄로 명확히 정의됨
- [ ] 수용 기준(AC) 3~7개 목록화
- [ ] 범위(Scope)와 비범위(Out-of-scope) 구분
- [ ] 리스크/의존성(백엔드/API/디자인) 표기
- [ ] 이슈(Tasks)를 독립 실행 가능 단위로 분해
- [ ] Issue 템플릿: 제목/설명/작업목록/테스트 메모

## 🧩 Steps
1) 문제/가치 → 한 문장 요약
2) 사용자 흐름(간단 시나리오) 1~2개
3) AC 도출 (정확히 통과/실패 판단 가능)
4) 범위/비범위/의존성 정의
5) 작업 단위(Task)로 분해 (UI/Store/API/Tests)
6) Issue 템플릿으로 출력

## 🤖 Agent Prompt (use in Cursor Agent ⌃+I)
Create issues for the following feature.

Feature:
- Name: <feature-name>
- Purpose/Value: <why>
- User Scenarios: <bullet points>

Acceptance Criteria:
- <AC-1>
- <AC-2>
- <AC-3>

Scope:
- Impact: components/stores/api/styles/tests
- Out-of-scope: <items>
- Constraints: Zustand + SCSS only; no new libs

Output:
- GitHub Issue bodies (title, description, task list)
- One issue per executable unit


## 📤 Outputs
- GitHub/Jira 이슈 초안(여러 개)
- 각 이슈는 실행 가능한 Task 체크박스 포함
