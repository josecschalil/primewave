"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Globe,
  MessageSquare,
  Calendar,
  Clock,
  User,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Coffee,
  Code,
  Heart,
  Star,
  ExternalLink,
} from "lucide-react";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [animatedStats, setAnimatedStats] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typingText, setTypingText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const containerRef = useRef(null);

  // Contact information
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@yourname.dev",
      href: "mailto:hello@yourname.dev",
      description: "Send me an email anytime!",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      description: "Call me for urgent matters",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
      description: "Available for remote work",
    },
    {
      icon: Clock,
      label: "Timezone",
      value: "PST (UTC-8)",
      href: "#",
      description: "Usually respond within 24h",
    },
  ];

  // Social links
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/yourusername",
      color: "hover:text-gray-300 hover:bg-gray-700/50",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourname",
      color: "hover:text-blue-400 hover:bg-blue-500/10",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/yourusername",
      color: "hover:text-sky-400 hover:bg-sky-500/10",
    },
    {
      icon: Globe,
      label: "Website",
      href: "https://yourwebsite.com",
      color: "hover:text-emerald-400 hover:bg-emerald-500/10",
    },
  ];

  // Project types
  const projectTypes = [
    "Web Application",
    "Mobile App",
    "E-commerce",
    "API Development",
    "UI/UX Design",
    "Consultation",
    "Other",
  ];

  // Budget ranges
  const budgetRanges = [
    "Under $5k",
    "$5k - $10k",
    "$10k - $25k",
    "$25k - $50k",
    "$50k+",
    "Let&apos;s discuss",
  ];

  // Timeline options
  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible",
  ];

  // Response stats
  const responseStats = [
    {
      label: "Avg Response Time",
      value: 4,
      suffix: "h",
      icon: Clock,
      color: "emerald",
    },
    {
      label: "Projects Completed",
      value: 50,
      suffix: "+",
      icon: CheckCircle,
      color: "cyan",
    },
    {
      label: "Happy Clients",
      value: 15,
      suffix: "+",
      icon: Heart,
      color: "pink",
    },
    {
      label: "Coffee Consumed",
      value: 247,
      suffix: "☕",
      icon: Coffee,
      color: "yellow",
    },
  ];

  // Typing messages
  const typingMessages = [
    "Let's build something amazing together!",
    "I'm excited to hear about your project!",
    "Ready to turn your ideas into reality! ",
    "Let's create digital magic! ",
    "Your next great project starts here! ",
  ];

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
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

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + Math.cos(particle.angle) * particle.speed) % 100,
          y:
            (particle.y + Math.sin(particle.angle) * particle.speed * 0.5) %
            100,
          angle: particle.angle + 0.005,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate stats
  useEffect(() => {
    const animateStats = () => {
      responseStats.forEach((stat, index) => {
        setTimeout(() => {
          let current = 0;
          const increment = stat.value / 30;
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
          }, 50);
        }, index * 200);
      });
    };

    setTimeout(animateStats, 500);
  }, []);

  // Typing animation
  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;

    const typeMessage = () => {
      const currentMessage = typingMessages[currentMessageIndex];

      if (!isDeleting && charIndex < currentMessage.length) {
        setTypingText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeMessage, 100);
      } else if (isDeleting && charIndex > 0) {
        setTypingText(currentMessage.slice(0, charIndex - 1));
        charIndex--;
        setTimeout(typeMessage, 50);
      } else if (!isDeleting && charIndex === currentMessage.length) {
        setTimeout(() => {
          isDeleting = true;
          typeMessage();
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setCurrentMessageIndex((prev) => (prev + 1) % typingMessages.length);
        setTimeout(typeMessage, 500);
      }
    };

    typeMessage();
  }, []);

  // Mouse tracking
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => {
        setSubmitStatus(null);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          projectType: "",
          budget: "",
          timeline: "",
        });
      }, 3000);
    }, 2000);
  };

  const getColorClass = (color) => {
    const colors = {
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div
      className="relative min-h-screen bg-gray-900 py-20 overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
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
            "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-mono">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-white">Let&apos;s Work </span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          {/* Typing Animation */}
          <div className="max-w-3xl mx-auto h-16 flex items-center justify-center">
            <p className="text-xl text-gray-400 text-center">
              {typingText}
              <span className="animate-pulse text-emerald-400">|</span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {responseStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 text-center hover:border-emerald-500/30 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${getColorClass(
                    stat.color
                  )}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {animatedStats[stat.label] || 0}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Get in touch</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Ready to start your next project? I&apos;m here to help bring
                your ideas to life. Whether it&apos;s a simple website or a
                complex web application, let&apos;s discuss how we can work
                together to create something amazing.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-center space-x-4 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInLeft 0.6s ease-out forwards",
                    }}
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold group-hover:text-emerald-400 transition-colors duration-300">
                        {info.label}
                      </h4>
                      <p className="text-gray-300 font-medium">{info.value}</p>
                      <p className="text-gray-500 text-sm">
                        {info.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Current Status */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Current Status</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-sm font-medium">
                    Available
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-4" suppressHydrationWarning>
                Currently accepting new projects for Q2 2024. Local time:{" "}
                {currentTime.toLocaleTimeString()}
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8 space-y-6"
              style={{
                animation: "slideInRight 0.6s ease-out forwards",
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Send me a message
              </h3>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      focusedField === "name"
                        ? "border-emerald-500 ring-1 ring-emerald-500/50 bg-gray-700/80"
                        : "border-gray-600 focus:border-emerald-500/50"
                    }`}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-emerald-500 ring-1 ring-emerald-500/50 bg-gray-700/80"
                        : "border-gray-600 focus:border-emerald-500/50"
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Subject *</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    focusedField === "subject"
                      ? "border-emerald-500 ring-1 ring-emerald-500/50 bg-gray-700/80"
                      : "border-gray-600 focus:border-emerald-500/50"
                  }`}
                  placeholder="Whats this about?"
                />
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors duration-300"
                  >
                    <option value="">Select type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors duration-300"
                  >
                    <option value="">Select budget</option>
                    {budgetRanges.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 font-medium">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors duration-300"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message *</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                    focusedField === "message"
                      ? "border-emerald-500 ring-1 ring-emerald-500/50 bg-gray-700/80"
                      : "border-gray-600 focus:border-emerald-500/50"
                  }`}
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-emerald-400 animate-fadeIn">
                  <CheckCircle className="w-5 h-5" />
                  <span>
                    Message sent successfully! I&apos;ll get back to you soon.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 animate-fadeIn">
                  <AlertCircle className="w-5 h-5" />
                  <span>Please fill in all required fields.</span>
                </div>
              )}
            </div>

            {/* Floating Action Hint */}
            <div className="absolute -bottom-6 right-0 bg-gray-800/90 backdrop-blur-xl rounded-lg border border-emerald-500/20 px-4 py-2 text-sm text-emerald-400 animate-bounce">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Quick response guaranteed!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 space-y-6">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <Code className="w-5 h-5 text-emerald-400" />
            <span>Made with</span>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span>and lots of coffee</span>
            <Coffee className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-gray-500">
            "The best projects start with a simple conversation. Let&apos;s have
            that conversation."
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactMe;
