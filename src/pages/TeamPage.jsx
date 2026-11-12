import { useState } from 'react';
import AddMemberForm from '../components/AddMemberForm';
import TeamCard from '../components/TeamCard';
export default function TeamPage({ members, onAddMember, onToggle, onGiveStar }) {
 const [searchTerm, setSearchTerm] = useState('');
 const [filterOnline, setFilterOnline] = useState(false);
 // Kalkulasi metrik statistik
 const totalMembers = members.length;
 const onlineMembers = members.filter((m) => m.status === 'Online').length;
 const offlineMembers = totalMembers - onlineMembers;
 // Filter reaktif nama & status
 const filteredMembers = members.filter((m) => {
 const matchName = m.name.toLowerCase().includes(searchTerm.toLowerCase());
 const matchStatus = filterOnline ? m.status === 'Online' : true;
 return matchName && matchStatus;
 });

 return (
 <div className="directory-container">
 {/* 1. Bar Statistik 3 Kartu */}
 <div className="stats-bar">
 <div className="stat-box"><span className="stat-num">{totalMembers}</span><span className="stat-label">Total Members</span></div>
 <div className="stat-box"><span className="stat-num online">{onlineMembers}</span><span className="stat-label">Online</span></div>
 <div className="stat-box"><span className="stat-num offline">{offlineMembers}</span><span className="stat-label">Offline</span></div>
 </div>
 {/* 2. Form Registrasi Anggota Baru (Validasi Zod) */}
 <AddMemberForm onAddMember={onAddMember} />
 {/* 3. Toolbar Pencarian & Toggle Filter Online */}
 <div className="search-bar">
 <input type="text" placeholder="🔍 Cari nama anggota tim..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
 <button onClick={() => setFilterOnline(!filterOnline)} className={`filter-btn ${filterOnline ? 'active' : ''}`}>
 {filterOnline ? '🟢 Tampilkan Semua' : '⚪ Hanya Online'}
 </button>
 </div>
 {/* 4. Grid Kartu Anggota Tim */}
 <div className="team-grid">
 {filteredMembers.map((member) => (
 <TeamCard key={member.id} member={member} onToggle={onToggle} onGiveStar={onGiveStar} />
 ))}
 </div>
 </div>
 );
}