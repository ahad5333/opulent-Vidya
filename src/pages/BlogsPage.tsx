import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allBlogs = [
  {
    id: 1,
    title: "Empowering Careers: The Opulent Vidya Vision",
    excerpt: "Discover how we are bridging the gap between education and industry through personalized AI-driven guidance and world-class training programs. Our mission is to make quality education accessible to everyone, everywhere.",
    content: "Full content here...",
    author: "Dr. Ananya Sharma",
    date: "May 5, 2026",
    category: "Company News",
    image: "/assets/blogs/vision.png",
  },
  {
    id: 2,
    title: "Future of Learning: AI in Career Counseling",
    excerpt: "How our AI Assistant 'Vidhya' is helping thousands of students find their perfect career path globally. We explore the intersection of machine learning and human expertise in modern education.",
    author: "Rahul Verma",
    date: "April 28, 2026",
    category: "Technology",
    image: "/assets/blogs/ai-assistant.png",
  },
  {
    id: 3,
    title: "Expanding Horizons: Study Abroad in 2026",
    excerpt: "Everything you need to know about the latest visa regulations and top universities in Canada, UK, and USA. Get ahead of the curve with our comprehensive guide to international education.",
    author: "Sarah Johnson",
    date: "April 15, 2026",
    category: "Study Abroad",
    image: "/assets/blogs/study-abroad.png",
  },
  {
    id: 4,
    title: "Top 10 High-Paying IT Certifications in 2026",
    excerpt: "Looking to boost your salary? Here's a breakdown of the most in-demand IT certifications this year, from AWS to Cybersecurity experts.",
    author: "Michael Chen",
    date: "April 10, 2026",
    category: "Career Advice",
    image: "/assets/blogs/it-cert.png",
  },
  {
    id: 5,
    title: "Our Partnership with Global Universities",
    excerpt: "Opulent Vidya is proud to announce new partnerships with over 50 leading universities across Europe and Asia, opening more doors for our students.",
    author: "Emily Davis",
    date: "March 30, 2026",
    category: "Partnerships",
    image: "/assets/blogs/partnership.png",
  }
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light text-sm font-bold mb-6"
          >
            <BookOpen size={16} />
            <span>Opulent Vidya Insights</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Our <span className="text-primary">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Stay updated with the latest trends in education, career guidance, and company news.
          </motion.p>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Main Feed */}
            <div className="md:col-span-2 space-y-12">
              {allBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-5 py-2.5 bg-white backdrop-blur-md rounded-2xl text-xs font-black text-secondary uppercase tracking-widest shadow-xl">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="flex items-center gap-6 mb-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        {blog.author}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-secondary mb-4 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-lg mb-6">
                      {blog.excerpt}
                    </p>
                    <button className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-[0.2em] group/link">
                      Read Full Story
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              <div className="bg-gray-50 rounded-[2rem] p-8">
                <h3 className="text-xl font-black text-secondary mb-6">Search Blogs</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:border-primary transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="bg-secondary rounded-[2rem] p-8 text-white">
                <h3 className="text-xl font-black mb-6">Categories</h3>
                <div className="space-y-3">
                  {["Company News", "Technology", "Study Abroad", "Career Advice", "Partnerships"].map((cat) => (
                    <button key={cat} className="w-full flex items-center justify-between group hover:text-primary transition-all">
                      <span className="font-bold">{cat}</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
                <h3 className="text-xl font-black text-secondary mb-4">Newsletter</h3>
                <p className="text-gray-500 text-sm mb-6">Get the latest insights delivered to your inbox.</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 mb-4 text-sm font-bold"
                />
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  Subscribe
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
