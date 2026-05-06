import { motion } from 'framer-motion';
import { Star, Clock, Users, ArrowRight, Sparkles, BadgeCheck } from 'lucide-react';

interface FeaturedCourse {
  title: string;
  tag: string;
  tagColor: string;
  rating: number;
  duration: string;
  learners: number;
  badge: string;
  gradient: string;
  icon: string;
}

const featuredCourses: FeaturedCourse[] = [
  {
    title: 'Data Science & AI Certification',
    tag: 'Technology',
    tagColor: 'bg-violet-100 text-violet-700',
    rating: 4.9,
    duration: '12 Weeks',
    learners: 1240,
    badge: 'Bestseller',
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    icon: '🤖',
  },
  {
    title: 'International Business Management',
    tag: 'Business',
    tagColor: 'bg-amber-100 text-amber-700',
    rating: 4.8,
    duration: '10 Weeks',
    learners: 850,
    badge: 'Top Rated',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    icon: '🌐',
  },
  {
    title: 'Full Stack Web Development',
    tag: 'Software',
    tagColor: 'bg-cyan-100 text-cyan-700',
    rating: 4.9,
    duration: '16 Weeks',
    learners: 2100,
    badge: 'Most Popular',
    gradient: 'from-cyan-400 via-teal-500 to-emerald-600',
    icon: '💻',
  },
];

const tabCategories = ['All Programs', 'Data Science', 'IT & Software', 'Business', 'Marketing'];

interface TopCoursesProps {
  onBrowseAll: () => void;
}

const TopCourses = ({ onBrowseAll }: TopCoursesProps) => {
  return (
    <section className="section" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f5fff8 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-black px-5 py-2 rounded-full text-xs uppercase tracking-widest mb-5">
            <Sparkles size={14} />
            Our Top Courses
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-5 leading-tight">
            Featured{' '}
            <span className="relative inline-block">
              <span className="text-primary">Learning Programs</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9C50 3 100 1 150 1C200 1 250 3 298 9" stroke="#2FA84F" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-text-muted font-medium leading-relaxed">
            Join world-class certifications designed by industry leaders to accelerate your professional growth.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {tabCategories.map((tab, i) => (
            <button
              key={tab}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
                i === 0
                  ? 'bg-secondary text-white border-secondary shadow-lg'
                  : 'bg-white text-secondary border-gray-200 hover:border-primary hover:text-primary hover:shadow-md'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:-translate-y-2"
            >
              {/* Card Top Banner */}
              <div className={`relative bg-gradient-to-br ${course.gradient} p-8 flex items-center justify-between`}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-6 -translate-x-4" />

                <span className="text-5xl relative z-10">{course.icon}</span>

                {/* Badge */}
                <span className="relative z-10 bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1">
                  <BadgeCheck size={11} />
                  {course.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Tag + Rating row */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${course.tagColor}`}>
                    {course.tag}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-black text-secondary">{course.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-secondary mb-5 leading-snug group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                {/* Meta Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-sm text-text-muted font-bold">
                    <Clock size={14} className="text-primary" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-text-muted font-bold">
                    <Users size={14} className="text-primary" />
                    {course.learners.toLocaleString()}
                  </div>
                </div>

                {/* Hover CTA */}
                <button className="mt-5 w-full py-3 bg-secondary text-white font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2 text-sm">
                  Enroll Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onBrowseAll}
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-black px-10 py-4 rounded-full text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Browse All 500+ Courses
            <span className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={18} />
            </span>
          </button>
          <p className="text-text-muted text-sm font-medium">
            No credit card required · Start learning today
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TopCourses;
