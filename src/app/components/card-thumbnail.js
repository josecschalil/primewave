"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Github,
  Code,
  Zap,
  Star,
  Calendar,
  Users,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  X,
} from "lucide-react";

const ProjectsShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // FIX: Use a ref for the glow element to avoid re-renders on mouse move
  const glowRef = useRef(null);

  // Sample projects data - replace with your actual projects
  const sampleProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      thumbnail:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      githubUrl: "https://github.com/username/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      stars: 42,
      status: "completed",
      date: "2024-01-15",
      featured: true,
      collaborators: 3,
      views: 1240,
    },
    {
      id: 2,
      title: "AI Chat Application",
      description:
        "Real-time chat application with AI integration using OpenAI API. Features include smart responses, chat history, and user management.",
      thumbnail:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      category: "ai",
      technologies: ["React", "WebSocket", "OpenAI", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/username/ai-chat",
      liveUrl: "https://ai-chat-demo.com",
      stars: 89,
      status: "completed",
      date: "2024-02-20",
      featured: true,
      collaborators: 1,
      views: 2150,
    },
    {
      id: 3,
      title: "Task Management Dashboard",
      description:
        "Modern project management tool with drag-and-drop functionality, real-time updates, and team collaboration features.",
      thumbnail:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      category: "frontend",
      technologies: ["Vue.js", "Vuetify", "Firebase", "Chart.js", "PWA"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskflow-demo.com",
      stars: 156,
      status: "completed",
      date: "2023-11-10",
      featured: false,
      collaborators: 2,
      views: 3420,
    },
    {
      id: 4,
      title: "Crypto Trading Bot",
      description:
        "Automated cryptocurrency trading bot with machine learning predictions and risk management algorithms.",
      thumbnail:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      category: "backend",
      technologies: ["Python", "TensorFlow", "REST API", "SQLite", "Pandas"],
      githubUrl: "https://github.com/username/crypto-bot",
      liveUrl: null,
      stars: 234,
      status: "development",
      date: "2024-03-01",
      featured: true,
      collaborators: 1,
      views: 5670,
    },
    {
      id: 5,
      title: "Mobile Fitness App",
      description:
        "Cross-platform fitness tracking app with workout plans, progress tracking, and social features built with React Native.",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      category: "mobile",
      technologies: ["React Native", "Redux", "Firebase", "Expo", "TypeScript"],
      githubUrl: "https://github.com/username/fitness-app",
      liveUrl: "https://play.google.com/store/apps/details?id=com.fitnessapp",
      stars: 67,
      status: "completed",
      date: "2023-09-15",
      featured: false,
      collaborators: 4,
      views: 1890,
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      description:
        "Decentralized voting platform using smart contracts on Ethereum. Ensures transparency and security in digital elections.",
      thumbnail:
        "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=600&h=400&fit=crop",
      category: "blockchain",
      technologies: ["Solidity", "Web3.js", "React", "Hardhat", "IPFS"],
      githubUrl: "https://github.com/username/blockchain-voting",
      liveUrl: "https://vote-chain-demo.com",
      stars: 189,
      status: "completed",
      date: "2024-01-30",
      featured: true,
      collaborators: 2,
      views: 4320,
    },
  ];

  const categories = [
    { id: "all", name: "All Projects", count: sampleProjects.length },
    {
      id: "fullstack",
      name: "Full Stack",
      count: sampleProjects.filter((p) => p.category === "fullstack").length,
    },
    {
      id: "frontend",
      name: "Frontend",
      count: sampleProjects.filter((p) => p.category === "frontend").length,
    },
    {
      id: "backend",
      name: "Backend",
      count: sampleProjects.filter((p) => p.category === "backend").length,
    },
    {
      id: "mobile",
      name: "Mobile",
      count: sampleProjects.filter((p) => p.category === "mobile").length,
    },
    {
      id: "ai",
      name: "AI/ML",
      count: sampleProjects.filter((p) => p.category === "ai").length,
    },
    {
      id: "blockchain",
      name: "Blockchain",
      count: sampleProjects.filter((p) => p.category === "blockchain").length,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm, projects]);

  // FIX: This function now directly manipulates the DOM via the ref,
  // preventing performance-killing re-renders on every mouse movement.
  const handleMouseMove = (e) => {
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "development":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "planning":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getTechColor = (tech) => {
    const colors = {
      React: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "Node.js": "bg-green-500/20 text-green-400 border-green-500/30",
      Python: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Vue.js": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      MongoDB: "bg-green-600/20 text-green-400 border-green-600/30",
      PostgreSQL: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      TypeScript: "bg-blue-400/20 text-blue-300 border-blue-400/30",
      Solidity: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return colors[tech] || colors.default;
  };

  const ProjectCard = ({ project, index }) => (
    <div
      className="group relative bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      {project.featured && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Star className="w-3 h-3 fill-current" />
          <span>Featured</span>
        </div>
      )}

      <div
        className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
          project.status
        )}`}
      >
        {project.status === "development"
          ? "In Progress"
          : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
      </div>

      <div className="relative overflow-hidden h-48">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-300">
          {project.liveUrl && (
            <button
              onClick={() => window.open(project.liveUrl, "_blank")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => window.open(project.githubUrl, "_blank")}
            className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Github className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSelectedProject(project)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 rounded-md text-xs font-medium border ${getTechColor(
                tech
              )} transition-all duration-300 hover:scale-105`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-600/20 text-gray-400 border border-gray-600/30">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{project.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{project.collaborators}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );

  return (
    <div
      className="relative min-h-screen bg-gray-900 py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* FIX: This element is now controlled by a ref, not state */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-10 transition-opacity duration-300"
        style={{
          // Start the glow off-screen
          left: "-9999px",
          top: "-9999px",
          width: "400px",
          height: "400px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-mono">
            <Code className="w-4 h-4 inline mr-2" />
            My Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my latest work and side projects. Each project represents a
            unique challenge solved with modern technologies and creative
            solutions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-gray-800/50 text-gray-400 border-gray-700/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-700 rounded w-18"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or category filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {!isLoading && (
          <div className="text-center mt-12">
            <p className="text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${getTechColor(
                      tech
                    )}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>{selectedProject.stars} stars</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>{selectedProject.views} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{selectedProject.collaborators} collaborators</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() =>
                      window.open(selectedProject.githubUrl, "_blank")
                    }
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Github className="w-5 h-5" />
                    <span>Source</span>
                  </button>
                  {selectedProject.liveUrl && (
                    <button
                      onClick={() =>
                        window.open(selectedProject.liveUrl, "_blank")
                      }
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectsShowcase;
