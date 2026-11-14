import { youtubeVideos } from '../data/news';
import { Link } from 'react-router-dom';

export default function YouTubeSection() {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900">📺 वीडियो समाचार</h2>
        </div>
        <Link to="/videos" className="text-[#C0392B] text-xs font-semibold hover:underline">
          सभी वीडियो →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {youtubeVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-800 line-clamp-2">{video.title}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C0392B] hover:underline mt-1 block"
              >
                YouTube पर देखें ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
