# Git Convention

## 1. 브랜치 구조

- `main`: 배포 가능한 최종 코드
- `develop`: 기능 통합 및 개발 브랜치
- `feat/*`: 새로운 기능 개발
- `fix/*`: 버그 수정
- `refactor/*`: 기능 변경 없는 코드 개선
- `chore/*`: 환경설정 및 기타 작업
- `docs/*`: 문서 작업

## 2. 브랜치 이름

브랜치 이름은 `작업유형/이슈번호-작업내용` 형식으로 작성한다.

```text
feat/12-daily-record
feat/15-caregiver-checklist
fix/21-login-error
refactor/24-api-module
chore/init-frontend
```

## 3. 커밋 메시지

커밋 메시지는 다음 형식으로 작성한다.

type: 작업 내용

예시
feat: 산모 일일 상태 기록 폼 구현
fix: 체크리스트 완료 상태 오류 수정
style: 홈 화면 회복 주차 배지 스타일 수정
refactor: 상태 기록 API 호출 로직 분리
docs: 프로젝트 실행 방법 추가
chore: Prettier 설정 추가

## 4. 작업 흐름

1. 작업할 Issue를 생성한다.
2. develop 브랜치를 최신 상태로 업데이트한다.
3. develop에서 작업 브랜치를 생성한다.
4. 기능 단위로 커밋한다.
5. 원격 저장소에 Push한다.
6. develop을 대상으로 Pull Request를 생성한다.
7. 코드 리뷰와 수정을 진행한다.
8. 승인 후 병합한다.

## 5. Pull Request 규칙

PR 하나에는 하나의 기능 또는 목적만 포함한다.
관련 Issue를 연결한다.
UI 변경이 있으면 스크린샷을 첨부한다.
직접 develop 또는 main에 Push하지 않는다.
리뷰 반영이 끝난 뒤 병합한다.

## 6. Merge 규칙

기능 브랜치는 develop으로 병합한다.
배포 가능한 버전만 develop에서 main으로 병합한다.
