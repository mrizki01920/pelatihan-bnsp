import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { mapNewsItems } from './newsMapper';

const NEWS_URL = 'https://www.cnnindonesia.com/internasional/rss';

function parseFeedItems(xml) {
    const document = new DOMParser().parseFromString(xml, 'application/xml');
    if (document.querySelector('parsererror')) {
        throw new Error('Format RSS CNN Indonesia tidak valid.');
    }

    return Array.from(document.querySelectorAll('channel > item'), (item) => ({
        title: item.querySelector('title')?.textContent?.trim() || 'Judul berita tidak tersedia',
        link: item.querySelector('link')?.textContent?.trim() || '#',
        image: item.querySelector('enclosure')?.getAttribute('url') || '',
        pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
    }));
}

async function fetchNewsItems(signal) {
    const res = await fetch(NEWS_URL, { signal });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const xml = await res.text();
    return mapNewsItems(parseFeedItems(xml));
}

function NewsFeed() {
    // 1. Tiga Pilar State Pengendali UI
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Lifecycle Hook: Eksekusi 1x saat Mounting
    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const items = await fetchNewsItems(controller.signal);
                if (controller.signal.aborted) return;
                setNews(items);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(err.message || 'Gagal mengambil berita terkini.');
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        })();

        return () => controller.abort();
    }, []);

    // 3. Refresh manual: state loading diubah dari event handler
    const handleRefresh = async () => {
        setIsLoading(true);
        setError(null);
        try {
            setNews(await fetchNewsItems());
        } catch (err) {
            setError(err.message || 'Gagal mengambil berita terkini.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="news-container">
            <div className="news-toolbar">
                <div>
                    <h2>Berita Terkini CNN Indonesia</h2>
                    <p>Menampilkan {news.length} artikel dari RSS CNN Indonesia</p>
                </div>
                <button className="btn-refresh" onClick={handleRefresh} disabled={isLoading}>
                    {isLoading ? '⌛ Memuat...' : '🔄 Segarkan Berita'}
                </button>
            </div>

            {isLoading && (
                <div className="spinner-box">
                    <div className="css-spinner"></div>
                    <p>Mengunduh berita nasional terbaru...</p>
                </div>
            )}

            {error && !isLoading && (
                <div className="error-banner">
                    <h5>Terjadi Kesalahan Jaringan</h5>
                    <p>{error}</p>
                    <button onClick={handleRefresh}>Coba Lagi</button>
                </div>
            )}

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
