export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  publishedAt: string;
}

export const seedBlogPosts: BlogPost[] = [
  {
    slug: "liver-transplant-delhi-guide",
    title: "Liver Transplant in Delhi: A Practical Patient Guide",
    excerpt:
      "Understand timelines, hospital selection, and recovery planning for liver transplant treatment in Delhi NCR.",
    content:
      "Delhi NCR offers high-volume transplant centres with experienced multidisciplinary teams. Before finalizing a hospital, compare surgeon experience, ICU capability, infection-control protocols, and post-discharge support. Most patients should plan a structured recovery timeline and regular follow-up after returning home.",
    imageUrl:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=80&fit=crop",
    seoTitle: "Liver Transplant in Delhi | Hospital Selection Guide",
    seoDescription:
      "A practical guide to liver transplant in Delhi NCR covering treatment planning, hospital comparison, and post-op recovery essentials.",
    seoKeywords: ["liver transplant delhi", "transplant hospitals delhi", "liver surgery india"],
    publishedAt: "2026-05-05",
  },
];
