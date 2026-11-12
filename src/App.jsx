import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeamPage from './pages/TeamPage';
import NewsPage from './pages/NewsPage';
import MemberDetailPage from './pages/MemberDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'

export default function App() {
 // 4 Tokoh Baku Terstandarisasi Kurikulum
 const [members, setMembers] = useState([
 { id: 4, name: 'Rina Wijaya', role: 'Frontend Dev', status: 'Online', stars: 3,
 avatar: 'https://i.pravatar.cc/150?u=4', bio: 'Frontend engineer antusias spesialis React & UI.' },
 { id: 1, name: 'Budi Santoso', role: 'Frontend Dev', status: 'Online', stars: 2,
 avatar: 'https://i.pravatar.cc/150?u=1', bio: 'Pengembang web antarmuka responsif & performa tinggi.' },
 { id: 2, name: 'Siti Rahma', role: 'UI/UX Designer', status: 'Offline', stars: 5,
 avatar: 'https://i.pravatar.cc/150?u=2', bio: 'Desainer interaksi fokus kesederhanaan desain sistem.' },
 { id: 3, name: 'Ahmad Fauzi', role: 'Backend Engineer', status: 'Online', stars: 1,
 avatar: 'https://i.pravatar.cc/150?u=3', bio: 'Arsitek API Node.js dan keandalan sistem cloud.' }
 ]);
 const handleAddMember = (newMember) => {
 setMembers((prev) => [...prev, { ...newMember, id: Date.now(), stars: 0 }]);
 };
 const handleToggleStatus = (id) => {
 setMembers((prev) =>
 prev.map((m) => m.id === id ? { ...m, status: m.status === 'Online' ? 'Offline' : 'Online' } : m)
 );
 };
 const handleGiveStar = (id) => {
 setMembers((prev) => prev.map((m) => m.id === id ? { ...m, stars: m.stars + 1 } : m));
 };
 // (Lanjutan JSX & Pendaftaran Rute di slide berikutnya...)

 return (
 <div className="app-layout">
 {/* 1. HEADER PERSISTEN: Berada di luar <Routes> */}
 <Navbar totalMembers={members.length} />
 {/* 2. AREA KONTEN DINAMIS: Berubah sesuai URL browser */}
 <main className="content-area">
 <Routes>
 {/* Halaman 1: Direktori Tim */}
 <Route
 path="/"
 element={
 <TeamPage
 members={members}
 onAddMember={handleAddMember}
 onToggle={handleToggleStatus}
 onGiveStar={handleGiveStar}
 />
 }
 />
 {/* Halaman 2: Berita Terkini Kompas (Modul 1.6) */}
 <Route path="/news" element={<NewsPage />} />
 {/* Halaman 3: Detail Profil Dinamis (URL Parameter) */}
 <Route
 path="/member/:id"
 element={<MemberDetailPage members={members} />}
 />
 {/* Halaman 4: Penangkap Rute Rusak / 404 */}
 <Route path="*" element={<NotFoundPage />} />
 </Routes>
 </main>
 </div>
 );
}