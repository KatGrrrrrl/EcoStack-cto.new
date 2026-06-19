import { useParams, Link } from 'react-router-dom';
import { getPost, getRecentPosts } from '../content/blog/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-500 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 rounded-xl font-semibold bg-eco-600 text-white hover:bg-eco-700 transition-colors">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      // Headings
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3">{line.slice(4)}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{line.slice(2)}</h1>;
      
      // Blockquote
      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-eco-400 bg-eco-50 px-5 py-3 my-4 rounded-r-xl italic text-gray-700">{line.slice(2)}</blockquote>;
      
      // Unordered list
      if (line.match(/^\d+\.\s/)) return <li key={i} className="ml-6 list-decimal text-gray-700 mb-1">{line.replace(/^\d+\.\s/, '')}</li>;
      if (line.startsWith('- ')) return <li key={i} className="ml-6 list-disc text-gray-700 mb-1">{line.slice(2)}</li>;
      
      // Bold text **...**
      const rendered = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      
      // Empty line = spacer
      if (!line.trim()) return <div key={i} className="h-3" />;
      
      // Regular paragraph (with links)
      const withLinks = rendered.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-eco-600 hover:text-eco-700 underline">$1</a>');
      
      // Check if it's a list item (already handled) or paragraph
      if (line.startsWith('- ') || line.match(/^\d+\.\s/)) return null;
      
      return <p key={i} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: withLinks }} />;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-eco-600">Home</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-eco-600">Blog</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</span>
      </div>

      <article className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* Main content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-50 text-eco-700">
              {post.category === 'green-hosting' ? '🌿 Green Hosting' : post.category === 'green-analytics' ? '📊 Analytics' : '💼 SaaS'}
            </span>
            <span className="text-sm text-gray-400">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>

          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Recent posts */}
            <div className="p-6 rounded-2xl border border-eco-100 bg-eco-50/30">
              <h3 className="font-bold text-gray-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.length > 0 ? recentPosts.map(rp => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="block group">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-eco-700 transition-colors">{rp.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(rp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </Link>
                )) : <p className="text-sm text-gray-400">No other posts yet.</p>}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-eco-600 to-eco-800 text-white">
              <h3 className="font-bold text-lg mb-2">Find Your Green Host</h3>
              <p className="text-sm text-eco-200 mb-4">
                Take our 2-minute quiz to find the perfect eco-friendly hosting for your project.
              </p>
              <Link
                to="/hosting-wizard"
                className="block w-full py-2.5 rounded-xl text-sm font-bold bg-earth-500 hover:bg-earth-600 text-center transition-colors"
              >
                Start Quiz →
              </Link>
            </div>
          </div>
        </aside>
      </article>

      {/* Bottom nav */}
      <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
        <Link to="/blog" className="flex items-center gap-1 text-eco-600 hover:text-eco-700 font-medium text-sm">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}