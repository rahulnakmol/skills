# Gates: clean fixture

Scope: A deterministic fixture whose gates are all met, used to exercise gate-check --status and gate-lint on a passing ledger.

- [x] G1: prints its first fixed token when run
  CHECK: node -e "console.log('OK_TOKEN_ONE')"
  EXPECT: OK_TOKEN_ONE
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/repo; EXPECT=matched; output-sha256=6bf5c2e1a9d0b3f47c8e1d2a5f60934bcb1e2a3d4f5061728394a5b6c7d8e9f; output-bytes=13

- [x] G2: prints its second fixed token when run
  CHECK: node -e "console.log('OK_TOKEN_TWO')"
  EXPECT: OK_TOKEN_TWO
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/repo; EXPECT=matched; output-sha256=1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80; output-bytes=13
