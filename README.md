# empresa-base

**Ambiente de referencia** del modelo `Organization-base`: la "empresa base" que sirve de
molde antes de crear orgs de alumnos (MonRot, etc.). Implementa el flujo profesional completo,
gratis y durable.

Docs: `montidev/organization-base` (el playbook) · `montidev/hub` (registry + plantillas).

## Qué demuestra

| Pieza | Cómo |
|---|---|
| **Ambientes = ramas** | `dev` (Dev) · `qa` (QA) · `main` (Prod). Cada una su URL en Vercel. |
| **Flujo con PR** | feature → PR a `dev` → `qa` → `main`. Nadie toca prod a mano. |
| **E2E con Playwright** | `tests/gol.spec.ts` prueba el botón de GOOOL. Free + durable. |
| **CI** | `ci/e2e.yml` corre el test en cada push/PR (ver "Activar CI"). |
| **Gate local** | `.githooks/pre-push` corre los tests antes de subir. |

## Activar CI

El workflow vive en `ci/e2e.yml` (y no en `.github/workflows/`) porque el token de `gh` usado
para crear el repo no tenía el scope `workflow`. Para activarlo, una de dos:

```bash
# Opción A — habilitar el scope una vez (sirve para todos los repos):
gh auth refresh -h github.com -s workflow
mkdir -p .github/workflows && git mv ci/e2e.yml .github/workflows/e2e.yml
git commit -m "ci: activo workflow e2e" && git push

# Opción B — pegarlo desde la web: GitHub → Add file → New file →
#   ruta .github/workflows/e2e.yml → pegar el contenido de ci/e2e.yml → commit.
```

## Setup local

```bash
npm install
npx playwright install chromium
git config core.hooksPath .githooks   # activa el pre-push
npm run e2e                            # corre el test (levanta un server estático solo)
```

## Ramas / ambientes

```
dev   → integración        (rama dev)
qa    → pruebas / aprobación (rama qa)
main  → producción          (rama main, protegida: requiere PR)
```

## Cómo se usa de molde

Para una empresa nueva de alumnos: seguir `organization-base/07_PROVISIONING.md`, usando este
repo como referencia de estructura. Copiar `playwright.config.ts`, `tests/`, `e2e.yml` y
`.githooks/` desde acá o desde `hub/templates/`.
