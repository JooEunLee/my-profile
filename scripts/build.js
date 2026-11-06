'use strict';

const { copyFileSync, mkdirSync, rmSync } = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'dist');
const publicFiles = ['index.html', 'styles.css', 'assets/profile.jpg'];

// 매번 배포 결과를 새로 만들고 웹페이지에 필요한 파일만 포함합니다.
rmSync(outputDirectory, { recursive: true, force: true });

for (const file of publicFiles) {
  const destination = path.join(outputDirectory, file);
  mkdirSync(path.dirname(destination), { recursive: true });
  copyFileSync(path.join(projectRoot, file), destination);
}

console.log('Vercel 배포 파일 생성 완료: dist/ (HTML, CSS, 프로필 사진)');
