# Inventory & Stock Assistant

MBA AI Applications end-term project · Use case #11 (Inventory/stock query assistant).

Upload any company's inventory file (Excel/CSV) → the app maps the columns, builds a stock dashboard and reorder plan, and an AI chatbot (Google Gemini) answers questions about that data.

## Features
- Upload .xlsx / .xls / .csv (Tally, SAP, Zoho exports or a stock register); auto column mapping with manual correction
- Data quality report (skipped rows, duplicates, unmatched items, bad dates)
- Dashboard: inventory value, critical / low / excess items, days of cover vs lead time, consumption trend, value by category
- Inventory table with search, filters and per-item usage chart
- Reorder Planner: transparent rule-based quantities (ROP, max level, MOQ) + CSV export
- Stock Entry form with validation; escalation tickets
- Chatbot: multi-turn, answers only from the uploaded data, refuses off-topic, hands off to Store Manager; rule-engine fallback if AI is unavailable
- Built-in sample data and a downloadable blank template

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML + CSS + JS; Chart.js and SheetJS from CDN) |
| `gemini_proxy.gs` | Google Apps Script proxy that keeps the Gemini API key off GitHub |

## Privacy
The uploaded file is read in the browser only; it is never uploaded to a server. When AI is used, the question plus a compact table of relevant items is sent to Google Gemini. Never commit an API key to this repository.
