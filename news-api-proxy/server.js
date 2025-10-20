/* eslint-env node */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());

// --- Config ---
const API_BASE = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY;

// 💡 Valida que tengas API key al arrancar
if (!API_KEY || API_KEY.trim().length < 10) {
  console.error('[BOOT] Falta NEWS_API_KEY en .env');
  console.error('       Crea .env con: NEWS_API_KEY=tu_api_key');
  process.exit(1);
}

async function proxyFetch(res, endpoint, params) {
  const qs = new URLSearchParams(params).toString();
  const url = `${API_BASE}/${endpoint}?${qs}`;
  try {
    const r = await fetch(url, { headers: { 'X-Api-Key': API_KEY } });
    const status = r.status;
    const data = await r.json().catch(() => ({}));

    console.log(`[UPSTREAM] GET ${url} -> ${status} ${data?.status || ''} ${data?.message ? '- ' + data.message : ''}`);

    if (status >= 400 || data?.status === 'error') {
      const message = data?.message || `Upstream error (${status})`;
      return res.status(status >= 400 ? status : 502).json({ status: 'error', message, upstream: data });
    }

    return res.status(status).json(data);
  } catch (err) {
    console.error('[UPSTREAM ERROR]', err);
    return res.status(500).json({ status: 'error', message: 'Proxy error' });
  }
}

app.get('/api/top-headlines', async (req, res) => {
 
  const { country = 'mx', page = 1, pageSize = 20, category } = req.query;

  const params = { country, page, pageSize };
  if (category) params.category = category; 

  await proxyFetch(res, 'top-headlines', params);
});

app.get('/api/search', async (req, res) => {
  const { q = 'technology', page = 1, pageSize = 20, sortBy = 'publishedAt', language = 'es' } = req.query;
  await proxyFetch(res, 'everything', { q, page, pageSize, sortBy, language });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`API proxy running on http://localhost:${PORT}`);
});
