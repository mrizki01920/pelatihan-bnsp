import React, { useState } from 'react';
import TeamCard from './TeamCard';
import AddMemberForm from './AddMemberForm';

export default function TeamDirectory() {
  const [members, setMembers] = useState([
    { id: 1, name: 'Rina Wijaya', role: 'Frontend Dev', bio: 'Senior React Developer & UI Specialist', status: 'Online', stars: 0, isNew: true },
    { id: 2, name: 'Budi Santoso', role: 'Frontend Dev', bio: 'Passionate in React & Modern UI', status: 'Online', stars: 2 },
    { id: 3, name: 'Siti Rahma', role: 'UI/UX Designer', bio: 'Figma Master & User Advocate', status: 'Offline', stars: 5 },
    { id: 4, name: 'Ahmad Fauzi', role: 'Backend Engineer', bio: 'Node.js API & Cloud Specialist', status: 'Online', stars: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const totalMembers = members.length;
  const onlineMembers = members.filter((m) => m.status === 'Online').length;
  const offlineMembers = totalMembers - onlineMembers;

  const handleToggleStatus = (id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'Online' ? 'Offline' : 'Online' } : m
      )
    );
  };

  const handleAddStar = (id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, stars: m.stars + 1 } : m))
    );
  };

  const handleAddMember = (newMemberData) => {
    const newEntry = {
      ...newMemberData,
      id: Date.now(),
      status: 'Online',
      stars: 0,
      isNew: true,
    };
    setMembers((prev) => [newEntry, ...prev.map((m) => ({ ...m, isNew: false }))]);
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="directory-container">
      <h2 className="directory-title">Daftar Anggota Tim Developer</h2>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-num">{totalMembers}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat-box active-border">
          <div className="stat-num online">{onlineMembers}</div>
          <div className="stat-label">Online</div>
        </div>
        <div className="stat-box">
          <div className="stat-num offline">{offlineMembers}</div>
          <div className="stat-label">Offline</div>
        </div>
      </div>

      {/* Form Tambah Anggota dengan Bio */}
      <AddMemberForm onAddMember={handleAddMember} />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari nama anggota tim..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Grid Kartu */}
      <div className="team-grid">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <TeamCard
              key={member.id}
              {...member}
              onToggleStatus={handleToggleStatus}
              onAddStar={handleAddStar}
            />
          ))
        ) : (
          <div className="empty-state">
            Tidak ada anggota tim yang cocok dengan kata kunci "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
}