# 개인 프로필 웹사이트

HTML과 CSS로 만든 반응형 개인 프로필 페이지입니다. Node.js 내장 HTTP 모듈로 서버를 실행할 수 있습니다. 외부 패키지 설치나 빌드가 필요하지 않으며, 인터넷에 연결하지 않아도 페이지와 사진이 표시됩니다.

## 서버 실행하기

Node.js와 npm이 설치된 환경에서 이 프로젝트 폴더의 터미널을 열고 실행하세요.

```sh
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다. 서버를 종료하려면 실행 중인 터미널에서 `Ctrl+C`를 누르세요.

`node server.js`로 직접 실행할 수도 있습니다. 외부 패키지가 없으므로 `npm install`은 필요하지 않습니다. 서버는 이 컴퓨터의 루프백 주소 `127.0.0.1`의 3000번 포트에서 실행됩니다.

3000번 포트가 이미 사용 중이면 기존 서버를 종료한 뒤 다시 실행하세요. 서버 없이 `index.html`을 브라우저에서 직접 여는 방식도 사용할 수 있습니다.

## 파일

- `index.html`: 이름, 자기소개, 관심 분야, 이메일 등 페이지 내용
- `styles.css`: 색상, 글꼴, 배치와 모바일 스타일
- `assets/profile.jpg`: 교체 가능한 예시 프로필 사진
- `server.js`: 홈페이지, CSS와 사진을 제공하는 Node.js HTTP 서버
- `package.json`: `npm start` 실행 명령

## 내 정보로 바꾸기

현재 이름 **김하늘**, 영문 이름 **Haneul Kim**, 자기소개와 관심 분야는 모두 예시입니다. 본인의 정보에 맞게 `index.html`의 본문, 페이지 제목과 설명, 메뉴의 접근성 문구, 푸터를 수정하세요.

- 이메일 `hello@example.com`을 검색하여 표시 주소와 두 개의 `mailto:` 링크를 모두 변경하세요.
- 사진은 `assets/profile.jpg`를 본인의 사진으로 교체하고 `<img>`의 `alt` 설명도 수정하세요.
- 사진 비율이나 얼굴 위치는 `styles.css`의 `.portrait img`에서 조정할 수 있습니다.
- 대표 색상은 `styles.css` 상단의 `:root`에서 변경할 수 있습니다.

사진은 사용자 본인의 사진이 아닌 [Unsplash 예시 이미지](https://images.unsplash.com/photo-1534528741775-53994a69daeb)입니다.
