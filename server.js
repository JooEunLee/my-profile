'use strict';

const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const PORT = 3000;
const HOST = '127.0.0.1';

// 브라우저에 공개할 파일만 등록합니다.
const routes = new Map([
  ['/', { file: 'index.html', type: 'text/html; charset=utf-8' }],
  ['/index.html', { file: 'index.html', type: 'text/html; charset=utf-8' }],
  ['/styles.css', { file: 'styles.css', type: 'text/css; charset=utf-8' }],
  ['/assets/profile.jpg', { file: 'assets/profile.jpg', type: 'image/jpeg' }],
]);

function sendText(response, status, message, headers = {}) {
  response.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(message),
    ...headers,
  });
  response.end(message);
}

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendText(response, 405, '허용되지 않는 요청 방식입니다.\n', {
      Allow: 'GET, HEAD',
    });
    return;
  }

  let pathname;
  try {
    pathname = new URL(request.url, `http://${HOST}:${PORT}`).pathname;
  } catch {
    sendText(response, 400, '올바르지 않은 요청 주소입니다.\n');
    return;
  }

  // 페이지에서 사용하는 파비콘은 index.html에 포함되어 있습니다.
  if (pathname === '/favicon.ico') {
    response.writeHead(204);
    response.end();
    return;
  }

  const route = routes.get(pathname);
  if (!route) {
    sendText(response, 404, '페이지를 찾을 수 없습니다.\n');
    return;
  }

  try {
    // 실행한 터미널 위치와 관계없이 server.js 기준으로 파일을 찾습니다.
    const content = await readFile(path.join(__dirname, route.file));
    response.writeHead(200, {
      'Content-Type': route.type,
      'Content-Length': content.length,
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sendText(response, 404, '파일을 찾을 수 없습니다.\n');
    } else {
      console.error('파일을 제공하는 중 오류가 발생했습니다:', error);
      sendText(response, 500, '서버 오류가 발생했습니다.\n');
    }
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('3000번 포트가 사용 중입니다. 해당 포트의 서버를 종료한 뒤 다시 실행해 주세요.');
  } else {
    console.error('서버를 시작하지 못했습니다:', error.message);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`프로필 웹사이트 실행 중: http://localhost:${PORT}`);
  console.log('종료하려면 Ctrl+C를 누르세요.');
});
