# Quarterly Platform Review

An opening paragraph with **bold text**, *italic text*, `inline code`, and a
[link to the handbook](https://example.com/handbook).

## Findings

### Throughput

The queue drained faster after the change. Numbers are in the table below.

#### Method

Counts come from the ingest log, not from the dashboard.

| Measure | Before | After |
|---------|-------:|:-----:|
| Files per hour | 12 | 48 |
| Failed batches | 7 | 0 |

## Steps taken

1. Replaced the polling loop
2. Added a retry budget
   - three attempts
   - exponential backoff
3. Removed the manual restart

## Open items

- Alerting thresholds are still the old ones
- The runbook has not been updated

> Nothing here has been verified against production traffic yet.

```python
def drain(queue, budget=3):
    return [handle(item, budget) for item in queue]
```

---

A closing paragraph.
