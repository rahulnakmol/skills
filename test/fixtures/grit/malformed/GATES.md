# Gates: malformed fixture

Scope: A structurally broken fixture — G1 declares a CHECK with no matching EXPECT — used to exercise gate-lint's parse-error path.

- [ ] G1: has a check but no matching expectation
  CHECK: node -e "console.log('OK_TOKEN')"
  EVIDENCE: pending
