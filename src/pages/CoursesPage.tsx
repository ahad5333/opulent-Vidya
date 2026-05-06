import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Users, BookOpen, ArrowLeft, Filter, X } from 'lucide-react';
import { allCourses, categories } from '../data/courseData';

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-emerald-100 text-emerald-700';
    case 'Intermediate': return 'bg-blue-100 text-blue-700';
    case 'Advanced': return 'bg-violet-100 text-violet-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getCategoryIcon = (cat: string) => {
  const icons: Record<string, string> = {
    'IT Training': '💻', 'Data & AI': '🤖', 'DevOps & Cloud': '☁️',
    'Digital & Design': '🎨', 'Engineering': '⚙️', 'Testing': '🔬', 'Other': '📚',
  };
  return icons[cat] || '📘';
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = useMemo(() => {
    return allCourses.filter(c => {
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchLevel = selectedLevel === 'All' || c.level === selectedLevel;
      const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchLevel && matchSearch;
    });
  }, [selectedCategory, selectedLevel, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-secondary via-secondary-light to-primary/80 pt-10 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-primary-light font-black text-sm uppercase tracking-widest mb-3">🎓 All Courses</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Explore Our <span className="text-primary-light">500+ Courses</span>
            </h1>
            <p className="text-white/70 text-lg font-medium max-w-2xl">
              IT, Engineering, Digital, DevOps, Data &amp; AI — find the right course to accelerate your career.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl font-medium text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-xl text-base"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-6">
        {/* Stats Strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-5 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border border-gray-100">
          {[['500+', 'Total Courses'], ['50+', 'Expert Instructors'], ['1L+', 'Students Enrolled'], ['100%', 'Job Assistance']].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-black text-primary">{val}</div>
              <div className="text-xs font-bold text-text-muted mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            {/* Mobile filter toggle */}
            <button onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-secondary mb-4">
              <span className="flex items-center gap-2"><Filter size={16} /> Filters</span>
              <span className="text-xs text-primary font-black">{showFilters ? 'Hide' : 'Show'}</span>
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* Category Filter */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-black text-secondary text-sm uppercase tracking-wider mb-4">Category</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-50 hover:text-secondary'}`}>
                      {cat !== 'All' && <span>{getCategoryIcon(cat)}</span>}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-black text-secondary text-sm uppercase tracking-wider mb-4">Level</h3>
                <div className="space-y-1">
                  {levels.map(lvl => (
                    <button key={lvl} onClick={() => setSelectedLevel(lvl)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedLevel === lvl ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-50 hover:text-secondary'}`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 pb-20">
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-muted font-bold text-sm">
                Showing <span className="text-primary font-black text-base">{filtered.length}</span> courses
                {selectedCategory !== 'All' && <span> in <span className="text-secondary">{selectedCategory}</span></span>}
              </p>
              {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchTerm) && (
                <button onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSearchTerm(''); }}
                  className="text-xs font-black text-primary hover:text-primary/80 flex items-center gap-1">
                  <X size={12} /> Clear all filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-secondary mb-2">No courses found</h3>
                <p className="text-text-muted font-medium">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((course, i) => (
                  <motion.div key={course.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 9) * 0.04 }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

                    {/* Card Top */}
                    <div className="bg-gradient-to-br from-secondary to-secondary-light p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                      <span className="text-3xl">{getCategoryIcon(course.category)}</span>
                      <div className="mt-3 flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-white font-black text-sm">{course.rating}</span>
                        <span className="text-white/50 text-xs font-medium">({course.students.toLocaleString()})</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${getLevelColor(course.level)}`}>{course.level}</span>
                        <span className="text-xs font-bold text-text-muted bg-gray-100 px-2.5 py-1 rounded-full">{course.category}</span>
                      </div>

                      <h3 className="font-black text-secondary text-base leading-snug mb-3 group-hover:text-primary transition-colors flex-1">
                        {course.title}
                      </h3>

                      <p className="text-xs text-text-muted font-medium line-clamp-2 mb-4">{course.description}</p>

                      {/* Meta */}
                      <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-gray-100">
                        <div className="flex flex-col items-center text-center">
                          <Clock size={13} className="text-primary mb-1" />
                          <span className="text-xs font-black text-secondary">{course.duration}</span>
                          <span className="text-xs text-text-muted font-medium">Duration</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <BookOpen size={13} className="text-primary mb-1" />
                          <span className="text-xs font-black text-secondary">{course.modules}</span>
                          <span className="text-xs text-text-muted font-medium">Modules</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <Users size={13} className="text-primary mb-1" />
                          <span className="text-xs font-black text-secondary">{(course.students / 1000).toFixed(1)}K</span>
                          <span className="text-xs text-text-muted font-medium">Students</span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-secondary">{course.price}</span>
                        <Link to={`/courses/${course.id}`}
                          className="bg-primary hover:bg-primary/90 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
