import { Link } from "wouter";
import { useBlogPosts } from "@/hooks/useStore";

export function Blogs() {
  const posts = useBlogPosts();
  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const recent = sorted.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">HealthQuest Blog</span>
          <h1 className="text-4xl font-black text-primary mt-2">Insights on Treatment in Delhi NCR</h1>
          <p className="text-gray-600 mt-4">
            Practical guides, treatment explainers, and patient planning tips for hospitals in Delhi NCR.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
            {sorted.map((post) => (
              <article key={post.slug} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase">{post.publishedAt}</p>
                  <h2 className="text-xl font-bold text-primary mt-2">{post.title}</h2>
                  <p className="text-gray-600 mt-3">{post.excerpt}</p>
                  <Link href={`/blogs/${post.slug}`} className="inline-block mt-5 text-[#b8962a] font-semibold hover:underline">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-primary">Contact Our Team</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">Need treatment guidance in Delhi NCR? Send your query.</p>
              <form className="space-y-3">
                <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Your name" />
                <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Phone / WhatsApp" />
                <textarea className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" rows={4} placeholder="Your treatment requirement" />
                <button type="button" className="w-full h-10 rounded-md bg-[#b8962a] text-white font-semibold hover:bg-[#a07d20]">
                  Submit
                </button>
              </form>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-4">Latest 5 Blogs</h3>
              <div className="space-y-3">
                {recent.map((post) => (
                  <Link key={post.slug} href={`/blogs/${post.slug}`} className="block text-sm text-gray-700 hover:text-[#b8962a]">
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
