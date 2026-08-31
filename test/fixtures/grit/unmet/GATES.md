# Gates: unmet fixture

Scope: A deterministic fixture with one met gate and one unmet gate, used to exercise gate-check --status and the stop hook against a blocking ledger.

- [x] G1: prints its first fixed token when run
  CHECK: node -e "console.log('OK_TOKEN_ONE')"
  EXPECT: OK_TOKEN_ONE
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/repo; EXPECT=matched; output-sha256=6bf5c2e1a9d0b3f47c8e1d2a5f60934bcb1e2a3d4f5061728394a5b6c7d8e9f; output-bytes=13

- [ ] G2: prints its second fixed token when run
  CHECK: node -e "console.log('OK_TOKEN_TWO')"
  EXPECT: OK_TOKEN_TWO
  EVIDENCE: pending
