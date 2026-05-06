import { motion } from 'framer-motion';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';

const Features = () => {
  const categories = ["All Programs", "Data Science", "IT & Software", "Business", "Marketing"];
  
  const courses = [
    {
      title: "Data Science & AI Certification",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      duration: "12 Weeks",
      students: "1,240"
    },
    {
      title: "International Business Management",
      category: "Business",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
      rating: 4.8,
      duration: "10 Weeks",
      students: "850"
    },
    {
      title: "Full Stack Web Development",
      category: "Software",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      rating: 4.9,
      duration: "16 Weeks",
      students: "2,100"
    }
  ];

  return (
    <section className="section bg-bg-alt/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-4">Our Top Courses</h4>
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6 leading-tight">
            Featured <span className="text-primary">Learning</span> Programs
          </h2>
          <p className="text-lg text-text-muted font-medium">
            Join world-class certifications designed by industry leaders to accelerate your professional growth.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <button key={cat} className={`px-8 py-3 rounded-full font-bold transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-secondary hover:bg-gray-50 border border-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-primary shadow-sm">
                  {course.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-secondary font-black text-sm">{course.rating}</span>
                </div>
                
                <h3 className="text-2xl font-black text-secondary mb-6 group-hover:text-primary transition-colors leading-snug">
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between text-text-muted text-sm font-bold pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-primary" /> {course.students}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 text-secondary font-black text-lg hover:text-primary transition-all group">
            Browse All 500+ Courses <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
      
      <style>{`
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
};

export default Features;
