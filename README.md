# StockPilot AI — Inventory Dashboard + AI Stock Assistant

MBA AI Applications end-term project · Use case #11 (Inventory/stock query assistant).
Fictional company (Zenith Polychem Pvt. Ltd.) with generated sample data.

**Live app:** `https://<your-github-username>.github.io/stockpilot-ai/`

## Features
- Dashboard: inventory value, critical / low-stock alerts, production vs dispatch, days-of-cover vs lead time
- Inventory table with search, filters and 60-day consumption trend per item
- Reorder Planner: transparent rule-based reorder quantities (ROP, max level, MOQ) + CSV export
- Stock Entry form with input validation; tickets log
- StockPilot chatbot (Google Gemini) — multi-turn, scoped to inventory, escalation to Store Manager, rule-engine fallback when AI is unavailable
- AI stock briefing on the overview page

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML + CSS + JS, Chart.js from CDN) |
| `gemini_proxy.gs` | Optional Google Apps Script proxy that hides the Gemini key |

## Run
Open `index.html` or the GitHub Pages link. Without a key it runs in offline rule mode.
For AI: Settings tab → paste a Gemini API key (stored only in your browser), **or** deploy `gemini_proxy.gs` and put its URL in `DEFAULT_PROXY_URL` in `index.html`.

Never commit an API key to this repository.
