
import { useParams, Link } from 'react-router-dom';

export default function MemberDetailPage({ members }) {
    const { id } = useParams();

    // Cari anggota berdasarkan ID dari URL
    const member = members.find(
        (item) => String(item.id) === id
    );

    // Jika anggota tidak ditemukan
    if (!member) {
        return (
            <div className="not-found-container">
                <h1>404</h1>
                <h2>Anggota Tidak Ditemukan</h2>
                <Link to="/" className="btn-primary">
                    Kembali ke Direktori
                </Link>
            </div>
        );
    }

    const isOnline = member.status === 'Online';

    return (
        <div className="profile-detail-container">
            <Link to="/" className="btn-back">
                ← Kembali ke Direktori
            </Link>

            <div className="profile-card">
                <img
                    src={member.avatar}
                    alt={member.name}
                    className="avatar-large"
                />

                <h2>{member.name}</h2>

                <p className="profile-role">
                    {member.role}
                </p>

                <span className={isOnline ? 'badge-on' : 'badge-off'}>
                    {isOnline ? '● Online' : '○ Offline'}
                </span>

                <p className="profile-email">
                    ID Anggota: {member.id}
                </p>

                <p className="profile-bio">
                    "{member.bio}"
                </p>

                <div className="profile-stars">
                    ⭐ {member.stars} Bintang
                </div>
            </div>
        </div>
    );
}
