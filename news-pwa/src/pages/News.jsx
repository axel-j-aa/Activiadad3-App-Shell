import React, { useEffect, useState } from 'react';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('idle'); 
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let abort = false;

    async function fetchJson(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error('http_error');
      const data = await res.json();
      if (data?.status && data.status !== 'ok') throw new Error('api_error');
      return data;
    }

    (async () => {
      try {
        setStatus('loading');

        const data1 = await fetchJson('/api/top-headlines?country=mx&pageSize=20');
        let list = data1.articles || [];

        if (!list.length) {
          const data2 = await fetchJson('/api/search?q=tecnologia&pageSize=20&sortBy=publishedAt&language=es');
          list = data2.articles || [];
        }

        if (!abort) {
          setArticles(list);
          setStatus(list.length ? 'success' : 'empty');
        }
      } catch {
        if (!abort) {
          setMsg('No se pudo cargar las noticias' + (navigator.onLine ? '' : ' (sin conexión)') + '.');
          setStatus('error');
        }
      }
    })();

    return () => { abort = true; };
  }, []);

  return (
    <section>
      <h2 style={{margin:'0 0 0.75rem'}}>Titulares en México</h2>

      {status === 'loading' && <SkeletonList />}

      {status === 'empty' && (
        <p style={{ color:'#475569' }}>
          No hay artículos para mostrar ahora mismo.
        </p>
      )}

      {status === 'error' && (
        <p style={{color:'#b91c1c'}}>{msg}</p>
      )}

      {status === 'success' && (
        <ul style={{display:'grid', gap:'0.75rem', listStyle:'none', padding:0}}>
          {articles.map((a, i) => (
            <li key={i} style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'0.75rem'}}>
              <h3 style={{margin:'0 0 0.25rem', fontSize:'1rem'}}>{a.title}</h3>
              {a.urlToImage && (
                <img
                  src={a.urlToImage}
                  alt=""
                  style={{width:'100%', maxHeight:'240px', objectFit:'cover', borderRadius:'8px', margin:'0.5rem 0'}}
                  loading="lazy"
                />
              )}
              <p style={{margin:0, color:'#475569'}}>{a.description || 'Sin descripción.'}</p>
              <div style={{marginTop:'0.5rem'}}>
                <a href={a.url} target="_blank" rel="noreferrer">Leer fuente</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SkeletonList() {
  return (
    <ul style={{display:'grid', gap:'0.75rem', listStyle:'none', padding:0}}>
      {Array.from({length:5}).map((_,i)=>(
        <li key={i} style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'0.75rem'}}>
          <div style={{height:'1rem', width:'60%', background:'#e5e7eb', borderRadius:'6px'}} />
          <div style={{height:'150px', background:'#f1f5f9', borderRadius:'8px', margin:'0.5rem 0'}} />
          <div style={{height:'0.9rem', width:'90%', background:'#e5e7eb', borderRadius:'6px'}} />
        </li>
      ))}
    </ul>
  );
}
