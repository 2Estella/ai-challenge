# AI Challenge — Albamon Search Filter Clone

[프로젝트 보기](https://ai-challenge-3wda4v0vt-estellas-projects-31e38480.vercel.app/)

📂 추가 문서  
- [.cursor 가이드](./.cursor/README.md)  
- [ai 워크플로우 가이드](./ai/README.md)  


## ​ 참여 계기
1. 처음 이 과제의 광고를 보게 되었을 때 **AI의 활용법을 깊이 공부할 수 있는 기회**라고 생각했습니다.  
   사실 현재도 AI를 사용하여 업무를 하고 있지만, *“어떻게 하면 더 잘 쓸까?”* 하는 고민은 항상 있었습니다.  
   이번 기회로 AI 에이전트를 ‘잘’ 활용해 볼 계획이었습니다.  
2. 실무에서 Vue만 사용했던 제가 실제 돌아가는 서비스의 화면을 **React로 구현해볼 수 있는 좋은 기회**라고 생각했습니다.  
   (물론 코딩은 AI가 거의 다해줬습니다 ㅎㅎ)

---

## ​ 과제 진행 내용
이번 챌린지의 제 기준은 **‘지속 가능한 서비스 개발에 AI를 어떻게 적용할까?’** 였습니다.  
단순한 페이지 클론 코딩이 아니라, 앞으로 쭉 이용할 서비스를 설계한다는 가정 하에 **AI를 어떻게 더 쉽고 효율적으로 쓸 수 있을까** 고민했습니다.

### 1. 기획 / 분석
- 알바몬 검색조건설정 페이지의 분석이 필요했습니다.  
- 페이지 분석은 **GPT-5의 리서치 기능**을 이용했고, 일부 기능 및 UI/UX 분석은 직접 보완했습니다.  
- 이를 토대로 **‘기획’ 프롬프트**를 작성했습니다.

### 2. AI 활용법 고민 및 프롬프트 작성
- 가장 많은 시간을 쏟은 부분이었습니다.  
- 고민 포인트: **“어떻게 하면 AI를 최대한 자동화에 활용하고, 팀 협업 시 균일한 결과물을 유지할 수 있을까?”**  
- 결론:  
  - **AI 코딩 스타일(룰)을 강하게 관리**  
  - **프롬프트 규격을 통일**  
  - 자주 쓰이는 기능은 **템플릿화**하여 필요 시 복사-붙여넣기로 간편히 활용  

- 최종 구조:
```text
ai-challenge/
├── .cursor/ # Cursor IDE AI 규칙 설정
│ ├── README.md # Cursor 설정 설명서
│ ├── rules/ # AI 코딩 규칙 (.mdc 파일들)
│ │ ├── 00-project-guidelines.mdc # 프로젝트 전체 가이드라인
│ │ ├── 10-react.mdc # React 컴포넌트 규칙
│ │ ├── 20-zustand.mdc # 상태 관리 규칙
│ │ ├── 30-styling-scss.mdc # SCSS 스타일링 규칙
│ │ ├── 40-api.mdc # API 설계 규칙
│ │ ├── 50-testing.mdc # 테스트 작성 규칙
│ │ ├── 60-structure.mdc # 프로젝트 구조 규칙
│ │ ├── 70-agent-guardrails.mdc # AI 에이전트 안전장치
│ │ ├── 75-file-allowlist.mdc # 편집 허용 파일 범위
│ │ ├── 80-logging.mdc # 로깅 규칙
│ │ └── 99-assistant-style.mdc # AI 응답 스타일 규칙
│ └── logs/ # AI 대화 기록
│
└── ai/ # AI 개발 워크플로우 도구
├── README.md # AI 도구 사용법 설명서
├── playbooks/ # 개발 워크플로우 가이드
│ ├── 01_plan_to_issues.md # 기능 → 이슈 분해
│ ├── 02_design_to_types_store.md # 타입/스토어 설계
│ ├── 03_ui_slice_loop.md # UI 컴포넌트 개발
│ └── 04_test_and_a11y_sweep.md # 테스트/접근성 검토
├── templates/ # AI 프롬프트 템플릿
│ ├── plan.feature.md # 기능 계획 수립
│ ├── design.state.md # 상태 설계
│ ├── gen.component.md # 컴포넌트 생성
│ ├── test.playwright.md # E2E 테스트 작성
│ └── review.checklist.md # 코드 리뷰 체크리스트
├── prompts/ # 특정 작업용 프롬프트
│ ├── code.review.md # 시니어 FE 코드 리뷰
│ ├── a11y.guidelines.md # 접근성 가이드라인
│ └── log.now.md # 대화 로깅
├── examples/ # 실제 구현 사례
│ └── plan.albamon-detail-conditions.md # 알바몬 상세 조건 예시
└── logs/ # AI 대화 기록
```

- **.cursor/**: AI가 자동으로 규칙을 준수하도록 강제  
- **ai/**: 개발자가 AI와 체계적으로 협업할 수 있는 도구 제공  

### 3. UI 구현
- **디자인 추출 과정**
  1. `htmlToFigma` 크롬 앱으로 예시 페이지 export  
  2. Figma `htmlToFigma` 플러그인으로 디자인 생성  
     <img width="2048" height="874" alt="image" src="https://github.com/user-attachments/assets/002eed42-76e5-4075-a0ba-fe1957f24c29" />
  3. `Cursor talk to Figma` MCP를 통해 Cursor ↔ Figma 연동
    <img width="2880" height="1510" alt="image" src="https://github.com/user-attachments/assets/fb9f0df7-1677-4e65-849b-7fc17996fd90" />


- 이렇게 연동하여 **UI 설계 → 코드 구현** 과정을 원활히 진행할 수 있었습니다.

---

## ​​ 사용한 AI / Tools
- **GPT-5**  
- **Cursor**  
- **htmlToFigma**  
- **Cursor talk to Figma**

---

## ​ 회고
바쁜 일정 속에서 진행하다 보니, 충분한 시간을 쏟지 못한 점이 아쉽습니다.  
특히 **테스트 코드 도입**, 접근성 검토, 성능 최적화 같은 부분은 더 보완하고 싶습니다.  

그럼에도 이번 과제를 통해, **AI를 단순히 코드 생성 도구가 아닌 개발 파트너로 활용할 수 있다**는 가능성을 확인할 수 있었습니다.  
앞으로는 이러한 워크플로우를 발전시켜 실제 서비스 개발에도 적용해 볼 예정입니다.
