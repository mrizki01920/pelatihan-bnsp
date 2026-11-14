const CATEGORY = 'CNN Indonesia';

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

function formatDate(isoDate) {
    if (!isoDate) return '';

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return '';

    return dateFormatter.format(date);
}

// Menyeragamkan item RSS CNN Indonesia ke bentuk yang dipakai NewsCard.
export function mapNewsItems(items) {
    if (!Array.isArray(items)) return [];

    return items.map((item) => {
        const image = typeof item.image === 'string'
            ? item.image
            : item.image?.large || item.image?.small || '';

        return {
            title: item.title,
            link: item.link,
            image,
            category: CATEGORY,
            date: formatDate(item.isoDate || item.pubDate),
        };
    });
}
