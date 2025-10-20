import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  padding: '0.5rem 0.75rem',
  borderRadius: '8px',
  textDecoration: 'none',
  color: isActive ? '#0f172a' : '#334155',
  background: isActive ? '#e2e8f0' : 'transparent',
  fontWeight: 600
});

export default function Nav() {
  return (
    <nav style={{borderBottom:'1px solid #e5e7eb', padding:'0.5rem 1rem', display:'flex', gap:'0.5rem'}}>
      <NavLink to="/" style={linkStyle}>Titulares</NavLink>
      <NavLink to="/search" style={linkStyle}>Buscar</NavLink>
    </nav>
  );
}
