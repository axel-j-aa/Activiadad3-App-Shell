import { Routes, Route } from 'react-router-dom';   // <-- importa Router
import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import News from './pages/News.jsx';
import Search from './pages/Search.jsx';

export default function App() {
  return (
    <div className="app" style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto auto 1fr auto' }}>
      <Header />
      <Nav />
      <main style={{ padding: '1rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
