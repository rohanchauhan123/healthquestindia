import { useEffect } from "react";
import { Link } from "wouter";
import { useBlogPosts } from "@/hooks/useStore";

interface BlogDetailProps {
  slug: string;
}

function upsertMeta(name: string, content: string) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function BlogDetail({ slug }: BlogDetailProps) {
  const posts = useBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  const latest = [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .filter((p) => p.slug !== slug)
    .slice(0, 5);

  useEffect(() => {
    if (!post) return;
    document.title = post.seoTitle || post.title;
    upsertMeta("description", post.seoDescription || post.excerpt);
    upsertMeta("keywords", post.seoKeywords.join(", "));
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Blog not found</h1>
          <Link href="/blogs" className="text-[#b8962a] font-semibold hover:underline mt-3 inline-block">
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8 items-start">
        <article className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <img src={post.imageUrl} alt={post.title} className="w-full h-72 object-cover" />
          <div className="p-8">
            <p className="text-xs font-semibold text-gray-400 uppercase">{post.publishedAt}</p>
            <h1 className="text-4xl font-black text-primary mt-2">{post.title}</h1>
            <p className="text-lg text-gray-600 mt-4">{post.excerpt}</p>
            <div className="prose prose-gray max-w-none mt-8">
              <p>{post.content}</p>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-100">
              <Link href="/blogs" className="text-[#b8962a] font-semibold hover:underline">
                Back to all blogs
              </Link>
            </div>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-primary">Contact Our Team</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">Share your requirement and get guidance.</p>
            <form className="space-y-3">
              <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Your name" />
              <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Phone / WhatsApp" />
              <textarea className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" rows={4} placeholder="Your message" />
              <button type="button" className="w-full h-10 rounded-md bg-[#b8962a] text-white font-semibold hover:bg-[#a07d20]">
                Submit
              </button>
            </form>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-4">Latest 5 Blogs</h3>
            <div className="space-y-3">
              {latest.map((entry) => (
                <Link key={entry.slug} href={`/blogs/${entry.slug}`} className="block text-sm text-gray-700 hover:text-[#b8962a]">
                  {entry.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
