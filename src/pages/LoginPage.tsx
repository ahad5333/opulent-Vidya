import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically call your backend API
    if (email && password) {
      // For demo purposes, just redirect to home
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
      navigate('/');
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-12 border border-primary/10">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Mail size={48} className="text-primary" />
                      </div>
                      <h2 className="text-3xl font-black text-secondary">Welcome Back!</h2>
                      <p className="text-text-muted leading-relaxed max-w-sm">
                        Sign in to access your personalized learning dashboard, track your progress, and continue your educational journey.
                      </p>
                      <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            ✓
                          </div>
                          <span>Personalized dashboard</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            ✓
                          </div>
                          <span>Track your progress</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            ✓
                          </div>
                          <span>Access exclusive content</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-black/5 border border-gray-100">
                <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
                  <ArrowLeft size={20} />
                  Back
                </Link>

                <h1 className="text-4xl font-black text-secondary mb-2">Sign In</h1>
                <p className="text-text-muted mb-10">Enter your credentials to access your account</p>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3">Email Address</label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-4 top-4 text-primary/60" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3">Password</label>
                    <div className="relative">
                      <Lock size={20} className="absolute left-4 top-4 text-primary/60" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 pr-12 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-primary/60 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-text-muted font-bold cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-2 border-gray-200 text-primary cursor-pointer" />
                      Remember me
                    </label>
                    <a href="#" className="text-primary font-bold hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-black py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-text-muted font-bold">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="p-3 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-secondary"
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      className="p-3 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-secondary"
                    >
                      Microsoft
                    </button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-text-muted font-bold mt-8">
                  Don't have an account?{' '}
                  <a href="#" className="text-primary hover:underline">
                    Sign up here
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
