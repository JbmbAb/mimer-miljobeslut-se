# Evidensintegration: säker källgräns (2026-11-16)

## Faktiskt upptäckt, inte attesterat
På datorn Mimer finns en Git-arbetskopia i `C:\wt-loke-breadth-recon-01` med lokal referens `integration/mimer-en-linje`, vid inspektionen `84e109fca443baaf62b87a83ce2a62ea2fa2eaf0`. Det är **inte** ett bevis för att referensen är produktionsbaslinje eller senast accepterad kandidat.

Lokalt runtimeområde: `C:\Users\jimmy\.mimers\runtime\workspace-governance` med katalogerna `devgov-triage`, `knowledge-recovery`, `learning-evidence`, `recovery` och `value-recovery`. Det har inte fastställts vilka artefakter som är auktoritativa, kompletta eller signerade. Inga filer har importerats till webbprojektet.

## Kontrakt innan adapter får markera verifierat
1. Identifiera **kanonisk evidensmanifestdefinition** i Mimers privata huvudrepo, med formatversion, utfärdare, SHA-256, commit, dataset-version, tidskontrakt, källidentifierare och signatur-/attestkedja.
2. Verifiera signaturer, objektintegritet, källbehörighet, referensbindning och testkörning i Mimers befintliga verifierare, inte i frontend.
3. Exportera endast **sanerade, minimerade** poster till privat lokalt API. Ingen automatisk läsning av secrets, trusted-keys, persondata eller råloggar.
4. Separera `OBSERVED`, `TEST_PASS`, `ATTESTED` och `RUNTIME_VERIFIED`. Saknad/ogiltig attest ger STOPP, aldrig GO.
5. Håll `MAIN_MERGE_BLOCKED`, `PUSH_STOP` och `DRIFT_STOP` som auktoritativa backendgrindar, inte som ändringsbara UI-värden.

## Status
API-prototypen visar bara lokala snapshots och returnerar `verified_runtime:false`. Den kan inte ersätta de auktoritativa S8/Loke/LM/PostGIS-grindarna. Publicera inte intern evidens på miljobeslut.se.
