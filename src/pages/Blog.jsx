import { Link } from 'react-router-dom';
import posts from '../content/blog/posts';

export default function Blog() {
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-eco-100 text-eco-700 mb-4">
          📝 EcoStack Blog
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Sustainable Digital Infrastructure{' '}
          <span className="bg-gradient-to-r from-eco-500 to-earth-500 bg-clip-text text-transparent">Insights</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Guides, tips, and deep dives into green web hosting, carbon-neutral SaaS, 
          and building a more sustainable web.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <Link to="/blog" className="px-4 py-2 rounded-full text-sm font-medium bg-eco-600 text-white">
          All Posts
        </Link>
        {categories.map(cat => (
          <span key={cat} className="px-4 py-2 rounded-full text-sm font-medium bg-eco-50 text-eco-700 hover:bg-eco-100 transition-colors cursor-pointer">
            {cat === 'green-hosting' ? '🌿 Green Hosting' : cat === 'green-analytics' ? '📊 Green Analytics' : cat === 'carbon-saas' ? '💼 Carbon SaaS' : cat}
          </span>
        ))}
      </div>

      {/* Posts grid */}
      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 text-sm">Check back soon for new articles.</p>
          </div>
        ) : (
          posts.map(post => (
            <article key={post.slug} className="group p-6 sm:p-8 rounded-2xl border border-eco-100 bg-white hover:shadow-lg hover:border-eco-200 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-50 text-eco-700">
                      {post.category === 'green-hosting' ? '🌿 Green Hosting' : post.category === 'green-analytics' ? '📊 Analytics' : '💼 SaaS'}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-eco-700 transition-colors mb-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    <span>{post.author}</span>
                    <span>·</span>
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-gray-50 text-gray-500 border border-gray-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="sm:self-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-eco-50 text-eco-700 hover:bg-eco-100 transition-colors whitespace-nowrap"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}