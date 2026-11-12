import { NavLink } from 'react-router-dom';
export default function Navbar({ totalMembers }) {
 // Helper untuk class aktif otomatis
 const getLinkClass = ({ isActive }) =>
 isActive ? 'nav-link active' : 'nav-link';
 return (
 <nav className="navbar-container">
 <div className="navbar-brand">
 <span className="brand-icon">⚡</span>
 <span className="brand-title">Direktori Tim</span>
 </div>
 <div className="navbar-menu">
 {/* Prop 'end' penting agar rute '/' tidak selalu aktif */}
 <NavLink to="/" end className={getLinkClass}>
 👥 Direktori
 </NavLink>
 <NavLink to="/news" className={getLinkClass}>
 📰 Berita Terkini
 </NavLink>
 </div>
 <div className="navbar-meta">
 <span className="badge-count">{totalMembers} Anggota</span>
 </div>
 </nav>
 );
}
