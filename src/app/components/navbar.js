"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Code,
  Terminal,
  Cpu,
  Zap,
  Github,
  Mail,
  User,
  FileText,
  Briefcase,
  Download,
  Play,
  ChevronDown,
  Coffee,
  Globe,
  Database,
} from "lucide-react";

const ProgrammerPortfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [codeLines, setCodeLines] = useState([]);
  const canvasRef = useRef(null);

  const texts = [
    "Full Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "UI/UX Designer",
    "Problem Solver",
  ];

  const codeSnippets = [
    "const developer = new Programmer();",
    "developer.setSkills(['React', 'Node.js', 'Python']);",
    "developer.compile(creativity, logic);",
    "while(learning) { skills++; }",
    "return innovation.build();",
  ];

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.3,
      angle: Math.random() * Math.PI * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + Math.cos(particle.angle) * particle.speed) % 100,
          y:
            (particle.y + Math.sin(particle.angle) * particle.speed * 0.5) %
            100,
          angle: particle.angle + 0.01,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (isTyping) {
      if (typedText.length < currentText.length) {
        const timer = setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }
    } else {
      if (typedText.length > 0) {
        const timer = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [typedText, isTyping, currentTextIndex]);
  useEffect(() => {
    const timers = [];
    let isMounted = true;

    const animate = (lineIndex = 0) => {
      if (!isMounted) return;

      if (lineIndex < codeSnippets.length) {
        const addLineTimer = setTimeout(() => {
          setCodeLines((prev) => [
            ...prev,
            { id: lineIndex, text: codeSnippets[lineIndex], opacity: 0 },
          ]);

          const fadeInTimer = setTimeout(() => {
            setCodeLines((prev) =>
              prev.map((line) =>
                line.id === lineIndex ? { ...line, opacity: 1 } : line
              )
            );
          }, 100);
          timers.push(fadeInTimer);

          animate(lineIndex + 1);
        }, 800);
        timers.push(addLineTimer);
      } else {
        const resetTimer = setTimeout(() => {
          setCodeLines([]);
          animate(0);
        }, 3000);
        timers.push(resetTimer);
      }
    };

    animate();

    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10B981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const navItems = [
    { name: "Home", href: "#home", icon: User },
    { name: "About", href: "#about", icon: FileText },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const socialLinks = [
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Terminal, href: "#codepen", label: "CodePen" },
    { icon: Cpu, href: "#linkedin", label: "LinkedIn" },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Briefcase },
    { number: "3+", label: "Years Experience", icon: Coffee },
    { number: "25+", label: "Technologies", icon: Database },
    { number: "15+", label: "Happy Clients", icon: Globe },
  ];

  return (
    <div
      className="relative min-h-screen bg-gray-900 overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Matrix Canvas Background - Changed z-index and removed overflow-hidden from parent */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
      />

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `linear-gradient(45deg, #10B981${Math.floor(
                particle.opacity * 255
              ).toString(16)}, #06B6D4${Math.floor(
                particle.opacity * 255
              ).toString(16)})`,
              animation: `pulse ${2 + particle.speed}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Mouse Glow Effect */}
      <div
        className="fixed pointer-events-none z-20 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <nav className={`relative z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                <div className="relative bg-gray-900 rounded-lg p-3 border border-emerald-500/30">
                  <Terminal className="w-8 h-8 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {"<Developer/>"}
                </div>
                <div className="text-xs text-gray-400 font-mono tracking-wider">
                  v2.0.1-beta
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative group px-6 py-3 rounded-lg transition-all duration-300 hover:bg-emerald-500/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />
                      <span className="text-gray-300 group-hover:text-white font-medium tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
                  </a>
                );
              })}
            </div>

            {/* Social Links & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-emerald-500/20">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-mono">
                    ONLINE
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <Cpu
                  className="w-4 h-4 text-emerald-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>

              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="relative group p-2 rounded-lg bg-gray-800/30 hover:bg-emerald-500/20 transition-all duration-300 border border-transparent hover:border-emerald-500/30"
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>

              <button className="relative group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-3 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex flex-nowrap items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="whitespace-nowrap">Hire Me</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative group p-2 rounded-lg bg-gray-800/50 hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 text-emerald-400 transform transition-all duration-300 ${
                    isOpen ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 text-emerald-400 transform transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-b border-emerald-500/20 transform transition-all duration-500 origin-top ${
            isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-emerald-500/10 transform ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 font-medium">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Greeting */}
            <div className="space-y-2">
              <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-mono">
                👋 Hello World!
              </div>
              <div className="text-gray-400 font-mono text-lg">
                console.log("Welcome to my portfolio");
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white">I&apos;m a</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {typedText}
                  <span className="animate-pulse text-emerald-400">|</span>
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Crafting digital experiences with clean code and innovative
                solutions. Passionate about turning complex problems into
                simple, beautiful designs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>View My Work</span>
                </span>
              </button>

              <button className="group relative bg-transparent border-2 border-emerald-500 text-emerald-400 px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-emerald-500/10">
                <span className="relative flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center space-y-2 group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Code Terminal */}
          <div className="relative">
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-xl border border-emerald-500/20 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900/80 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">
                    portfolio.js
                  </span>
                </div>
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm space-y-2 min-h-[400px]">
                <div className="text-gray-500">
                  {"// Welcome to my digital workspace"}
                </div>
                <div className="text-emerald-400">
                  <span className="text-purple-400">{"class"}</span>{" "}
                  {"Developer"} {"{"}
                </div>
                <div className="ml-4 text-cyan-400">
                  <span className="text-purple-400">{"constructor"}</span>(){" "}
                  {"{"}
                </div>
                <div className="ml-8 text-gray-300">
                  <span className="text-red-400">{"this"}</span>
                  {".name ="} <span className="text-yellow-400">Jose C S</span>;
                </div>
                <div className="ml-8 text-gray-300">
                  <span className="text-red-400">{"this"}</span>
                  {".title ="}{" "}
                  <span className="text-yellow-400">"{typedText}"</span>;
                </div>
                <div className="ml-8 text-gray-300">
                  <span className="text-red-400">{"this"}</span>
                  {".passion ="}{" "}
                  <span className="text-yellow-400">
                    {"Building Amazing Things"}
                  </span>
                  {" ;"}
                </div>
                <div className="ml-4 text-cyan-400">{"}"}</div>

                {/* Animated Code Lines */}
                <div className="space-y-2 pt-4">
                  {codeLines.map((line) => (
                    <div
                      key={line.id}
                      className="text-emerald-400 transition-opacity duration-500"
                      style={{ opacity: line.opacity }}
                    >
                      <span className="text-gray-500"> {"//"} </span>
                      {line.text}
                    </div>
                  ))}
                </div>

                <div className="text-emerald-400 pt-4">{"}"}</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-[-70] left-1/2 transform -translate-x-1/2 ">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-gray-400 text-sm font-mono">
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgrammerPortfolio;
