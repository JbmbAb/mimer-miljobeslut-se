# Lokal verifieringscentral – utvecklingskandidat
Körs på 127.0.0.1:8787 med Node.js 20+. API och webbgränssnitt är skrivskyddade. **Inte produktionsklart.**

Sätt `MIMER_CONTROL_TOKEN` till minst 32 slumpmässiga byte och `MIMER_CONTROL_EVIDENCE_FILE` till en lokal JSON-fil med `{"schema_version":1,"items":[]}`. Starta `node kontroll-server/server.mjs`.

API-anrop kräver `Authorization: Bearer <token>`. Webbgränssnittet kräver samma header och är därför främst avsett för lokal API-testklient; en vanlig webbläsare kan inte öppna det utan en separat autentiserande lokal proxy. **Lägg aldrig token i URL, frontendkod eller publikt repo.**

Posterna måste ha `category` = stop, gap, deviation eller decision. Övriga visningsfält kan anges: title, stage, status, baseline, candidate_sha, source, tests, attestation, provenance, next_step.

Alla lokala snapshots märks uttryckligen som icke runtimeverifierade. Ingen automatisk GO-bedömning finns. Beslutsskrivning, signerade attesteringar, Mimer-arkivkoppling, identitetsstyrning, revisionslogg, källvalidering och driftsättning återstår. Publicera inte tjänsten direkt på internet; `noindex` är inte åtkomstskydd.
