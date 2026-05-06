import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { allCourses as courseDb } from '../data/courseData';

interface Course {
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  id?: string;
}

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const allCourses: Course[] = [
    // IT Training
    { title: "Agile Training", category: "IT Training", level: "Beginner", duration: "1 Month", modules: 10 },
    { title: "Angular Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Ansible Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Apache Cassandra Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "AWS Certification", category: "IT Training", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "AWS Certified DevOps Training", category: "IT Training", level: "Advanced", duration: "3 Months", modules: 10 },
    { title: "Azure DevOps Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Blue Prism Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "C and C++ Training", category: "IT Training", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "Chef Certification Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Coded UI Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "CSS Training", category: "IT Training", level: "Beginner", duration: "1 Month", modules: 10 },
    { title: "Datastage Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Docker Certification Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "HTML Training", category: "IT Training", level: "Beginner", duration: "1 Month", modules: 10 },
    { title: "Informatica Certification Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Informatica MDM Training", category: "IT Training", level: "Advanced", duration: "2 Months", modules: 10 },
    { title: "Java Certification Training", category: "IT Training", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Javascript Training", category: "IT Training", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "Jmeter Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Kubernetes Training", category: "IT Training", level: "Advanced", duration: "2 Months", modules: 10 },
    { title: "Loadrunner Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Machine Learning with Python Training", category: "IT Training", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "MongoDB Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "MEAN Stack Training", category: "IT Training", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Microsoft Azure Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Microsoft Dynamics CRM Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "MySQL Training", category: "IT Training", level: "Beginner", duration: "1 Month", modules: 10 },
    { title: "Nodejs Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Open Stack Training", category: "IT Training", level: "Advanced", duration: "2 Months", modules: 10 },
    { title: "Openspan Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Pentaho Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "PHP Training", category: "IT Training", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "PowerBI Training", category: "IT Training", level: "Beginner", duration: "1 Month", modules: 10 },
    { title: "Python Training", category: "IT Training", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "QlikView Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "R Programming", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Salesforce Administrator Training", category: "IT Training", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "Salesforce Developer Training", category: "IT Training", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Selenium Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 11 },
    { title: "Soap UI Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "SQL Server DBA Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Teradata Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Unix Shell Scripting Training", category: "IT Training", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Uipath Training", category: "IT Training", level: "Intermediate", duration: "2 Months", modules: 10 },
    
    // Data & AI
    { title: "Artificial Intelligence Course", category: "Data & AI", level: "Advanced", duration: "3 Months", modules: 10 },
    { title: "Big Data Hadoop Developer Training", category: "Data & AI", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Big Data Testing Training", category: "Data & AI", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Data Science Training", category: "Data & AI", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Data Warehousing", category: "Data & AI", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Deep Learning Course", category: "Data & AI", level: "Advanced", duration: "3 Months", modules: 10 },
    { title: "Machine Learning Training", category: "Data & AI", level: "Intermediate", duration: "3 Months", modules: 10 },
    
    // DevOps & Cloud
    { title: "Cloud Computing", category: "DevOps & Cloud", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "DevOps Certification Training", category: "DevOps & Cloud", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "DevOps Training", category: "DevOps & Cloud", level: "Intermediate", duration: "2 Months", modules: 10 },
    
    // Digital & Design
    { title: "Digital Marketing", category: "Digital & Design", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "Graphic Design", category: "Digital & Design", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "SEO Services", category: "Digital & Design", level: "Beginner", duration: "1 Month", modules: 10 },
    { title: "Web Designing", category: "Digital & Design", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "Website Development", category: "Digital & Design", level: "Intermediate", duration: "3 Months", modules: 10 },
    
    // Engineering
    { title: "Architecture Engineering Services", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Building Construction Course", category: "Engineering", level: "Beginner", duration: "3 Months", modules: 10 },
    { title: "Civil Engineering Courses", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Civil & Structure Design Services", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Costing and Estimation Course", category: "Engineering", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "Design Engineer Course", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Electrical Design Course", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Electrical Engineering Courses", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Electrical Safety Engineer Course", category: "Engineering", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "HVAC Technologies", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Irrigation Engineering Course", category: "Engineering", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "MEP Course", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Mechanical Engineering Courses", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Piping Engineer Course", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Power Plant Technologies", category: "Engineering", level: "Advanced", duration: "3 Months", modules: 10 },
    { title: "Primavera P6 Training", category: "Engineering", level: "Intermediate", duration: "1 Month", modules: 10 },
    { title: "Structures and Design Course", category: "Engineering", level: "Intermediate", duration: "3 Months", modules: 10 },
    { title: "Substation & Switch-Yards", category: "Engineering", level: "Advanced", duration: "2 Months", modules: 10 },
    { title: "Transportation Engineering Course", category: "Engineering", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Welding and Fabrication", category: "Engineering", level: "Beginner", duration: "2 Months", modules: 10 },
    
    // Testing
    { title: "Manual Testing Training", category: "Testing", level: "Beginner", duration: "2 Months", modules: 10 },
    { title: "ETL Testing Training", category: "Testing", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Software Testing", category: "Testing", level: "Beginner", duration: "2 Months", modules: 10 },
    
    // Other
    { title: "Ethical Hacking Course", category: "Other", level: "Advanced", duration: "3 Months", modules: 10 },
    { title: "Project Management", category: "Other", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Robotic Process Automation", category: "Other", level: "Intermediate", duration: "2 Months", modules: 10 },
    { title: "Software Development", category: "Other", level: "Intermediate", duration: "3 Months", modules: 10 },
  ];

  const categories = ['All', 'IT Training', 'Data & AI', 'DevOps & Cloud', 'Digital & Design', 'Engineering', 'Testing', 'Other'];

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section id="courses" className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-4">All Courses</h4>
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6 leading-tight">
            Explore Our <span className="text-primary">Courses</span>
          </h2>
          <p className="text-lg text-text-muted font-medium">
            IT, Engineering, Digital, DevOps, Data &amp; AI — find the right course for your career.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-secondary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Count */}
        <div className="text-center mb-12">
          <p className="text-text-muted font-bold">
            Showing <span className="text-primary font-black">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCourses.slice(0, 10).map((course, index) => (
            <motion.div
              key={`${course.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 12) * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all group cursor-pointer"
            >
              {/* Level Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-black px-3 py-1.5 rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="text-xs font-bold text-text-muted bg-gray-50 px-3 py-1.5 rounded-full">
                  {course.category}
                </span>
              </div>

              {/* Course Title */}
              <h3 className="text-lg font-black text-secondary mb-4 group-hover:text-primary transition-colors leading-snug min-h-14">
                {course.title}
              </h3>

              {/* Course Meta */}
              <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-muted font-bold">Duration</span>
                  <span className="text-secondary font-black">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-muted font-bold">Modules</span>
                  <span className="text-secondary font-black">{course.modules}</span>
                </div>
              </div>

              {/* CTA Button */}
              {(() => {
                const rich = courseDb.find(c => c.title === course.title);
                return rich ? (
                  <Link to={`/courses/${rich.id}`}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn">
                    View Course
                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn">
                    View Course
                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                );
              })()}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-text-muted font-medium">No courses found matching your search.</p>
          </div>
        )}

        {/* Browse All CTA */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <Link to="/courses"
            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-white font-black px-10 py-4 rounded-full text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group">
            Browse For More Courses
            <span className="bg-white/15 rounded-full p-1 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={18} />
            </span>
          </Link>
          <p className="text-text-muted text-sm font-medium">Explore the complete catalog with filters &amp; search</p>
        </div>
      </div>
    </section>
  );
};

export default Courses;
