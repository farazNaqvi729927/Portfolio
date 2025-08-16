import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, Layers, Menu, X, Zap, Star, Rocket, Heart, Server, Database } from 'lucide-react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';



export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });



  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      // Intersection observer for animations
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisibleElements(prev => new Set(prev).add(el.dataset.animate));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [fromValues, setformValues] = useState({
    from_name: '',
    from_email: '',
    from_subject: '',
    message: '',
  });


  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = 'service_0wazajj';
    const templateID = 'template_8wlxto7';
    const userID = '7lnC_-gC9KTTvTPhA';

    emailjs.sendForm(serviceID, templateID, form.current, userID)
      .then((result) => {
        console.log('Message Sent Successfully!', result.text);
        setSubmitStatus('success');
        setIsSubmitting(false);
        setformValues({
          from_name: '',
          from_email: '',
          from_subject: '',
          message: ''
        });

        setTimeout(() => setSubmitStatus(''), 5000); // clear success status
      })
      .catch((error) => {
        console.error('Failed to send message...', error.text);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
  };




  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };


  const projects = [
    {
      title: "KFC Pakistan Clone",
      description: "This is a clone of the KFC Pakistan Website that I created from scratch. It's a proper functioning frontend of the original website.",
      tech: ["React", "JavaScript", "Material UI"],
      github: "https://github.com/farazNaqvi729927/kfc-clone",
      live: "https://kfc-clone558.netlify.app"
    },
    {
      title: "Othello Board Game",
      description: "In this Game you have a 8x8 Board with Black and white Pieces, colour has the most Pieces on the Board at the end of the game wins.",
      tech: ["Vanilla JavaScript"],
      github: "https://github.com/farazNaqvi729927/othello-Game",
      live: "https://othello-game558.netlify.app"
    },
    {
      title: "Word Counter App",
      description: "The Word Counter App is a good and efficient tool designed to help users count the number of words in any given text. Its easy to use.It was created using React and Bootstrap.",
      tech: ["React", "Bootstrap"],
      github: "https://github.com/farazNaqvi729927/word-counter",
      live: "https://word-counter112.netlify.app"
    }
  ];

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      name: "Frontend Development",
      tech: "React, JavaScript (ES6+), HTML, CSS"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      name: "UI Libraries & Styling",
      tech: "Bootstrap, Material-UI, TailwindCSS"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      name: "Responsive Design",
      tech: "Mobile-First Design, Flexbox, Grid"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      name: "Component-Based Architecture",
      tech: "Reusable Components, State Management, Props & Hooks"
    },
    {
      icon: <Server className="w-8 h-8" />,
      name: "Backend Development (Learning)",
      tech: "Node.js, Express.js, REST APIs"
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "Databases (Learning)",
      tech: "MongoDB, Mongoose"
    }
  ];


  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      <style>{`
        .gradient-text {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-animation 6s ease infinite;
        }
        
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.3s; }
        .stagger-3 { transition-delay: 0.5s; }
        .stagger-4 { transition-delay: 0.7s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(1deg); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 107, 0.8), 0 0 60px rgba(78, 205, 196, 0.3); }
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .bg-mesh {
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(69, 183, 209, 0.3) 0%, transparent 50%);
        }
      `}</style>


      {/* Animated background */}
      <div className="fixed inset-0 bg-mesh opacity-50">

      </div>

      <div className="fixed inset-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
          }}
        ></div>
      </div>



      {/* Navigation */}
      <nav className={`fixed top-0 w-full glass-card z-50 transition-all duration-500 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center pulse-glow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                Faraz.dev
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 text-lg font-medium relative group ${activeSection === section
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 transform origin-left transition-transform duration-300 ${activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}>
            <div className="glass-card rounded-2xl p-6 space-y-3">
              {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left capitalize py-3 px-4 rounded-xl transition-all duration-300 ${activeSection === section
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>



      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-28">
        <div className="text-center z-10 px-6 max-w-5xl mx-auto">
          <div className="mb-12">
            <div className={`w-40 h-40 mx-auto mb-8 rounded-full relative transition-all duration-1000 float-animation ${isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full blur-xl opacity-75"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-5xl font-bold gradient-text">FN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className={`text-4xl md:text-6xl font-black mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}>
              <span className="gradient-text text-glow">Faraz</span>
              <span className="text-white"> Naqvi</span>
            </h1>

            <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}>
              <span className="px-6 py-3 glass-card rounded-full text-cyan-400 font-semibold flex items-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Frontend Developer | Transitioning to Full-Stack</span>
              </span>

            </div>

            <p className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}>
              Crafting extraordinary digital experiences with React and modern UI tools — now expanding my expertise
              into full-stack development with Node.js, Express, and MongoDB.
            </p>

            <div className={`flex justify-center space-x-6 mb-16 transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}>
              <a href="https://github.com/farazNaqvi729927" target="_blank"
                className="p-4 glass-card rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift group">
                <Github className="w-7 h-7 group-hover:text-purple-400 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/faraz-naqvi-a4731b274/" target="_blank"
                className="p-4 glass-card rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift group">
                <Linkedin className="w-7 h-7 group-hover:text-blue-400 transition-colors" />
              </a>
              <button onClick={() => scrollToSection('contact')}
                className="p-4 glass-card rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift group">
                <Mail className="w-7 h-7 group-hover:text-green-400 transition-colors" />
              </button>
            </div>

            <button onClick={() => scrollToSection('about')}
              className="animate-bounce p-3 glass-card rounded-full hover:bg-white/10 transition-all duration-300 float-animation">
              <ChevronDown className="w-8 h-8 text-cyan-400" />
            </button>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="about-title"
            className={`text-3xl md:text-4xl font-bold text-center mb-10 leading-tight pb-2 gradient-text fade-in ${visibleElements.has('about-title') ? 'visible' : ''}`}>
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              data-animate="about-image"
              className={`fade-in-left ${visibleElements.has('about-image') ? 'visible' : ''}`}
            >
              <div className="relative">
                <div className="w-full h-96 glass-card rounded-3xl p-8 hover-lift">
                  <div className="h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="text-8xl float-animation">🚀</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-2xl"></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-2xl opacity-50"></div>
              </div>
            </div>

            <div
              data-animate="about-content"
              className={`space-y-8 fade-in-right stagger-2 ${visibleElements.has('about-content') ? 'visible' : ''}`}>
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  I'm a passionate frontend developer who transforms creative visions into
                  <span className="text-cyan-400 font-semibold"> interactive digital experiences</span>.
                  My journey started with curiosity and evolved into a mission to build interfaces
                  that not only look stunning but also feel intuitive and responsive.
                </p>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Every project is an opportunity to push boundaries, experiment with
                  <span className="text-pink-400 font-semibold"> cutting-edge technologies</span>,
                  and create solutions that make a real impact. While my foundation is in frontend,
                  I'm actively expanding into the <span className="text-green-400 font-semibold">MERN stack</span>,
                  learning to craft both seamless interfaces and the backends that power them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto relative">
          <h2
            data-animate="skills-title"
            className={`text-3xl md:text-4xl font-bold text-center mb-10 leading-tight pb-2 gradient-text fade-in ${visibleElements.has('skills-title') ? 'visible' : ''
              }`}
          >
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                data-animate={`skill-${index}`}
                className={`glass-card p-8 rounded-3xl hover-lift group fade-in ${visibleElements.has(`skill-${index}`) ? 'visible' : ''
                  } ${index % 4 === 0 ? 'stagger-1' : index % 4 === 1 ? 'stagger-2' : index % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} p-0.5 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                  {skill.name}
                </h3>

                <p className="text-gray-400 text-center text-sm leading-relaxed">
                  {skill.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="experience-title"
            className={`text-3xl md:text-4xl font-bold text-center mb-10 leading-tight pb-2 gradient-text fade-in ${visibleElements.has('experience-title') ? 'visible' : ''
              }`}
          >
            Experience
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">

              <div
                data-animate="timeline"
                className={`hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-pink-500 fade-in ${visibleElements.has('timeline') ? 'visible' : ''
                  }`}
              ></div>

              <div className="space-y-12">

                <div
                  data-animate="exp-1"
                  className={`relative sm:pl-20 pl-0 fade-in-right ${visibleElements.has('exp-1') ? 'visible' : ''}`}
                >
                  <div className="hidden sm:block absolute left-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-black shadow-lg shadow-cyan-400/50"></div>

                  <div className="glass-card rounded-3xl p-8 hover-lift group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                        Frontend Developer
                      </h3>
                      <span className="text-sm text-cyan-400 font-semibold px-4 py-2 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                        2024 - Present
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3 font-medium">Personal Projects</p>
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Developed multiple frontend applications using React and modern JavaScript. Created responsive,
                      user-friendly interfaces with focus on performance and accessibility.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'JavaScript', 'HTML/CSS', 'Material-UI', 'Bootstrap'].map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


                <div
                  data-animate="exp-2"
                  className={`relative sm:pl-20 pl-0 fade-in-right stagger-2 ${visibleElements.has('exp-2') ? 'visible' : ''
                    }`}
                >
                  <div className="hidden sm:block absolute left-6 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-4 border-black shadow-lg shadow-pink-400/50"></div>
                  <div className="glass-card rounded-3xl p-8 hover-lift group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                        Frontend Intern – Evu Inc. USA
                      </h3>
                      <span className="text-sm text-pink-400 font-semibold px-4 py-2 bg-pink-400/10 rounded-full border border-pink-400/20">
                        March 2025 - August 2025
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3 font-medium">Project-Based Learning in a Real Startup Environment</p>
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Contributing to the startup project Elaview which is a B2B ad space marketplace project.
                      Here landlords can rent out their unused spaces (walls, windows etc) to ad agencies.
                      Built responsive UI components using React and Material-UI.
                      Collaborated with the team via Slack and managed code through GitHub.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'GitHub'].map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="projects-title"
            className={`text-3xl md:text-4xl font-bold text-center mb-10 leading-tight pb-2 gradient-text fade-in ${visibleElements.has('projects-title') ? 'visible' : ''}`}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                data-animate={`project-${index}`}
                className={`glass-card rounded-3xl overflow-hidden hover-lift group cursor-pointer fade-in ${visibleElements.has(`project-${index}`) ? 'visible' : ''
                  } ${index % 3 === 0 ? 'stagger-1' : index % 3 === 1 ? 'stagger-2' : 'stagger-3'}`}
              >
                <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <Code className="w-16 h-16 text-cyan-400 group-hover:scale-110 transition-transform duration-300 float-animation" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.github} target='_blank' className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm transition-all duration-300 hover:scale-105 group/link">
                      <Github className="w-4 h-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                      Code
                    </a>
                    <a href={project.live} target='_blank' className="flex items-center text-pink-400 hover:text-pink-300 text-sm transition-all duration-300 hover:scale-105 group/link">
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-32 px-6 relative">
        <style>{`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  textarea:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-text-fill-color: white !important;
    caret-color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    transition: background-color 5000s ease-in-out 0s;
    background-color: transparent !important;
  }
`}</style>


        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-animate="contact-title"
            className={`text-3xl md:text-4xl font-bold text-center mb-8 leading-tight pb-2 gradient-text fade-in ${visibleElements.has('contact-title') ? 'visible' : ''}`}>
            Let's Work Together
          </h2>

          <p
            data-animate="contact-subtitle"
            className={`text-xl text-gray-300 mb-12 max-w-2xl mx-auto fade-in stagger-1 ${visibleElements.has('contact-subtitle') ? 'visible' : ''}`}>
            I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
          </p>

          <div className="max-w-2xl mx-auto">
            <form
              ref={form}
              onSubmit={sendEmail}
              data-animate="contact-form"
              className={`glass-card rounded-3xl p-8 space-y-6 hover-lift fade-in stagger-2 ${visibleElements.has('contact-form') ? 'visible' : ''}`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    required
                    value={fromValues.from_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass-card border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-gray-400 transition-all duration-300 hover:border-white/20 autofill:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.05)] autofill:text-white"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    required
                    value={fromValues.from_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass-card border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-gray-400 transition-all duration-300 hover:border-white/20 autofill:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.05)] autofill:text-white"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="from_subject"
                  required
                  value={fromValues.from_subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass-card border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-gray-400 transition-all duration-300 hover:border-white/20 autofill:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.05)] autofill:text-white"
                  placeholder="Project inquiry etc."
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={fromValues.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass-card border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-gray-400 resize-vertical transition-all duration-300 hover:border-white/20 autofill:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.05)] autofill:text-white"
                  placeholder="Tell me what you'd like to discuss..."
                  autoComplete="off"
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 glass-card border border-green-400/30 rounded-xl bg-green-400/10">
                  <p className="text-green-300 text-center flex items-center justify-center space-x-2">
                    <Star className="w-5 h-5 text-green-400" />
                    <span>Thank you! Your message has been sent successfully. I'll get back to you soon!</span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform relative overflow-hidden group ${isSubmitting
                  ? 'bg-white/10 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white'
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* Footer */}
      < footer className="relative py-16 border-t border-white/10 bg-gradient-to-b from-transparent to-black/20" >
        {/* Subtle background pattern */}
        < div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-12">

            {/* Brand & Info Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-400/20 transition-all duration-300 group-hover:shadow-green-400/40 group-hover:scale-105">
                    <span className="text-black font-bold text-lg">FN</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Faraz Naqvi</h3>
                  <p className="text-gray-400 text-sm">Frontend Developer</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed max-w-md">
                  Writing clean code, building smooth interfaces, and solving real-world problems — one project at a time.
                </p>


                {/* Call to action */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-400/20 hover:border-green-400/40 transition-all duration-300 group cursor-pointer">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Available for projects
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-6">
              <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Connect
              </h4>

              <div className="space-y-3">
                <a
                  href="https://github.com/farazNaqvi729927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  aria-label="Visit GitHub profile"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      GitHub
                    </span>
                    <p className="text-xs text-gray-500">View my repositories</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/faraz-naqvi-a4731b274/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  aria-label="Visit LinkedIn profile"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      LinkedIn
                    </span>
                    <p className="text-xs text-gray-500">Professional network</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 text-center">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {new Date().getFullYear()} Faraz Naqvi.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
              <span>in Pakistan</span>
            </div>
          </div>

        </div>
      </footer >

    </div >

  )
}
