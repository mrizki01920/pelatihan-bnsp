
import { useState } from 'react';

function ProfileCard() {
    const [profesi, setProfesi] = useState('');
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
        <div className="profile-card">

            <div className="profile-header">
                <div className="profile-avatar">
                    MR
                </div>

                <span className="status-badge">
                    ● Online
                </span>
            </div>

            <div className="profile-content">
                <h2>M Rizki Ramadhan</h2>
                <p className="profile-description">
                    Selamat datang di kartu profil interaktif saya!
                </p>

                <div className="profession-section">
                    <label htmlFor="profesi">
                        Profesi / Pekerjaan
                    </label>

                    <input
                        id="profesi"
                        type="text"
                        placeholder="Contoh: Frontend Developer"
                        value={profesi}
                        onChange={(e) => setProfesi(e.target.value)}
                    />

                    <div className="profession-result">
                        <span>Profesi saat ini</span>
                        <strong>
                            {profesi || 'Belum diisi'}
                        </strong>
                    </div>
                </div>

                <div className="profile-footer">
                    <div className="like-info">
                        <span>Apakah kamu suka profil ini?</span>
                        <strong>{likes} Likes</strong>
                    </div>

                    <button
                        className="like-button"
                        onClick={handleLike}
                    >
                        ♥ Suka ({likes})
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ProfileCard;
