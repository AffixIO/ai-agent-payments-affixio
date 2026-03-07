#!/usr/bin/env node
/**
 * Optional local server for AffixIO demos. Production demos run at https://demo.affix-io.com
 * and use https://api.affix-io.com (no localhost).
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.resolve(__dirname);

const MIMES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown',
};

function sendFile(res, file, mime, skipCache) {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const headers = { 'Content-Type': mime };
    if (!skipCache && (mime.includes('javascript') || mime.includes('css')))
      headers['Cache-Control'] = 'public, max-age=60';
    res.writeHead(200, headers);
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let p = req.url === '/' ? '/' : req.url;
  p = p.split('?')[0];
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  const ext = path.extname(file);
  const mime = MIMES[ext] || 'application/octet-stream';

  fs.stat(file, (err, stat) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    if (stat.isDirectory()) {
      const index = path.join(file, 'index.html');
      fs.readFile(index, (errIndex, data) => {
        if (errIndex) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }
    sendFile(res, file, mime, ext === '.html');
  });
});

server.listen(PORT, () => {
  console.log('AffixIO demos: http://localhost:' + PORT);
  console.log('API: https://api.affix-io.com');
});
