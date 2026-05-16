"use client"

import { useEffect, useRef, useState } from "react"

export default function Portfolio() {
  const [time, setTime] = useState("")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const heroRef = useRef<HTMLElement>(null)

  // Digital clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("id-ID"))
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll animations with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px 0px -50px 0px",
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
        }
      })
    }, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) sectionObserver.observe(section)
    })

    // Staggered animation for cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const index = parseInt(card.dataset.index || "0")
            setTimeout(() => {
              card.classList.add("card-show")
            }, index * 150)
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach((card) => {
      if (card) cardObserver.observe(card)
    })

    return () => {
      sectionObserver.disconnect()
      cardObserver.disconnect()
    }
  }, [])

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
        heroRef.current.style.opacity = `${1 - scrollY / 700}`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const projects = [
    {
      title: "Desain Poster",
      description: "Project desain visual kreatif.",
      icon: "01",
    },
    {
      title: "Editing Foto",
      description: "Manipulasi dan editing gambar.",
      icon: "02",
    },
    {
      title: "Web Portfolio",
      description: "Website sederhana ini.",
      icon: "03",
    },
    {
      title: "Cerita Pendek",
      description: "Cerita tentang kisah saya.",
      icon: "04",
    },
  ]

  const skills = [
    { name: "Jaringan Komputer", level: 85 },
    { name: "Pemrograman", level: 70 },
    { name: "Desain Grafis", level: 80 },
    { name: "Microsoft Office", level: 90 },
  ]

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden relative">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="cyber-grid" />
      </div>

      {/* Mouse Glow Effect */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-10 transition-transform duration-100"
        style={{
          background: "radial-gradient(circle, rgba(0,255,213,0.08) 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
      />

      {/* Floating Particles */}
      <CyberParticles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto backdrop-blur-xl bg-black/40 border border-cyan-500/20 rounded-full px-8 py-3">
          <h2 className="text-xl font-bold tracking-wider">
            <span className="text-cyan-400">{"<"}</span>
            <span className="text-white">RASYA</span>
            <span className="text-cyan-400">{"/>"}</span>
          </h2>
          <nav className="flex gap-8">
            {["home", "about", "project"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative text-sm uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00ffd5]" />
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => {
          sectionsRef.current[0] = el
          heroRef.current = el
        }}
        className="section-animate relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20"
      >
        {/* Background Image with Cyber Effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1402908.png-Hl2jpQoWh3v0f0gkycgJ9l8Eh0cpGW.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 z-0 scanlines" />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5, 5, 8, 0.4) 0%, rgba(5, 5, 8, 0.7) 50%, rgba(5, 5, 8, 1) 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Glitch Clock */}
          <div className="relative inline-block mb-6">
            <div className="digital-clock text-5xl md:text-7xl font-mono font-bold text-cyan-400 tracking-wider glitch-text">
              {time}
            </div>
            <div className="absolute -inset-1 bg-cyan-400/20 blur-xl -z-10 animate-pulse" />
          </div>

          <div className="space-y-4">
            <p className="text-cyan-400/80 text-sm uppercase tracking-[0.3em] hero-subtitle">
              {"// WELCOME_TO_MY_WORLD"}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold hero-title">
              <span className="text-white">Halo, saya </span>
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                  Rasya
                </span>
                <span className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-2xl -z-10" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl hero-subtitle">
              Full-stack Developer & IT Enthusiast. Membangun pengalaman digital
              yang inovatif.
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <a href="#project">
              <button className="cyber-button group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-black">
                <span className="relative z-10">Lihat Karya</span>
                <div className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <div className="absolute inset-0 shadow-[0_0_30px_#00ffd5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </a>
            <a href="#about">
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold uppercase tracking-wider hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                Tentang Saya
              </button>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => {
          sectionsRef.current[1] = el
        }}
        className="section-animate relative min-h-screen px-6 md:px-12 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-cyan-400 font-mono">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Tentang Saya</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Bio */}
            <div className="space-y-6">
              <div className="about-item cyber-card p-6 border border-cyan-400/20 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  <h3 className="text-lg font-mono text-cyan-400">{"// BIO"}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Saya <span className="text-cyan-400 font-semibold">Erlangga Mahardika</span> atau
                  biasa dipanggil <span className="text-cyan-400 font-semibold">Rasya</span>. Memiliki
                  minat besar pada desain, administrasi, bidang IT, dan pemrograman. Terbiasa belajar
                  secara mandiri maupun bekerja dalam tim.
                </p>
              </div>

              <div className="about-item cyber-card p-6 border border-cyan-400/20 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <h3 className="text-lg font-mono text-purple-400">{"// EXPERIENCE"}</h3>
                </div>
                <div className="border-l-2 border-cyan-400/30 pl-4">
                  <h4 className="font-semibold text-white">Telkom Akses Singotoro</h4>
                  <p className="text-sm text-cyan-400/80 mb-2">Oktober 2024 - Juli 2025</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                      Administrasi koperasi & pengolahan data
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                      Microsoft Word & Excel
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                      Koordinasi tim & pelayanan internal
                    </li>
                  </ul>
                </div>
              </div>

              <div className="about-item cyber-card p-6 border border-cyan-400/20 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <h3 className="text-lg font-mono text-blue-400">{"// EDUCATION"}</h3>
                </div>
                <h4 className="font-semibold text-white">Pelita 1 Semarang</h4>
                <p className="text-sm text-gray-400">
                  Teknik Komputer dan Jaringan (TKJ) | 2024 - 2026
                </p>
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className="about-item">
              <div className="cyber-card p-6 border border-cyan-400/20 bg-black/40 backdrop-blur-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="text-lg font-mono text-green-400">{"// SKILLS"}</h3>
                </div>

                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-cyan-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full skill-bar"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-cyan-400/20">
                  <h4 className="text-sm font-mono text-gray-500 mb-4">{"// SOFT_SKILLS"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Komunikasi", "Kerja Tim", "Manajemen Waktu", "Kreativitas", "Problem Solving"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs border border-cyan-400/30 text-cyan-400/80 rounded-full hover:bg-cyan-400/10 transition-colors"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section
        id="project"
        ref={(el) => {
          sectionsRef.current[2] = el
        }}
        className="section-animate relative min-h-screen px-6 md:px-12 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-cyan-400 font-mono">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Project</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  cardsRef.current[index] = el as HTMLDivElement | null
                }}
                data-index={index}
                className="card-animate group relative p-8 border border-cyan-400/20 bg-black/40 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-500 hover:border-cyan-400/60"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50" />

                <div className="relative z-10">
                  <span className="text-5xl font-bold text-cyan-400/20 font-mono group-hover:text-cyan-400/40 transition-colors duration-300">
                    {project.icon}
                  </span>
                  <h3 className="text-2xl font-bold mt-4 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-cyan-400 text-sm font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>VIEW_PROJECT</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snake Pet Canvas */}
      <SnakePet />

      {/* Footer */}
      <footer className="relative z-20 py-8 px-6 border-t border-cyan-400/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 font-mono text-sm">
            <span className="text-cyan-400">{"<"}</span>
            RASYA
            <span className="text-cyan-400">{"/>"}</span> © 2026
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rasya-erlangga-mahardika-97868a327"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        /* Cyber Grid Background */
        .cyber-grid {
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(0, 255, 213, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 213, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
          }
          100% {
            transform: perspective(500px) rotateX(60deg) translateY(50px);
          }
        }

        /* Scanlines Effect */
        .scanlines::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }

        /* Glitch Text Effect */
        .glitch-text {
          text-shadow: 0 0 10px rgba(0, 255, 213, 0.8), 0 0 20px rgba(0, 255, 213, 0.6),
            0 0 40px rgba(0, 255, 213, 0.4);
        }

        /* Gradient Animation */
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
          100% {
            background-position: 0% center;
          }
        }

        /* Section animations */
        .section-animate {
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .section-animate.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero specific animations */
        .hero-title {
          animation: glitchIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .hero-subtitle {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        .digital-clock {
          animation: flicker 0.1s ease-in-out infinite alternate;
        }

        @keyframes glitchIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            filter: blur(10px);
          }
          50% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes flicker {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.97;
          }
        }

        /* About section item animations */
        .about-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .show .about-item:nth-child(1) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.1s;
        }

        .show .about-item:nth-child(2) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        .show .about-item:nth-child(3) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.3s;
        }

        /* Skill Bar Animation */
        .skill-bar {
          animation: skillLoad 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: left;
          transform: scaleX(0);
        }

        .show .skill-bar {
          transform: scaleX(1);
        }

        @keyframes skillLoad {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        /* Card animations */
        .card-animate {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .card-animate.card-show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card-animate:hover {
          box-shadow: 0 0 40px rgba(0, 255, 213, 0.15), inset 0 0 40px rgba(0, 255, 213, 0.03);
        }

        /* Cyber Card Hover */
        .cyber-card {
          transition: all 0.3s ease;
        }

        .cyber-card:hover {
          box-shadow: 0 0 30px rgba(0, 255, 213, 0.1);
          border-color: rgba(0, 255, 213, 0.4);
        }
      `}</style>
    </div>
  )
}

// Cyber Particles Component
function CyberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] =
      []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(0, 255, 213, ${p.alpha})`
        ctx!.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 150) {
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = `rgba(0, 255, 213, ${0.1 * (1 - dist / 150)})`
            ctx!.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

// Snake Pet Component
function SnakePet() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snake: { x: number; y: number }[] = []
    const length = 30

    for (let i = 0; i < length; i++) {
      snake.push({ x: 300, y: 300 })
    }

    let angle = Math.random() * Math.PI * 2
    let hue = 180

    function update() {
      const head = snake[0]
      angle += (Math.random() - 0.5) * 0.15
      const speed = 2.5

      const newHead = {
        x: head.x + Math.cos(angle) * speed,
        y: head.y + Math.sin(angle) * speed,
      }

      if (newHead.x < 50 || newHead.x > canvas!.width - 50) {
        angle = Math.PI - angle
      }
      if (newHead.y < 50 || newHead.y > canvas!.height - 50) {
        angle = -angle
      }

      snake.unshift(newHead)
      snake.pop()

      hue = (hue + 0.5) % 360
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      // Draw glow trail
      snake.forEach((p, i) => {
        if (i % 3 === 0) {
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, 15 - i * 0.3, 0, Math.PI * 2)
          ctx!.fillStyle = `hsla(${hue + i * 2}, 100%, 50%, ${0.05 - i * 0.001})`
          ctx!.fill()
        }
      })

      // Draw snake body
      snake.forEach((p, i) => {
        ctx!.beginPath()
        const size = 8 - i * 0.2
        ctx!.arc(p.x, p.y, Math.max(size, 1), 0, Math.PI * 2)

        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
        gradient.addColorStop(0, `hsla(${hue + i * 3}, 100%, 70%, ${1 - i * 0.025})`)
        gradient.addColorStop(1, `hsla(${hue + i * 3}, 100%, 50%, ${0.8 - i * 0.025})`)

        ctx!.fillStyle = gradient
        ctx!.fill()
      })

      // Draw head glow
      const head = snake[0]
      ctx!.beginPath()
      ctx!.arc(head.x, head.y, 12, 0, Math.PI * 2)
      ctx!.fillStyle = `hsla(${hue}, 100%, 50%, 0.3)`
      ctx!.fill()
    }

    let animationId: number

    function loop() {
      update()
      draw()
      animationId = requestAnimationFrame(loop)
    }

    loop()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  )
}
