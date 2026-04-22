import React from 'react';

const Blog = () => {
  const blogs = [
    {
      title: "The Timeless Art of Kanchipuram Weaving",
      date: "March 15, 2026",
      excerpt: "Discover the rich history and intricate craftsmanship behind the legendary Kanchipuram silk sarees. From the purity of the zari to the symbolic motifs, we dive into what makes these silks a bridal favorite.",
      tag: "Heritage"
    },
    {
      title: "Caring for Your Silks: A Practical Guide",
      date: "April 10, 2026",
      excerpt: "Silk is a living fabric. Learn the best practices for storing, folding, and dry-cleaning your heirloom sarees to ensure they maintain their luster and strength for generations to come.",
      tag: "Maintenance"
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 animate-page-entrance">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif-royal text-4xl md:text-5xl text-foreground mb-4">
          Our <span className="text-accent">Journal</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-6 text-foreground/70 italic">
          Stories of heritage, craft, and elegance.
        </p>
      </div>

      {/* Blog List */}
      <div className="space-y-8">
        {blogs.map((post, index) => (
          <div 
            key={index} 
            className="bg-surface border border-border-soft rounded-2xl shadow-sm overflow-hidden group hover:border-accent/30 transition-all duration-300"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-surface-strong text-accent text-xs font-bold tracking-widest uppercase rounded-full border border-border-soft">
                  {post.tag}
                </span>
                <span className="text-foreground/50 text-sm">{post.date}</span>
              </div>
              
              <h2 className="font-serif-royal text-2xl md:text-3xl text-foreground mb-4 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              
              <p className="text-foreground/80 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Full Story <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Footer */}
      <div className="mt-16 text-center">
        <div className="bg-surface-strong inline-block px-8 py-4 rounded-full border border-border-soft">
          <p className="text-sm text-foreground/60 italic">
            © {new Date().getFullYear()} Rangam Adi Silks. More stories coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;