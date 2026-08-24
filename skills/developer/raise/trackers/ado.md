# Azure DevOps tracker

- SAFe hierarchy: Epic → Feature → User Story / Risk / Impediment, matching `slice/TEMPLATES.md` item types
- Field mapping:

| Work item contract field | ADO field |
|---|---|
| Goal | Title |
| Context + Scope | Description |
| Acceptance criteria | Acceptance Criteria |
| Parent links | Parent |

- v1 constraint, stated plainly: this backend generates an import file, it does not write to ADO directly. Run `node scripts/ado-export.mjs <bundle>` to produce `ado-import.csv`, then import it through Azure DevOps's own CSV import (Boards → Work Items → Import Work Items).
- Not idempotent across imports the way `github.md`/`linear.md` are — a re-export before a second import can create duplicates unless the CSV is reconciled by hand. Direct-write, PAT-authenticated idempotency is a tracked follow-up, not v1 scope.
