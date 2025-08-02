import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, Layers } from 'lucide-react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';



export default function Portfolio() {

  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');


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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };



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
        setformValues({ from_name: '', from_email: '', message: '' });
      }, (error) => {
        console.error('Failed to send message...', error.text);
      });

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setformValues({ name: '', email: '', from_subject: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 1500);
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 hover:text-blue-400 ${activeSection === section ? 'text-blue-400' : 'text-gray-300'
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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-bold">FN</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Faraz Naqvi
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Frontend Web Developer
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Crafting digital experiences that blend creativity with functionality.
            Passionate about building scalable Frontend of applications.
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://github.com/farazNaqvi729927" target='_blank' className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300 hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/faraz-naqvi-a4731b274/" target='_blank' className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300 hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <button onClick={() => scrollToSection('contact')} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300 hover:scale-110">
              <Mail className="w-6 h-6" />
            </button>
          </div>
          <button onClick={() => scrollToSection('about')} className="animate-bounce p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                <div className="text-8xl opacity-50">👨‍💻</div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a frontend developer who enjoys turning ideas into interactive, user-friendly interfaces. What started as curiosity quickly became a focused journey into clean design, efficient code, and responsive layouts.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I spend most of my time building real-world projects, experimenting with modern tools, and learning how to create apps that feel smooth and perform well. Every line of code is a step toward better, more thoughtful digital experiences.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {['JavaScript', 'React', 'MUI', 'GitHub', 'Git', 'HTML / CSS'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                <div className="text-blue-400 mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{skill.name}</h3>
                <p className="text-gray-400 text-sm text-center">{skill.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </h2>

          <div className="max-w-4xl mx-auto">


            <div className="relative">

              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500"></div>


              <div className="space-y-12">

                <div className="relative pl-20">

                  <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900"></div>

                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">Frontend Developer</h3>
                      <span className="text-sm text-blue-400 font-medium">2024 - Present</span>
                    </div>

                    <p className="text-gray-300 mb-3">Personal Projects</p>

                    <p className="text-gray-400 mb-4">
                      Developed multiple frontend applications using React and modern JavaScript. Created responsive,
                      user-friendly interfaces with focus on performance and accessibility.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {['React', 'JavaScript', 'HTML/CSS', 'Material-UI', 'Bootstrap'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>


                {/* Experience Item 2 */}
                <div className="relative pl-20">

                  <div className="absolute left-6 w-4 h-4 bg-purple-400 rounded-full border-4 border-gray-900"></div>

                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">Frontend Intern – Evu Inc. Startup</h3>
                      <span className="text-sm text-purple-400 font-medium">March 2025 - August 2025</span>
                    </div>

                    <p className="text-gray-300 mb-3">Project-Based Learning in a Real Startup Environment</p>

                    <p className="text-gray-400 mb-4">
                      Contributing to the startup project Elaview which is a B2B ad space marketplace project.
                      Here landlords can rent out their unused spaces(walls, windows etc) to ad agencies.
                      Built responsive UI components using React and Material-UI.
                      Collaborated with the team via Slack and managed code through GitHub.
                      Focused on reusable components and consistent user experience.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'GitHub'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
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
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <Code className="w-16 h-16 text-blue-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.github} target='_blank' className="flex items-center text-blue-400 hover:text-blue-300 text-sm">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a href={project.live} target='_blank' className="flex items-center text-blue-400 hover:text-blue-300 text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-800/50">
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
                  placeholder="Project inquiry, collaboration, etc."
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
                  placeholder="Tell me about your project or what you'd like to discuss..."
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
      </section>



      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/in/faraz-naqvi-a4731b274/" target='_black' className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 group">
                <Linkedin className="w-6 h-6 group-hover:text-blue-400" />
              </a>
              <a href="https://github.com/farazNaqvi729927" target='_black' className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 group">
                <Github className="w-6 h-6 group-hover:text-blue-400" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-center">
              © 2025 Faraz Naqvi. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

