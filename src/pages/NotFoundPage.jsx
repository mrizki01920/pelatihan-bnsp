import { Link } from 'react-router-dom';
export default function NotFoundPage() {
 return (
 <div className="not-found-container">
 <div className="not-found-code">404</div>
 <h2>Ups! Halaman Tidak Ditemukan</h2>
 <p>
 Tautan yang Anda tuju mungkin sudah dipindahkan,
 kedaluwarsa, atau alamat URL salah diketik.
 </p>
 <Link to="/" className="btn-primary">
 🏠 Kembali ke Direktori Tim
 </Link>
 </div>
 );
}