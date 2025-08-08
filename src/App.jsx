import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, Layers, Twitter, Instagram, Heart, Menu, X, Laptop } from 'lucide-react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';



export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);





  useEffect(() => {
    setIsLoaded(true);
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
    { icon: <Code className="w-8 h-8" />, name: "Frontend Development", tech: "React, JavaScript (ES6+), HTML, CSS" },
    { icon: <Palette className="w-8 h-8" />, name: "UI Libraries & Styling", tech: "Bootstrap, Material-UI" },
    { icon: <Smartphone className="w-8 h-8" />, name: "Responsive Design", tech: "Mobile-First Design, Flexbox, Grid" },
    { icon: <Layers className="w-8 h-8" />, name: "Component-Based Architecture", tech: "Reusable Components, State Management, Props & Hooks" }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.6s ease-out;
        }
        
        .fade-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.6s ease-out;
        }
        
        .fade-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.5s ease-out;
        }
        
        .scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .float-gentle {
          animation: gentle-float 4s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .hover-scale {
          transition: transform 0.2s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800 transition-all duration-300 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Laptop className="w-6 h-6 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover-scale">
                Faraz.dev
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-blue-400 ${activeSection === section ? 'text-blue-400' : 'text-gray-300'
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 mb-2"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>


          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="px-6 py-4 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700">
              <div className="space-y-2">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      scrollToSection(section);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left capitalize py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-700 ${activeSection === section ? 'text-blue-400 bg-gray-700' : 'text-gray-300'
                      }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav >

      {/* Hero Section */}
      < section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28" >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 transition-all duration-700 ${isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}>
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center hover-scale">
                <span className="text-4xl font-bold">FN</span>
              </div>
            </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            Faraz Naqvi
          </h1>
          <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            Frontend Web Developer
          </p>
          <p className={`text-lg text-gray-400 mb-12 max-w-3xl mx-auto transition-all duration-700 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            Crafting digital experiences that blend creativity with functionality.
            Passionate about building scalable Frontend of applications.
          </p>
          <div className={`flex justify-center space-x-6 mb-12 transition-all duration-700 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <a href="https://github.com/farazNaqvi729927" target='_blank' className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 hover-scale">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/faraz-naqvi-a4731b274/" target='_blank' className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 hover-scale">
              <Linkedin className="w-6 h-6" />
            </a>
            <button onClick={() => scrollToSection('contact')} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 hover-scale">
              <Mail className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce p-2 rounded-full hover:bg-gray-800 transition-all duration-300 float-gentle"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section >

      {/* About Section */}
      < section id="about" className="py-20 px-6" >
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="about-title"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent fade-in ${visibleElements.has('about-title') ? 'visible' : ''
              }`}
          >
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-animate="about-image"
              className={`fade-in-left ${visibleElements.has('about-image') ? 'visible' : ''
                }`}
            >
              <div className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center hover-lift">
                <div className="text-8xl opacity-50 float-gentle">👨‍💻</div>
              </div>
            </div>
            <div
              data-animate="about-content"
              className={`space-y-6 fade-in-right stagger-2 ${visibleElements.has('about-content') ? 'visible' : ''
                }`}
            >
              <p className="text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                I'm a frontend developer who enjoys turning ideas into interactive, user-friendly interfaces. What started as curiosity quickly became a focused journey into clean design, efficient code, and responsive layouts.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                I spend most of my time building real-world projects, experimenting with modern tools, and learning how to create apps that feel smooth and perform well. Every line of code is a step toward better, more thoughtful digital experiences.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {['JavaScript', 'React', 'MUI', 'GitHub', 'Git', 'HTML / CSS'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-all duration-300 hover-scale"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Skills Section */}
      < section id="skills" className="py-20 px-6 bg-gray-800/50" >
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="skills-title"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent fade-in ${visibleElements.has('skills-title') ? 'visible' : ''
              }`}
          >
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                data-animate={`skill-${index}`}
                className={`p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover-lift fade-in ${visibleElements.has(`skill-${index}`) ? 'visible' : ''
                  } ${index % 5 === 0 ? 'stagger-1' : index % 5 === 1 ? 'stagger-2' : index % 5 === 2 ? 'stagger-3' : index % 5 === 3 ? 'stagger-4' : 'stagger-5'}`}
              >
                <div className="text-blue-400 mb-4 flex justify-center hover-scale">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                <p className="text-gray-400 text-sm text-center">{skill.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Experience Section */}
      < section id="experience" className="py-20 px-6" >
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="experience-title"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent fade-in ${visibleElements.has('experience-title') ? 'visible' : ''
              }`}
          >
            Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div
                data-animate="timeline"
                className={`hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 fade-in ${visibleElements.has('timeline') ? 'visible' : ''
                  }`}
              ></div>
              <div className="space-y-12">
                <div
                  data-animate="exp-1"
                  className={`relative sm:pl-20 pl-0 fade-in-right ${visibleElements.has('exp-1') ? 'visible' : ''
                    }`}
                >
                  <div className="hidden sm:block absolute left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900 hover-scale"></div>
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 hover-lift">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors duration-300">Frontend Developer</h3>
                      <span className="text-sm text-blue-400 font-medium">2024 - Present</span>
                    </div>
                    <p className="text-gray-300 mb-3">Personal Projects</p>
                    <p className="text-gray-400 mb-4 hover:text-gray-300 transition-colors duration-300">
                      Developed multiple frontend applications using React and modern JavaScript. Created responsive,
                      user-friendly interfaces with focus on performance and accessibility.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'JavaScript', 'HTML/CSS', 'Material-UI', 'Bootstrap'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-gray-600 transition-all duration-300 hover-scale"
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
                  <div className=" hidden sm:block absolute left-6 w-4 h-4 bg-purple-400 rounded-full border-4 border-gray-900 hover-scale"></div>
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 hover-lift">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-300">Frontend Intern – Evu Inc. USA</h3>
                      <span className="text-sm text-purple-400 font-medium">March 2025 - August 2025</span>
                    </div>
                    <p className="text-gray-300 mb-3">Project-Based Learning in a Real Startup Environment</p>
                    <p className="text-gray-400 mb-4 hover:text-gray-300 transition-colors duration-300">
                      Contributing to the startup project Elaview which is a B2B ad space marketplace project.
                      Here landlords can rent out their unused spaces(walls, windows etc) to ad agencies.
                      Built responsive UI components using React and Material-UI.
                      Collaborated with the team via Slack and managed code through GitHub.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'GitHub'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-gray-600 transition-all duration-300 hover-scale"
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
      </section >

      {/* Projects Section */}
      < section id="projects" className="py-20 px-6" >
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="projects-title"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent fade-in ${visibleElements.has('projects-title') ? 'visible' : ''
              }`}
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                data-animate={`project-${index}`}
                className={`bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 hover-lift group fade-in ${visibleElements.has(`project-${index}`) ? 'visible' : ''
                  } ${index % 5 === 0 ? 'stagger-1' : index % 5 === 1 ? 'stagger-2' : index % 5 === 2 ? 'stagger-3' : index % 5 === 3 ? 'stagger-4' : 'stagger-5'}`}
              >
                <div className="h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center group-hover:from-blue-600/50 group-hover:to-purple-600/50 transition-all duration-300">
                  <Code className="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm group-hover:text-gray-300 transition-colors duration-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 transition-all duration-300 hover-scale"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.github} target='_blank' className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-all duration-300 hover-scale">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a href={project.live} target='_blank' className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-all duration-300 hover-scale">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Contact Section */}
      < section id="contact" className="py-20 px-6 bg-gray-800/50" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
          </p>


          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form ref={form} onSubmit={sendEmail} className="bg-gray-800 rounded-lg p-8 space-y-6">
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your name"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your@email.com"
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Project inquiry etc."
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-vertical"
                  placeholder="Tell me what you'd like to discuss..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-800/50 border border-green-600 rounded-lg">
                  <p className="text-green-300 text-center">
                    ✅ Thank you! Your message has been sent successfully. I'll get back to you soon!
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section >



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
