import React, { useState } from 'react';
import { API_BASE } from '../lib/apiBase';

export default function Search() {
  const [q, setQ] = useState('tecnología');
  const [articles, setArticles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function onSearch(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(q)}&pageSize=20`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setArticles(data.articles || []);
    } catch {
      setErr('No se pudo buscar. ¿Hay conexión?');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <h2 style={{margin:'0 0 0.75rem'}}>Buscar noticias</h2>
      <form onSubmit={onSearch} style={{display:'flex', gap:'0.5rem', marginBottom:'1rem'}}>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Ej. IA, deportes, economía…"
          style={{flex:1, padding:'0.5rem', border:'1px solid #cbd5e1', borderRadius:'8px'}}
        />
        <button disabled={busy} style={{padding:'0.5rem 0.75rem', borderRadius:'8px', border:'1px solid #0f172a', background:'#0f172a', color:'#fff'}}>
          {busy ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {err && <p style={{color:'#b91c1c'}}>{err}</p>}

      <ul style={{display:'grid', gap:'0.75rem', listStyle:'none', padding:0}}>
        {articles.map((a,i)=>(
          <li key={i} style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'0.75rem'}}>
            <h3 style={{margin:'0 0 0.25rem', fontSize:'1rem'}}>{a.title}</h3>
            <p style={{margin:0, color:'#475569'}}>{a.description || 'Sin descripción.'}</p>
            <div style={{marginTop:'0.5rem'}}>
              <a href={a.url} target="_blank" rel="noreferrer">Leer fuente</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
