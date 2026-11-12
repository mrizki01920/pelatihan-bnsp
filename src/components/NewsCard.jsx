
function NewsCard({ title, image, category, date, link }) {
  const fallback = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&q=80';

  const formattedDate = date
    ? new Date(date).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    : 'Tanggal tidak tersedia';

  return (
    <article className="news-card">

      <div className="news-thumb-wrapper">
        <img
          src={image || fallback}
          alt={title}
          className="news-thumb"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />

        <span className="news-category-badge">
          {category || 'BERITA'}
        </span>
      </div>

      <div className="news-body">
        <h3 className="news-headline" title={title}>
          {title}
        </h3>

        <div className="news-meta">
          <span className="news-date">
            📅 {formattedDate}
          </span>

          {link !== '#' && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-link"
            >
              Baca →
            </a>
          )}
        </div>
      </div>

    </article>
  );
}

export default NewsCard;
