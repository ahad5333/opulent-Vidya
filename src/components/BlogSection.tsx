import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: "Empowering Careers: The Opulent Vidya Vision",
    excerpt: "Discover how we are bridging the gap between education and industry through personalized AI-driven guidance...",
    author: "Dr. Ananya Sharma",
    date: "May 5, 2026",
    category: "Company News",
    image: "/assets/blogs/vision.png",
  },
  {
    id: 2,
    title: "Future of Learning: AI in Career Counseling",
    excerpt: "How our AI Assistant 'Vidhya' is helping thousands of students find their perfect career path globally...",
    author: "Rahul Verma",
    date: "April 28, 2026",
    category: "Technology",
    image: "/assets/blogs/ai-assistant.png",
  },
  {
    id: 3,
    title: "Expanding Horizons: Study Abroad in 2026",
    excerpt: "Everything you need to know about the latest visa regulations and top universities in Canada, UK, and USA...",
    author: "Sarah Johnson",
    date: "April 15, 2026",
    category: "Study Abroad",
    image: "/assets/blogs/study-abroad.png",
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="blog">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
            >
              <BookOpen size={16} />
              <span>Insights & News</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-secondary leading-tight"
            >
              Latest From Our <span className="text-primary">Blog</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="group flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors"
            >
              View All Posts
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-xs font-black text-secondary uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-primary" />
                    {blog.author}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-widest group/btn"
                >
                  Read More
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
