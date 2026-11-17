// Read-only metadata collector. No raw evidence, credentials or attestations are exported.
import {execFileSync} from 'node:child_process';
import {writeFileSync,realpathSync} from 'node:fs';
import {resolve} from 'node:path';
const [repoArg,outArg]=process.argv.slice(2);
if(!repoArg||!outArg){console.error('Usage: node collect-local-git.mjs <local-mimer-repo> <new-output-json>');process.exit(2)}
const repo=realpathSync(resolve(repoArg));
const git=(...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',timeout:10000,maxBuffer:16384,windowsHide:true}).trim();
try{
 const sha=git('rev-parse','--verify','refs/heads/integration/mimer-en-linje^{commit}');
 const date=git('show','-s','--format=%cI',sha);
 const snapshot={schema_version:1,items:[{
  category:'gap',stage:'Plattform',title:'Integrationslinje: lokal Git-observation, ej attestering',
  status:'OBSERVED_ONLY',candidate_sha:sha,source:'local_git_ref:refs/heads/integration/mimer-en-linje',
  provenance:'Git commit '+sha+'; commit date '+date+'; collector=collect-local-git-v1',
  tests:'Ej verifierat av denna insamlare',attestation:'Ej verifierad',
  next_step:'Jämför SHA mot beslutslogg, fryst baslinje och signerad attest innan godkännande'
 }]};
 writeFileSync(resolve(outArg),JSON.stringify(snapshot,null,2)+'\n',{flag:'wx',mode:0o600});
 console.log('Created local metadata-only snapshot; no runtime attestation; DRIFT_STOP');
}catch(e){console.error('Collection failed closed:',e.code||e.message);process.exit(1)}
