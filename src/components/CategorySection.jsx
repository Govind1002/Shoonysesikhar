import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';

export default function CategorySection({ title, articles, category }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-[#C0392B] rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        {category && (
          <Link
            to={`/category/${encodeURIComponent(category)}`}
            className="text-[#C0392B] text-xs font-semibold hover:underline"
          >
            और देखें →
          </Link>
        )}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} variant="default" />
        ))}
      </div>
    </section>
  );
}
