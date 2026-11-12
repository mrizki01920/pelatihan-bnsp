import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { mapNewsItems } from './newsMapper';

const NEWS_URL = 'https://berita-indo-api.vercel.app/v1/cnn-news';

async function fetchNewsItems(signal) {
    const res = await fetch(NEWS_URL, { signal });

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    const json = await res.json();

    return mapNewsItems(json.data);
}

function NewsFeed() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mengambil berita saat komponen pertama kali dibuka
    useEffect(() => {
        const controller = new AbortController();

        async function loadNews() {
            try {
                const items = await fetchNewsItems(controller.signal);
                setNews(items);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') return;

                setError(
                    err.message || 'Gagal mengambil berita terkini.'
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        loadNews();

        return () => controller.abort();
    }, []);

    // Refresh berita secara manual
    const handleRefresh = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const items = await fetchNewsItems();
            setNews(items);
        } catch (err) {
            setError(
                err.message || 'Gagal mengambil berita terkini.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="news-container">

            <div className="news-toolbar">
                <div>
                    <h2>Berita Terkini CNN Indonesia</h2>
                    <p>
                        Menampilkan {news.length} artikel dari Berita Indo API
                    </p>
                </div>

                <button
                    className="btn-refresh"
                    onClick={handleRefresh}
                    disabled={isLoading}
                >
                    {isLoading
                        ? '⌛ Memuat...'
                        : '🔄 Segarkan Berita'}
                </button>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="spinner-box">
                    <div className="css-spinner"></div>
                    <p>Mengunduh berita nasional terbaru...</p>
                </div>
            )}

            {/* Error */}
            {error && !isLoading && (
                <div className="error-banner">
                    <h5>Terjadi Kesalahan Jaringan</h5>
                    <p>{error}</p>
                    <button onClick={handleRefresh}>
                        Coba Lagi
                    </button>
                </div>
            )}

            {/* Berita */}
            {!isLoading && !error && (
                <div className="news-grid">
                    {news.map((item, i) => (
                        <NewsCard key={item.link || i} {...item} />
                    ))}
                </div>
            )}

        </div>
    );
}

export default NewsFeed;
