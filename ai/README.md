# 🤖 AI Development Assistant

이 폴더는 **Cursor Agent**와 함께 사용하여 AI 기반 개발 워크플로우를 체계화하고 표준화하기 위한 도구 모음입니다.

## 📁 폴더 구조

### `/playbooks` - 개발 워크플로우 가이드
- **01_plan_to_issues.md** - 기능 아이디어를 실행 가능한 이슈로 분해
- **02_design_to_types_store.md** - 설계 단계에서 타입과 스토어 정의
- **03_ui_slice_loop.md** - UI 컴포넌트 개발 반복 루프
- **04_test_and_a11y_sweep.md** - 테스트와 접근성 검토

### `/templates` - AI 프롬프트 템플릿
- **plan.feature.md** - 기능 계획 수립
- **design.state.md** - 상태 설계
- **gen.component.md** - 컴포넌트 생성
- **test.playwright.md** - E2E 테스트 작성
- **review.checklist.md** - 코드 리뷰 체크리스트

### `/prompts` - 특정 작업용 프롬프트
- **code.review.md** - 시니어 FE 관점의 코드 리뷰
- **a11y.guidelines.md** - 접근성 가이드라인
- **log.now.md** - 대화 로깅

### `/examples` - 실제 사용 사례
- **plan.albamon-detail-conditions.md** - 알바몬 상세 조건 기능 계획 예시

### `/logs` - AI 대화 기록
- 자동 생성되는 대화 로그 저장소

## 🚀 사용 방법

### 1. 기능 계획 (Planning)
```bash
# Cursor Agent (⌃+I)에서 사용
/templates/plan.feature.md 템플릿 활용
→ /playbooks/01_plan_to_issues.md 워크플로우 실행
```

### 2. 설계 (Design)
```bash
# 타입과 스토어 설계
/playbooks/02_design_to_types_store.md 워크플로우
→ /templates/design.state.md 템플릿 활용
```

### 3. 구현 (Implementation)
```bash
# UI 컴포넌트 개발
/playbooks/03_ui_slice_loop.md 워크플로우
→ /templates/gen.component.md 템플릿 활용
```

### 4. 검증 (Verification)
```bash
# 테스트와 접근성 검토
/playbooks/04_test_and_a11y_sweep.md 워크플로우
→ /templates/test.playwright.md 템플릿 활용
```

## 🎯 핵심 원칙

### Stage Gates
- **PLAN** → **DESIGN** → **IMPLEMENT** → **VERIFY**
- 각 단계별로 명확한 산출물과 검증 기준

### Clean Code
- React + TypeScript + Zustand + SCSS 기반
- 함수형 컴포넌트, 불변성, 타입 안전성
- 접근성과 성능 최적화

### AI 협업
- 명확한 프롬프트와 체크리스트
- 일관된 워크플로우와 템플릿
- 자동화된 로깅과 추적

## 📚 학습 리소스

- **워크플로우**: `/playbooks/` 폴더의 순차적 가이드
- **템플릿**: `/templates/` 폴더의 재사용 가능한 프롬프트
- **사례**: `/examples/` 폴더의 실제 구현 예시
- **가이드라인**: `/prompts/` 폴더의 전문 지식

## 🔄 워크플로우 예시

```
아이디어 → 계획 → 설계 → 구현 → 테스트 → 배포
   ↓         ↓      ↓      ↓      ↓      ↓
plan.md → issues → types → UI → tests → review
```

이 폴더를 통해 AI와의 협업을 체계화하고, 일관된 개발 품질을 유지할 수 있습니다.
