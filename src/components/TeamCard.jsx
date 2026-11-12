import { Link } from 'react-router-dom';
export default function TeamCard({ member, onToggle, onGiveStar }) {
 const { id, name, role, status, stars, bio, avatar } = member;
 const isOnline = status === 'Online';
 return (
 <div className="team-card">
 <img src={avatar} alt={name} className="card-avatar" />
 <h3 className="card-name">{name}</h3>
 <p className="card-role">{role}</p>
 <p className="card-bio">"{bio}"</p>
 <div className="card-badges">
 <span className={`badge-status ${isOnline ? 'badge-online' : 'badge-offline'}`}>
 {isOnline ? '● Online' : '○ Offline'}
 </span>
 <span className="badge-star">⭐ {stars} Bintang</span>
 </div>
 <div className="card-actions">
 <button onClick={() => onGiveStar(id)} className="btn-action btn-star">
 ⭐ Beri Bintang
 </button>
 <button onClick={() => onToggle(id)} className="btn-action btn-toggle">
 {isOnline ? 'Ubah ke Offline' : 'Ubah ke Online'}
 </button>
 </div>
 {/* Tautan SPA ke Rute Dinamis Detail Profil */}
 <Link to={`/member/${id}`} className="btn-view-profile">
 Lihat Profil Detail →
 </Link>
 </div>
 );
}
