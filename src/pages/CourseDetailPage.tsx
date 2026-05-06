import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Star, Clock, Users, BookOpen, CheckCircle2,
  BadgeCheck, Globe, Award, ChevronDown, ChevronUp, Play,
  Zap, Shield
} from 'lucide-react';
import { useState } from 'react';
import { getCourseById } from '../data/courseData';

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Intermediate': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Advanced': return 'bg-violet-100 text-violet-700 border-violet-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId ?? '');
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [enrolled, setEnrolled] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-black text-secondary mb-2">Course Not Found</h1>
        <Link to="/courses" className="text-primary font-bold hover:underline">← Browse All Courses</Link>
      </div>
    );
  }

  const totalLessons = course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-secondary via-secondary-light to-primary/60 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link to="/courses" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold mb-8 transition-colors">
            <ArrowLeft size={15} /> All Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Breadcrumb badges */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  <span className={`text-xs font-black px-3 py-1.5 rounded-full border ${getLevelColor(course.level)}`}>{course.level}</span>
                  <span className="text-xs font-bold bg-white/15 text-white px-3 py-1.5 rounded-full">{course.category}</span>
                  {course.certificate && (
                    <span className="text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Award size={11} /> Certificate Included
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-5">{course.title}</h1>
                <p className="text-white/75 text-lg font-medium mb-6 leading-relaxed">{course.description}</p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span className="font-black">{course.rating}</span>
                    <span className="text-white/60 text-sm">({course.students.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
                    <Clock size={15} className="text-primary-light" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
                    <BookOpen size={15} className="text-primary-light" /> {totalLessons} Lessons
                  </div>
                  <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
                    <Globe size={15} className="text-primary-light" /> {course.language}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold bg-white/10 text-white/80 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Enrollment Card (desktop sticky) */}
            <div className="hidden lg:block">
              <EnrollCard course={course} enrolled={enrolled} onEnroll={() => setEnrolled(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* What You'll Learn */}
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-black text-secondary mb-6 flex items-center gap-2">
                <Zap size={22} className="text-primary" /> What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-text-muted font-medium text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Course Curriculum */}
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-black text-secondary mb-2 flex items-center gap-2">
                <BookOpen size={22} className="text-primary" /> Course Curriculum
              </h2>
              <p className="text-text-muted font-medium text-sm mb-6">
                {course.curriculum.length} modules · {totalLessons} lessons · {course.duration}
              </p>
              <div className="space-y-3">
                {course.curriculum.map((mod, i) => (
                  <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-primary/10 text-primary text-xs font-black rounded-full flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="font-black text-secondary text-sm">{mod.title}</span>
                        <span className="text-xs text-text-muted font-medium">{mod.lessons.length} lessons</span>
                      </div>
                      {openModule === i ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-text-muted" />}
                    </button>
                    {openModule === i && (
                      <div className="divide-y divide-gray-50">
                        {mod.lessons.map((lesson, j) => (
                          <div key={j} className="flex items-center gap-3 px-5 py-3">
                            <Play size={13} className="text-primary fill-primary shrink-0" />
                            <span className="text-sm text-text-muted font-medium">{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Requirements */}
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-black text-secondary mb-6 flex items-center gap-2">
                <Shield size={22} className="text-primary" /> Requirements
              </h2>
              <ul className="space-y-3">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span className="text-text-muted font-medium text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Instructor */}
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-black text-secondary mb-6">Your Instructor</h2>
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg">
                  {course.instructor.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-secondary">{course.instructor.name}</h3>
                    <BadgeCheck size={18} className="text-primary" />
                  </div>
                  <p className="text-primary font-bold text-sm mb-3">{course.instructor.title}</p>

                  {/* Instructor Stats */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {[
                      { icon: <Star size={13} className="text-amber-400 fill-amber-400" />, val: course.instructor.rating, label: 'Rating' },
                      { icon: <Users size={13} className="text-primary" />, val: course.instructor.students.toLocaleString(), label: 'Students' },
                      { icon: <BookOpen size={13} className="text-primary" />, val: course.instructor.courses, label: 'Courses' },
                      { icon: <Clock size={13} className="text-primary" />, val: course.instructor.experience, label: 'Experience' },
                    ].map(({ icon, val, label }) => (
                      <div key={label} className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2">
                        {icon}
                        <span className="text-sm font-black text-secondary">{val}</span>
                        <span className="text-xs text-text-muted font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-text-muted font-medium text-sm leading-relaxed">{course.instructor.bio}</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar: Sticky Enroll Card */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <EnrollCard course={course} enrolled={enrolled} onEnroll={() => setEnrolled(true)} />

              {/* Extra Info */}
              <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                <h4 className="font-black text-secondary text-sm uppercase tracking-wide">This Course Includes</h4>
                {[
                  [<Play size={14} />, `${totalLessons} on-demand lessons`],
                  [<BookOpen size={14} />, `${course.modules} comprehensive modules`],
                  [<Globe size={14} />, `Language: ${course.language}`],
                  [<Award size={14} />, 'Certificate of Completion'],
                  [<Zap size={14} />, 'Lifetime access'],
                  [<BadgeCheck size={14} />, '100% Job Assistance'],
                ].map(([icon, text], i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-text-muted font-medium">
                    <span className="text-primary">{icon}</span> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Enroll Card */}
        <div className="lg:hidden mt-10">
          <EnrollCard course={course} enrolled={enrolled} onEnroll={() => setEnrolled(true)} />
        </div>
      </div>
    </div>
  );
}

/* ── Enroll Card ── */
interface EnrollCardProps {
  course: ReturnType<typeof getCourseById> & object;
  enrolled: boolean;
  onEnroll: () => void;
}

function EnrollCard({ course, enrolled, onEnroll }: EnrollCardProps) {
  if (!course) return null;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-5 text-center">
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Course Fee</p>
        <p className="text-4xl font-black text-white">{course.price}</p>
        <p className="text-white/60 text-xs mt-1">Includes lifetime access</p>
      </div>
      <div className="p-6 space-y-3">
        <button
          onClick={onEnroll}
          className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-300 ${enrolled ? 'bg-emerald-500 text-white cursor-default' : 'bg-primary hover:bg-primary/90 text-white hover:scale-105 active:scale-95 shadow-lg shadow-primary/30'}`}
        >
          {enrolled ? '✓ Enrolled Successfully!' : 'Enroll Now'}
        </button>
        <button className="w-full py-3 rounded-2xl font-black text-sm border-2 border-primary text-primary hover:bg-primary/5 transition-all">
          Download Brochure
        </button>
        <p className="text-center text-xs text-text-muted font-medium">30-day money-back guarantee</p>

        {/* Quick Facts */}
        <div className="pt-3 border-t border-gray-100 space-y-2.5">
          {[
            ['Duration', course.duration],
            ['Modules', `${course.modules} Modules`],
            ['Level', course.level],
            ['Language', course.language],
            ['Last Updated', course.lastUpdated],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-text-muted font-bold">{label}</span>
              <span className="text-secondary font-black">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
