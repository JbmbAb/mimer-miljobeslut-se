import test from 'node:test';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import {mkdtemp,readFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';import {fileURLToPath} from 'node:url';
test('metadata collector never grants runtime authority',async()=>{const dir=await mkdtemp(join(tmpdir(),'mimer-git-'));const repo=join(dir,'repo'),out=join(dir,'snapshot.json');try{
 execFileSync('git',['init','-q',repo]);execFileSync('git',['-C',repo,'-c','user.name=Test','-c','user.email=test@example.invalid','commit','-q','--allow-empty','-m','fixture']);execFileSync('git',['-C',repo,'branch','integration/mimer-en-linje']);
 const collector=fileURLToPath(new URL('../collect-local-git.mjs',import.meta.url));
 execFileSync(process.execPath,[collector,repo,out]);
 const doc=JSON.parse(await readFile(out,'utf8'));assert.equal(doc.schema_version,1);assert.equal(doc.items.length,1);assert.equal(doc.items[0].category,'gap');assert.equal(doc.items[0].status,'OBSERVED_ONLY');assert.equal(doc.items[0].attestation,'Ej verifierad');assert.match(doc.items[0].candidate_sha,/^[0-9a-f]{40}$/);
 assert.throws(()=>execFileSync(process.execPath,[collector,repo,out],{stdio:'pipe'}));assert.throws(()=>execFileSync(process.execPath,[collector,join(dir,'missing'),join(dir,'missing.json')],{stdio:'pipe'}));
}finally{await rm(dir,{recursive:true,force:true})}});
