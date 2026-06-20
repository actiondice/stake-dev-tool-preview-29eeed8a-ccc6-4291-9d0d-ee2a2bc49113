const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.wasm':'application/wasm','.atlas':'text/plain; charset=utf-8','.mp3':'audio/mpeg','.wav':'audio/wav','.ttf':'font/ttf'};
const server = http.createServer((req,res)=>{
  let url = new URL(req.url, 'http://127.0.0.1');
  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/index.html';
  let file = path.resolve(root, '.' + p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file,(err,st)=>{
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control':'no-store',
      'Access-Control-Allow-Origin':'*',
      'Cross-Origin-Resource-Policy':'cross-origin'
    });
    fs.createReadStream(file).pipe(res);
  });
});
const ports = [8000,3000,8080,5173,5500,9000];
function listen(i){ if(i>=ports.length) process.exit(2); server.listen(ports[i], '127.0.0.1').on('listening',()=>console.log('STARTED '+ports[i])).on('error',()=>listen(i+1)); }
listen(0);
