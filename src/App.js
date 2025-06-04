import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Download, ExternalLink, Github, Mail, Linkedin, Moon, Sun, Code, Database, Globe, Cpu, Eye, Menu, X, ArrowUp, Sparkles, Star, Zap } from 'lucide-react';
import profileImage from './assets/images/profile.jpg';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      // Show scroll to top button
      setShowScrollTop(window.scrollY > 400);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const projects = [
    {
      title: "E-Commerce Web Application",
      description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      technologies: ["React", "PHP", "MySQL", "CSS"],
      features: ["User Registration/Login", "Product Catalog", "Shopping Cart", "Order Management"],
      github: "https://github.com/ActubKylle",
      demo: "https://github.com/ActubKylle",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Task Management System",
      description: "A collaborative task management application for teams with real-time updates and project tracking.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      features: ["Task Creation", "Team Collaboration", "Progress Tracking", "Due Date Alerts"],
      github: "https://github.com/ActubKylle",
      demo: "https://github.com/ActubKylle",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Personal Blog Website",
      description: "A responsive blog platform with content management system and comment functionality.",
      technologies: ["React", "CSS", "JavaScript"],
      features: ["Content Management", "Responsive Design", "Comment System", "Search Functionality"],
      github: "https://github.com/ActubKylle",
      demo: "https://github.com/ActubKylle",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const skills = {
    "Languages": { 
      items: ["HTML", "CSS", "JavaScript", "PHP", "Python", "Java"],
      icon: Code,
      color: "from-green-400 to-blue-500"
    },
    "Frontend": { 
      items: ["React", "Responsive Design", "Tailwind CSS"],
      icon: Globe,
      color: "from-pink-400 to-purple-500"
    },
    "Backend": { 
      items: ["PHP", "MySQL", "RESTful APIs"],
      icon: Database,
      color: "from-yellow-400 to-orange-500"
    },
    "Tools": { 
      items: ["Git", "GitHub", "VS Code", "Figma"],
      icon: Cpu,
      color: "from-cyan-400 to-blue-500"
    },
    "Currently Learning": { 
      items: ["AI/ML", "TypeScript", "Node.js", "MongoDB"],
      icon: Sparkles,
      color: "from-purple-400 to-pink-500"
    }
  };

  // Intersection Observer hooks for each section
  const [homeRef, homeInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} relative overflow-x-hidden`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'} backdrop-blur-xl border-b`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Kylle Nichole
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-600 relative ${
                    activeSection === item ? 'text-blue-600 font-medium' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className={`md:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`block px-3 py-2 text-base capitalize transition-colors duration-200 hover:text-blue-600 ${
                        activeSection === item ? 'text-blue-600 font-medium' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative" ref={homeRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate={homeInView ? "visible" : "hidden"}
          >
            <motion.div className="mb-8" variants={fadeInUp}>
              <motion.div 
                className="w-32 h-32 rounded-full mx-auto mb-6 relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 0],
                  boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.7), 0 0 0 10px rgba(59, 130, 246, 0.5), 0 0 0 20px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Profile Image */}
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
                  <img 
                    src={profileImage} 
                    alt="Kylle Nichole Actub" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Hide image and show fallback if loading fails
                      e.target.style.display = 'none';
                      e.target.parentElement.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials if image doesn't load */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white" style={{display: 'none'}}>
                    KA
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              variants={fadeInUp}
            >
              Hi, I'm{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Kylle Nichole Actub
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl mb-6 text-gray-600 dark:text-gray-300"
              variants={fadeInUp}
            >
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Web Developer
              </motion.span>
              {' | '}
              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Passionate Learner
              </motion.span>
            </motion.p>

            <motion.p 
              className={`text-lg mb-8 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              variants={fadeInUp}
            >
              A BSIT graduate with a passion for web development and automation. I build projects using HTML, CSS, React, and PHP. I'm eager to keep learning and contribute to meaningful software solutions.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-2xl transform transition-all duration-200 flex items-center justify-center relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Download size={20} className="mr-2" />
                View My Resume
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection('projects')}
                className={`border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center group ${darkMode ? 'hover:bg-blue-600' : ''}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + i * 5}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} relative`} ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
              initial={{ width: 0 }}
              animate={aboutInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-8 shadow-xl relative overflow-hidden`}
              variants={scaleIn}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <motion.p 
                className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                variants={fadeInLeft}
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                transition={{ delay: 0.2 }}
              >
                I'm a Bachelor of Science in Information Technology graduate with hands-on experience in frontend and backend development. My journey in tech started with curiosity about how websites work, which led me to dive deep into web development technologies.
              </motion.p>

              <motion.p 
                className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                variants={fadeInRight}
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
              >
                I enjoy learning new technologies, solving problems, and working collaboratively with teams. My experience spans across HTML, CSS, JavaScript, React for frontend development, and PHP for backend solutions. I believe in writing clean, maintainable code and creating user-friendly interfaces.
              </motion.p>

              <motion.p 
                className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                variants={fadeInLeft}
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                transition={{ delay: 0.6 }}
              >
                Although I have not explored AI/ML yet, I'm excited to learn more in that field and expand my skill set. I'm always open to new challenges and opportunities to grow as a developer.
              </motion.p>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                variants={staggerContainer}
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
              >
                {[
                  { icon: Code, title: "Clean Code", desc: "Writing maintainable and efficient code" },
                  { icon: Globe, title: "Web Development", desc: "Full-stack web application development" },
                  { icon: Cpu, title: "Problem Solving", desc: "Analytical thinking and creative solutions" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="text-center group"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative" ref={skillsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I Can Do</h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
              initial={{ width: 0 }}
              animate={skillsInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
          >
            {Object.entries(skills).map(([category, data], index) => {
              const IconComponent = data.icon;
              return (
                <motion.div 
                  key={category} 
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${data.color} opacity-10 rounded-full blur-xl`}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 6 + index,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${data.color} rounded-xl flex items-center justify-center text-white mr-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent size={24} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-blue-600">{category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {data.items.map((skill, skillIndex) => (
                      <motion.span 
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-all duration-200 cursor-pointer`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={skillsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.1 * skillIndex }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} relative`} ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
              initial={{ width: 0 }}
              animate={projectsInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Project number indicator */}
                <motion.div
                  className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${project.gradient} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {index + 1}
                </motion.div>

                {/* Content container - flex grow to push buttons to bottom */}
                <div className="flex flex-col flex-grow">
                  <motion.h3 
                    className="text-xl font-semibold mb-3 pr-12"
                    initial={{ opacity: 0 }}
                    animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p 
                    className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}
                    initial={{ opacity: 0 }}
                    animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <h4 className="font-medium mb-2 flex items-center">
                      <Zap size={16} className="mr-2 text-yellow-500" />
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={tech} 
                          className={`px-2 py-1 bg-gradient-to-r ${project.gradient} text-white rounded text-sm font-medium`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={projectsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.1 * techIndex }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="mb-6 flex-grow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <h4 className="font-medium mb-2 flex items-center">
                      <Star size={16} className="mr-2 text-yellow-500" />
                      Key Features:
                    </h4>
                    <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={projectsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.1 * featureIndex }}
                        >
                          <motion.div 
                            className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full mr-2 flex-shrink-0`}
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: featureIndex * 0.2,
                            }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Buttons at bottom - aligned properly */}
                  <motion.div 
                    className="flex gap-3 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm flex-1`}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} className="mr-2" />
                      Live Demo
                    </motion.a>
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-600 transition-all duration-200 text-sm flex-1 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "#3B82F6"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} className="mr-2" />
                      GitHub
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative" ref={contactRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Connect</h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
              initial={{ width: 0 }}
              animate={contactInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={staggerContainer}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
          >
            <motion.p 
              className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              variants={fadeInUp}
            >
              I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={fadeInUp}
            >
              <motion.a 
                href="mailto:kylle.actub@email.com"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-2xl transform transition-all duration-200 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail size={20} className="mr-2" />
                </motion.div>
                Send Email
              </motion.a>

              <div className="flex gap-4">
                <motion.a 
                  href="https://linkedin.com/in/kylle-actub"
                  className={`p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 transition-all duration-200 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} relative overflow-hidden group`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(0, 119, 181, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Linkedin size={24} />
                  </motion.div>
                </motion.a>

                <motion.a 
                  href="https://github.com/kylle-actub"
                  className={`p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 transition-all duration-200 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} relative overflow-hidden group`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(88, 28, 135, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-purple-500/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <Github size={24} />
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>

            {/* Floating contact icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[Mail, Linkedin, Github].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-blue-400/20"
                  style={{
                    left: `${15 + i * 25}%`,
                    top: `${20 + i * 10}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                >
                  <Icon size={24} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className={`py-8 border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} relative overflow-hidden`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p 
            className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            © 2025 Kylle Nichole Actub. Built with React & Tailwind CSS.
          </motion.p>

          {/* Animated footer decoration */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading overlay for smooth transitions */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-600 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          className="text-white text-2xl font-bold"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          KA
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;