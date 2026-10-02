/**
 * StockPilot AI — Gemini proxy (Google Apps Script)
 * Keeps the Gemini API key on Google's server so it is never visible
 * in the public GitHub page.
 *
 * SETUP
 * 1. script.google.com → New project → paste this file.
 * 2. Project Settings → Script Properties → add  GEMINI_API_KEY = <your key from aistudio.google.com>
 * 3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy.
 * 4. Copy the /exec URL → paste into DEFAULT_PROXY_URL in index.html (or in the app's Settings tab).
 */
const DAILY_LIMIT = 300;                       // protects the free quota
const ALLOWED_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'];

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents || '{}');
    const key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!key) return out_({ error: 'Proxy not configured (missing GEMINI_API_KEY).' });

    // simple daily rate limit
    const cache = CacheService.getScriptCache();
    const ck = 'n_' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd');
    const n = Number(cache.get(ck) || 0);
    if (n >= DAILY_LIMIT) return out_({ error: 'Daily AI limit reached — app will use its rule engine.' });
    cache.put(ck, String(n + 1), 21600);

    const model = ALLOWED_MODELS.indexOf(req.model) >= 0 ? req.model : ALLOWED_MODELS[0];
    const contents = (req.contents || []).slice(-12);
    const payloadSize = JSON.stringify(contents).length;
    if (!contents.length || payloadSize > 30000) return out_({ error: 'Invalid or oversized request.' });

    const body = {
      systemInstruction: req.systemInstruction,
      contents: contents,
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 }
    };
    const res = UrlFetchApp.fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
      { method: 'post', contentType: 'application/json', headers: { 'x-goog-api-key': key },
        payload: JSON.stringify(body), muteHttpExceptions: true });
    const j = JSON.parse(res.getContentText() || '{}');
    if (res.getResponseCode() !== 200) return out_({ error: (j.error && j.error.message) || ('HTTP ' + res.getResponseCode()) });
    const parts = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || [];
    const text = parts.map(function (p) { return p.text || ''; }).join('').trim();
    return out_(text ? { text: text } : { error: 'Empty response' });
  } catch (err) {
    return out_({ error: String(err) });
  }
}

function doGet() { return out_({ ok: true, service: 'StockPilot Gemini proxy' }); }

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
