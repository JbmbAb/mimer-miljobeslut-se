# Mimer kontrollcentral – intern API-prototyp

Denna Node.js-tjänst är en **lokal, skrivskyddad adapter** och inte en produktionsklar autentiserings- eller beslutsplattform. Den exponerar endast GET /api/v1/evidence på 127.0.0.1. Alla övriga metoder avvisas. Den kan inte skriva beslut, godkänna merge eller starta drift.

## Start
Node.js 20+ krävs. Sätt MIMER_CONTROL_TOKEN (slumpmässig hemlighet om minst 32 byte), MIMER_CONTROL_EVIDENCE_FILE (lokal JSON-snapshot) och eventuellt MIMER_CONTROL_PORT; kör node kontroll-server/server.mjs.

Exempel på filformat: {"schema_version":1,"items":[]}. Denna snapshot är **inte ett runtimebevis**. Svaret märks därför verified_runtime:false och local_unverified_snapshot.

## Säkerhetsgräns
Koppla **inte** denna tjänst direkt till internet eller till det publika GitHub Pages-projektet. Bearer-token över HTTP får endast användas lokalt; produktionsåtkomst kräver separat autentiserad TLS-terminerande proxy, rollstyrd behörighet, CSRF-/sessionsskydd där relevant, revisionslogg, källvalidering, säkra svarsscheman och penetrationstest. Låt inte browsern innehålla hemligheter. Använd inte denna tjänst för beslutsskrivning. `noindex` är inte åtkomstskydd.

GO/STOP och signerade attesteringar måste hämtas från auktoritativt evidenslager och får inte härledas från denna API-prototyp.
