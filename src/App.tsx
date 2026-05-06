import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import UniversityPartners from './components/UniversityPartners';
import StudyAbroad from './components/StudyAbroad';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import ChatWidget from './components/ChatWidget';
import BlogSection from './components/BlogSection';

function HomePage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <UniversityPartners />
      <StudyAbroad />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/blog" element={<BlogsPage />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;

