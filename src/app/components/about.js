"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Coffee,
  Clock,
  MapPin,
  Heart,
  Zap,
  Download,
  Mail,
  Calendar,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  Lightbulb,
} from "lucide-react";

const AboutMeSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [animatedStats, setAnimatedStats] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState([]);
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  // --- DATA (Consolidated) ---

  const quotes = [
    `&quot;Code is poetry written in logic.&quot;`,
    `&quot;Every bug is a learning opportunity in disguise.&quot;`,
    `&quot;Clean code is not written by following a set of rules. It&apos;s written by someone who cares.&quot;`,
    `&quot;The best error message is the one that never shows up.&quot;`,
    `&quot;Simplicity is the ultimate sophistication in programming.&quot;`,
  ];

  const skillsData = [
    { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
    { name: "React.js", level: 92, color: "from-cyan-400 to-cyan-600" },
    { name: "Node.js", level: 88, color: "from-green-400 to-green-600" },
    { name: "Python", level: 85, color: "from-blue-400 to-blue-600" },
    { name: "TypeScript", level: 90, color: "from-blue-500 to-blue-700" },
    { name: "MongoDB", level: 82, color: "from-green-500 to-green-700" },
    { name: "PostgreSQL", level: 78, color: "from-blue-600 to-blue-800" },
    { name: "AWS", level: 75, color: "from-orange-400 to-orange-600" },
    { name: "Docker", level: 80, color: "from-blue-400 to-blue-500" },
    { name: "Git", level: 88, color: "from-red-400 to-red-600" },
  ];

  const timeline = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Innovators Inc.",
      period: "2022 - Present",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting solutions for complex business requirements.",
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "TypeScript"],
      type: "work",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple client projects, focusing on performance optimization and user experience. Collaborated with cross-functional teams to deliver high-quality solutions.",
      technologies: ["JavaScript", "Python", "MongoDB", "React", "Express"],
      type: "work",
    },
    {
      id: 3,
      title: "Computer Science Degree",
      company: "University of Technology",
      period: "2016 - 2020",
      description:
        "Bachelor of Science in Computer Science with focus on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.",
      technologies: [
        "Java",
        "C++",
        "Data Structures",
        "Algorithms",
        "Database Design",
      ],
      type: "education",
    },
    {
      id: 4,
      title: "Junior Developer",
      company: "StartUp Ventures",
      period: "2019 - 2020",
      description:
        "First professional role developing web applications and learning industry best practices. Contributed to multiple successful product launches.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      type: "work",
    },
  ];

  const stats = [
    {
      label: "Years Experience",
      value: 4,
      suffix: "+",
      icon: Clock,
      color: "emerald",
    },
    {
      label: "Projects Completed",
      value: 50,
      suffix: "+",
      icon: Briefcase,
      color: "cyan",
    },
    {
      label: "Technologies Mastered",
      value: 25,
      suffix: "+",
      icon: Code,
      color: "blue",
    },
    {
      label: "Cups of Coffee",
      value: 1200,
      suffix: "+",
      icon: Coffee,
      color: "yellow",
    },
    {
      label: "GitHub Commits",
      value: 2500,
      suffix: "+",
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "Happy Clients",
      value: 15,
      suffix: "+",
      icon: Heart,
      color: "pink",
    },
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: User },
    { id: "skills", name: "Skills", icon: Code },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
  ];

  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023",
    },
    { name: "Google Cloud Professional", issuer: "Google Cloud", year: "2022" },
    { name: "MongoDB Developer", issuer: "MongoDB University", year: "2021" },
    { name: "React Advanced Patterns", issuer: "React Training", year: "2022" },
  ];

  const interests = [
    { icon: Code, label: "Clean Code", desc: "Writing maintainable solutions" },
    {
      icon: Lightbulb,
      label: "Innovation",
      desc: "Exploring new technologies",
    },
    {
      icon: Target,
      label: "Problem Solving",
      desc: "Finding elegant solutions",
    },
    {
      icon: Heart,
      label: "User Experience",
      desc: "Creating delightful interfaces",
    },
  ];

  // --- EFFECTS ---

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.3,
      angle: Math.random() * Math.PI * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + Math.cos(p.angle) * p.speed) % 100,
          y: (p.y + Math.sin(p.angle) * p.speed * 0.5) % 100,
          angle: p.angle + 0.005,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate stats on mount
    const animate = () => {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          let current = 0;
          const increment = stat.value / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              current = stat.value;
              clearInterval(timer);
            }
            setAnimatedStats((prev) => ({
              ...prev,
              [stat.label]: Math.floor(current),
            }));
          }, 30);
        }, index * 200);
      });
    };
    setTimeout(animate, 500);
  }, []);

  useEffect(() => {
    // Animate skills visibility
    if (activeTab === "skills") {
      skillsData.forEach((_, index) => {
        setTimeout(
          () => setVisibleSkills((prev) => [...prev, index]),
          index * 100
        );
      });
    } else {
      setVisibleSkills([]);
    }
  }, [activeTab]);

  useEffect(() => {
    // Animate timeline items
    if (activeTab === "experience" || activeTab === "education") {
      const itemsToAnimate = timeline.filter(
        (item) =>
          activeTab === (item.type === "work" ? "experience" : "education")
      );
      itemsToAnimate.forEach((_, index) => {
        setTimeout(
          () => setTimelineVisible((prev) => [...prev, index]),
          index * 200
        );
      });
    } else {
      setTimelineVisible([]);
    }
  }, [activeTab]);

  useEffect(() => {
    // Rotate quotes
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS & HELPERS ---

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const getColorClass = (color) =>
    ({
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    }[color] || "text-gray-400 bg-gray-500/10");

  // --- SUB-COMPONENTS ---

  const SkillBar = ({ skill, index, isVisible }) => (
    <div
      className={`space-y-3 transform transition-all duration-700 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-emerald-400 font-semibold">{skill.level}%</span>
      </div>
      <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 50 + 200}ms`,
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const TimelineItem = ({ item, isVisible }) => (
    <div
      className={`relative pl-8 pb-12 transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 to-cyan-500"></div>
      <div
        className={`absolute left-0 top-6 w-3 h-3 rounded-full transform -translate-x-1.5 shadow-lg ${
          item.type === "work" ? "bg-emerald-500" : "bg-cyan-500"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
            item.type === "work" ? "bg-emerald-500" : "bg-cyan-500"
          }`}
        ></div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 hover:border-emerald-500/30 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
          <div>
            <h4 className="text-lg font-bold text-white">{item.title}</h4>
            <p className="text-emerald-400 font-medium">{item.company}</p>
          </div>
          <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full shrink-0">
            {item.period}
          </span>
        </div>
        <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-md border border-emerald-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // --- RENDER ---

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gray-900 text-white py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, rgba(16, 185, 129, ${p.opacity}) 0%, transparent 80%)`,
              animation: `pulse ${4 + p.speed * 5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <div
        className="fixed pointer-events-none z-20 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "400px",
          height: "400px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-mono">
            <User className="w-4 h-4 inline mr-2" />
            About Me
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-white">Know More </span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="max-w-3xl mx-auto h-12 flex items-center justify-center">
            <p className="text-lg text-gray-400 italic transition-opacity duration-500 text-center">
              "{quotes[currentQuote]}"
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 text-center hover:border-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${getColorClass(
                    stat.color
                  )}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {animatedStats[stat.label] || 0}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation (Responsive) */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-2">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base ${
                      activeTab === tab.id
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[400px]">
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-4xl font-bold text-white">
                        YN
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-2xl font-bold text-white">
                        Your Name
                      </h3>
                      <p className="text-emerald-400 font-medium">
                        Senior Full Stack Developer
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Available for hire</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download CV</span>
                  </button>
                  <button className="flex-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border-emerald-500/30 hover:text-emerald-400 flex items-center justify-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>Contact Me</span>
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  Hello! I&apos;m a passionate developer
                </h3>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    With 4+ years in web development, I build robust, scalable
                    apps with modern tech. My passion is crafting elegant
                    solutions to complex problems.
                  </p>
                  <p>
                    I write clean code, stay updated on trends, and contribute
                    to open source. Let's connect and build something amazing
                    together.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interests.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="bg-gray-800/30 rounded-lg p-4 hover:bg-emerald-500/10 transition-colors duration-300"
                      >
                        <Icon className="w-6 h-6 text-emerald-400 mb-2" />
                        <h4 className="text-white font-semibold">
                          {item.label}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {skillsData.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isVisible={visibleSkills.includes(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="max-w-3xl mx-auto">
              {timeline
                .filter((item) => item.type === "work")
                .map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    isVisible={timelineVisible.includes(index)}
                  />
                ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-12">
                {timeline
                  .filter((item) => item.type === "education")
                  .map((item, index) => (
                    <TimelineItem
                      key={item.id}
                      item={item}
                      isVisible={timelineVisible.includes(index)}
                    />
                  ))}
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Award className="w-6 h-6 text-cyan-400" />
                      <h4 className="text-lg font-bold text-white">
                        {cert.name}
                      </h4>
                    </div>
                    <p className="text-gray-400">{cert.issuer}</p>
                    <p className="text-cyan-400 font-semibold">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
