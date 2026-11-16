import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { timingSafeEqual } from 'node:crypto';
const host='127.0.0.1';
const port=Number(process.env.MIMER_CONTROL_PORT||8787);
const token=process.env.MIMER_CONTROL_TOKEN;
const evidenceFile=process.env.MIMER_CONTROL_EVIDENCE_FILE;
if(!token || Buffer.byteLength(token)<32 || !evidenceFile) throw Error('Missing token (min 32 bytes) or evidence file');
const valid=t=>{const a=Buffer.from(t||'');const b=Buffer.from(token);return a.length===b.length && timingSafeEqual(a,b)};
const server=http.createServer(async(req,res)=>{
  const headers={'Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'",'X-Content-Type-Options':'nosniff'};
  const send=(code,body)=>{res.writeHead(code,{...headers,'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(body))};
  if(!valid((req.headers.authorization||'').replace(/^Bearer /,'')))return send(401,{error:'unauthorized'});
  if(req.method!=='GET')return send(405,{error:'read_only'});
  if(req.url!=='/api/v1/evidence')return send(404,{error:'not_found'});
  try {
    const raw=await readFile(evidenceFile,'utf8');
    if(Buffer.byteLength(raw)>1024*1024)return send(413,{error:'too_large'});
    const doc=JSON.parse(raw);
    if(doc.schema_version!==1 || !Array.isArray(doc.items))return send(422,{error:'invalid_schema'});
    return send(200,{schema_version:1,source:'local_unverified_snapshot',verified_runtime:false,items:doc.items});
  } catch {return send(503,{error:'evidence_unavailable'})}
});
server.listen(port,host,()=>console.log('Control read-only API bound to loopback',port));
