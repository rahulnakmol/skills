# Signal-first triage

1. Manifest scan (build files, CI, deploy configs)
2. Marker match → `references/signals/MARKERS.md`
3. Load **≤3** pattern cards from `references/patterns/`
4. Targeted reads only on matched paths
5. Emit `BRIEF-FORMAT.md` — **never mutate source**
