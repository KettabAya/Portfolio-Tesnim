import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearch, 
  FaPlay, 
  FaPalette, 
  FaCode, 
  FaMobileAlt, 
  FaBrain, 
  FaTimes, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaGraduationCap, 
  FaLanguage, 
  FaHeart,
  FaMousePointer,
  FaRegUser,
  FaTerminal,
  FaDna,
  FaCube,
  FaRedo,
  FaFileDownload,
  FaPrint,
  FaCompass,
  FaHome,
  FaBriefcase,
  FaBookOpen,
  FaTools
} from 'react-icons/fa';
import profileImg from './assets/profile.jpg';

// Mockup images
import mockup1 from './assets/mockup1.png';
import mockup2 from './assets/mockup2.png';
import mockup3 from './assets/mockup3.png';
import mockup4 from './assets/mockup4.png';
import medeventaConf from './assets/medeventa_conf.png';
import medeventaWork from './assets/medeventa_work.png';
import medeventaDetail from './assets/medeventa_detail.png';
import medeventaReg from './assets/medeventa_reg.png';
import stageioLanding from './assets/stageio_landing.png';
import stageioDash1 from './assets/stageio_dash1.png';
import stageioDash2 from './assets/stageio_dash2.png';
import stageioDash3 from './assets/stageio_dash3.png';
import uniAppLanding from './assets/uni_app_landing.png';
import uniAppLogin from './assets/uni_app_login.png';
import uniAppSignup from './assets/uni_app_signup.png';
import uniAppPending from './assets/uni_app_pending.png';

const PROJECTS = [
  {
    id: 1,
    title: "MedEventa",
    category: "Academic Team Project",
    image: mockup1,
    images: [mockup1, medeventaConf, medeventaWork, medeventaDetail, medeventaReg],
    tools: ["React.js", "Node.js", "MySQL", "Figma"],
    description: "Built a comprehensive end-to-end conference management system structured around 8 distinct user roles, covering the full lifecycle from setup to closing.",
    details: [
      "Built a comprehensive end-to-end conference management system structured around 8 distinct user roles, covering the full lifecycle from setup to closing.",
      "Implemented participant registration & visitor inscription with date selection and access management.",
      "Developed abstract & thesis submission module allowing researchers to upload and submit academic work.",
      "Engineered a peer review & voting system enabling reviewers to evaluate, score, and provide structured feedback on submitted papers.",
      "Designed acceptance/rejection workflows and full conference scheduling tools for organizers.",
      "Applied role-based access control ensuring each stakeholder (visitor, reviewer, author, administrator) interacts only with their relevant features."
    ]
  },
  {
    id: 2,
    title: "University Management Application",
    category: "Academic Team Project",
    image: uniAppLanding,
    images: [uniAppLanding, uniAppLogin, uniAppSignup, uniAppPending],
    tools: ["Flutter", "PHP", "MySQL"],
    description: "Built a comprehensive mobile academic administration system covering student records, registration, and institutional reporting.",
    details: [
      "Developed a cross-platform mobile application using Flutter to centralize campus tools.",
      "Built secure authentication and user registration flows backed by a PHP and MySQL server.",
      "Implemented an administrative panel to track pending student registrations and manage waitlists.",
      "Designed an intuitive UI/UX ensuring accessibility for both students and university staff."
    ]
  },
  {
    id: 3,
    title: "Stage-Io",
    category: "Projet de Fin d'Études (PFE)",
    image: stageioLanding,
    images: [stageioLanding, stageioDash1, stageioDash2, stageioDash3],
    tools: ["React.js", "Django", "MySQL", "CSS"],
    description: "Designed and developed an end-to-end internship lifecycle solution managing the full journey from application to completion.",
    details: [
      "Engineered an end-to-end internship lifecycle solution managing the full journey from application to completion.",
      "Built a student application module allowing students to browse and apply for available internship positions.",
      "Implemented AI-driven matching workflows to recommend internship opportunities based on student verified skills.",
      "Integrated a legal tracking pipeline to monitor conventions, digital signatures, and multi-party approvals in real-time.",
      "Added evaluation & reporting tools enabling supervisors and universities to assess and document student performance.",
      "Bridged institution-industry coordination between academic requirements and company expectations."
    ]
  },
  {
    id: 4,
    title: "Electronic Signature Application",
    category: "Academic Personal Project",
    image: mockup3,
    images: [mockup3],
    tools: ["Python"],
    description: "Created a digital signature solution enabling users to sign, validate, and manage documents securely.",
    details: [
      "Created a digital signature solution enabling users to sign, validate, and manage documents securely.",
      "Reduced paperwork and accelerated approval workflows by digitizing document authentication processes."
    ]
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    category: "Academic Personal Project",
    image: mockup4,
    images: [mockup4],
    tools: ["React.js", "Figma", "Django"],
    description: "Designed and developed a full-featured online shop supporting product catalog management, shopping cart, order processing, and payment integration.",
    details: [
      "Designed and developed a full-featured online shop supporting product catalog management, shopping cart, order processing, and payment integration.",
      "Delivered a seamless buying experience for customers and an intuitive admin dashboard for store management."
    ]
  }
];

const SKILLS = {
  languages: [
    { name: "Python", glow: "#87F5F5" },
    { name: "C", glow: "#87F5F5" },
    { name: "C++", glow: "#87F5F5" },
    { name: "Java", glow: "#87F5F5" },
    { name: "JavaScript", glow: "#87F5F5" },
    { name: "TypeScript", glow: "#87F5F5" },
    { name: "Dart", glow: "#87F5F5" },
    { name: "PHP", glow: "#87F5F5" }
  ],
  development: [
    { name: "HTML5", glow: "#F042FF" },
    { name: "CSS3", glow: "#F042FF" },
    { name: "JavaScript", glow: "#F042FF" },
    { name: "React.js", glow: "#F042FF" },
    { name: "Django", glow: "#F042FF" },
    { name: "Flutter", glow: "#F042FF" },
    { name: "Dart", glow: "#F042FF" }
  ],
  design: [
    { name: "Django REST Framework", glow: "#7226FF" },
    { name: "React", glow: "#7226FF" },
    { name: "Flutter", glow: "#7226FF" },
    { name: "MATLAB", glow: "#7226FF" },
    { name: "Python (NumPy, Pandas, Matplotlib)", glow: "#7226FF" }
  ],
  utilities: [
    { name: "Machine Learning fundamentals", glow: "#FFE5F1" },
    { name: "Neural Networks (coursework)", glow: "#FFE5F1" },
    { name: "Data Analysis", glow: "#FFE5F1" },
    { name: "Git", glow: "#FFE5F1" },
    { name: "SQL", glow: "#FFE5F1" },
    { name: "Problem Solving", glow: "#FFE5F1" },
    { name: "OOP", glow: "#FFE5F1" },
    { name: "Agile basics", glow: "#FFE5F1" }
  ]
};

const EDUCATION = [
  {
    degree: "Master's Degree – Artificial Intelligence (In Progress)",
    period: "2025 – Present",
    school: "University of Constantine 2 – Abdelhamid Mehri",
    description: "Deepening expertise in machine learning, neural networks, computer vision, and intelligent systems design."
  },
  {
    degree: "Bachelor's Degree – Technology of Information (TI)",
    period: "2022 – 2025",
    school: "University of Constantine 2 – Abdelhamid Mehri",
    description: "Graduated 2025. Coursework: Algorithms & Data Structures, Databases, Computer Networks, Software Engineering, Operating Systems, Artificial Intelligence Fundamentals."
  },
  {
    degree: "Baccalaureate – Experimental Sciences (Bac Scientifique)",
    period: "2023",
    school: "Constantine, Algeria",
    description: "Graduated with honors, specializing in experimental scientific disciplines."
  }
];

const LANGUAGES = [
  { name: "Arabic", level: "Native", percent: 100, offset: 0 },
  { name: "French", level: "Proficient", percent: 85, offset: 50 },
  { name: "English", level: "Professional Working Proficiency", percent: 90, offset: 25 }
];

const INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Full-Stack Web Development",
  "Mobile Development",
  "Algorithms & Competitive Programming"
];

function App() {
  const heroRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const carouselRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [searchVal, setSearchVal] = useState("");
  const [currentProjIndex, setCurrentProjIndex] = useState(1);
  const [activeTab, setActiveTab] = useState("education");
  const [selectedProject, setSelectedProject] = useState(null); 
  const [selectedSkill, setSelectedSkill] = useState(null); 
  const [hudActiveLine, setHudActiveLine] = useState(0);
  const [showCvModal, setShowCvModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Parallax / Telemetry mouse variables
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [sysMemory, setSysMemory] = useState(42.8);
  const [activeSection, setActiveSection] = useState("hero");

  // Dynamic rotating professional roles
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["UI/UX Designer", "Full-Stack Developer", "Creative Engineer", "Canva Expert"];

  const handleDownloadPdf = () => {
    const element = document.getElementById('cv-printable-content');
    if (!element) return;
    const opt = {
      margin:       0,
      filename:     'Aya_Tesnim_Kettab_CV.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  useGSAP(() => {
    // Hero Parallax Effect
    gsap.to('.hero-wordmark', {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Staggered Stat Banners
    gsap.from('.stat-banner-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats-banner-container',
        start: 'top 85%'
      }
    });

    // Staggered Project Cards
    gsap.from('.project-card', {
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.carousel-track',
        start: 'top 80%'
      }
    });
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    });

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "designs", "academic", "skills", "contact"];
      const scrollPos = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas Interactive Neural Network Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = 65;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2.5 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(135, 245, 245, 0.4)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#87F5F5';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    // Capture dynamic cursor positions for canvas
    let targetX = null;
    let targetY = null;

    const handleMouse = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render lines connecting close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(114, 38, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node lines towards user cursor
        if (targetX !== null && targetY !== null) {
          const distCursor = Math.hypot(p1.x - targetX, p1.y - targetY);
          if (distCursor < 200) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(targetX, targetY);
            ctx.strokeStyle = `rgba(135, 245, 245, ${0.2 * (1 - distCursor / 200)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current || !cursorGlowRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cursorGlowRef.current.style.left = `${x}px`;
    cursorGlowRef.current.style.top = `${y}px`;
    cursorGlowRef.current.style.opacity = '1';

    // Normalize coordinates (-50 to 50) for Parallax
    const normX = Math.round(((x / rect.width) - 0.5) * 100);
    const normY = Math.round(((y / rect.height) - 0.5) * 100);
    setMouseCoords({ x: normX, y: normY });

    // Live fluctuating memory status
    setSysMemory((prev) => +(42.5 + Math.sin(x * y) * 2.5).toFixed(1));
  };

  const handleMouseLeave = () => {
    if (cursorGlowRef.current) cursorGlowRef.current.style.opacity = '0';
    setMouseCoords({ x: 0, y: 0 });
  };



  // Cycle lines on HUD display panel automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setHudActiveLine((l) => (l + 1) % (selectedProject?.details?.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedProject]);

  // Carousel scroll
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 370;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleCarouselScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = 370; // card width + gap
    const index = Math.round(scrollLeft / cardWidth) + 1;
    setCurrentProjIndex(Math.min(Math.max(index, 1), filteredProjects.length || 1));
  };

  // Filter projects by search value AND selected skill
  const filteredProjects = PROJECTS.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                          proj.category.toLowerCase().includes(searchVal.toLowerCase()) ||
                          proj.tools.some(t => t.toLowerCase().includes(searchVal.toLowerCase()));
    const matchesSkill = selectedSkill ? proj.tools.includes(selectedSkill) : true;
    return matchesSearch && matchesSkill;
  });

  return (
    <>
      {/* Interactive Neural Canvas Background */}
      <canvas className="neural-particles-canvas" ref={canvasRef}></canvas>

      {/* Blueprint Grid Parallax Layout */}
      <div 
        className="blueprint-lines-overlay"
        style={{ 
          transform: `translate(${mouseCoords.x * 0.1}px, ${mouseCoords.y * 0.1}px)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      >
        <div className="bp-line bp-horiz-1"></div>
        <div className="bp-line bp-horiz-2"></div>
        <div className="bp-line bp-vert-1"></div>
        <div className="bp-line bp-vert-2"></div>
        <div className="bp-circle bp-circle-1"></div>
        <div className="bp-circle bp-circle-2"></div>
        <div className="bp-square bp-square-1"></div>
      </div>

      {/* Drifting Background Glow Orbs */}
      <div className="ambient-glow-container">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      {/* Floating HUD Sidebar Nav - Sleek Vertical Dock */}
      <aside className="hud-sidebar-console second-design-dock">
        <a 
          href="#hero" 
          className={`sidebar-dock-link ${activeSection === 'hero' ? 'active-dock' : ''}`} 
          title="HOME"
        >
          <FaHome />
        </a>
        <a 
          href="#designs" 
          className={`sidebar-dock-link ${activeSection === 'designs' ? 'active-dock' : ''}`} 
          title="DESIGNS"
        >
          <FaBriefcase />
        </a>

        <a 
          href="#academic" 
          className={`sidebar-dock-link ${activeSection === 'academic' ? 'active-dock' : ''}`} 
          title="ACADEMIC BACKGROUND"
        >
          <FaBookOpen />
        </a>
        <a 
          href="#skills" 
          className={`sidebar-dock-link ${activeSection === 'skills' ? 'active-dock' : ''}`} 
          title="TECHNICAL SKILLS"
        >
          <FaTools />
        </a>
        <a 
          href="#contact" 
          className={`sidebar-dock-link ${activeSection === 'contact' ? 'active-dock' : ''}`} 
          title="CONTACT"
        >
          <FaEnvelope />
        </a>
      </aside>

      <div className="app-wrapper">
        {/* Sticky Top Nav */}
        <nav className="top-nav">
          <div className="top-nav-inner">
            <div className="nav-logo-box">
              <div className="nav-brand-logo">
                <img src={profileImg} alt="Aya avatar" className="nav-avatar-img" />
              </div>
              <div className="nav-brand-text">
                <span className="brand-main">Aya Tesnim Kettab</span>
                <span className="brand-sub">Computer Science Graduate // AI Specialist</span>
              </div>
            </div>


            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', position: 'relative' }}>
              {/* View Resume print triggers */}
              <button className="glass-button glass-element" onClick={() => setShowCvModal(true)}>
                View CV <FaFileDownload style={{ fontSize: '10px', marginLeft: '6px' }} />
              </button>
              <div style={{ position: 'relative' }}>
                <button className="follow-pill-button" onClick={() => window.open("https://linkedin.com/in/aya-tesnim-kettab-b61b31332", "_blank")}>
                  Follow
                </button>
                <FaMousePointer className="pointer-cursor-overlay" />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          id="hero"
          className="hero-section" 
          ref={heroRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cursor-glow-element" ref={cursorGlowRef}></div>

          <div className="hero-left">
            <div className="hero-studio-subtitle stagger-load stagger-load-1">
              <span>COMPUTER SCIENCE GRADUATE // AI & ML SPECIALIZATION</span>
            </div>
            
            <h1 className="hero-wordmark stagger-load stagger-load-1">
              Aya Tesnim <span className="wordmark-light">Kettab</span>
            </h1>

            {/* Retro Command-Line Terminal Search Console */}
            <div className="terminal-search-wrapper stagger-load stagger-load-2">
              <div className="terminal-header-bar">
                <span className="terminal-circle red"></span>
                <span className="terminal-circle yellow"></span>
                <span className="terminal-circle green"></span>
                <span className="terminal-title">aya_kettab@constantine: ~</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-output-line">
                  <span className="output-tag">[SYS]</span> Initializing profile sequence... <span className="text-green">Done.</span>
                </div>
                <div className="terminal-output-line">
                  <span className="output-tag">[ROLE]</span> <span className="text-cyan">{roles[roleIndex]}</span>
                </div>
                <div className="terminal-output-line">
                  <span className="output-tag">[STATUS]</span> <span className="text-magenta">Available for Projects</span>
                </div>
                <div className="terminal-output-line">
                  <span className="output-tag">[LOAD]</span> Sys Memory: <span className="text-yellow">{sysMemory}%</span>
                </div>
                
                <p className="terminal-bio-text">
                  "Motivated Computer Science graduate specializing in Artificial Intelligence, with a strong foundation in software engineering and a passion for building intelligent systems. Skilled across multiple programming languages and frameworks, with hands-on experience in web development, mobile development, and data-driven applications."
                </p>

                <div className="terminal-input-container">
                  <span className="terminal-prompt">guest@aya-kettab:~$ </span>
                  <input 
                    type="text" 
                    className="terminal-input" 
                    placeholder="search_projects --by-skills" 
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                  />
                  <span className="terminal-cursor"></span>
                </div>
              </div>
            </div>

            <div className="search-suggestions-row stagger-load stagger-load-5">
              <span className="suggestions-intro">Execute:</span>
              <button className="suggestion-pill sug-figma" onClick={() => setSearchVal("Figma")}><FaPalette style={{ marginRight: '6px' }} /> figma</button>
              <button className="suggestion-pill sug-react" onClick={() => setSearchVal("React")}><FaCode style={{ marginRight: '6px' }} /> react</button>
              <button className="suggestion-pill sug-mobile" onClick={() => setSearchVal("Mobile")}><FaCompass style={{ marginRight: '6px' }} /> mobile</button>
              <button className="suggestion-pill sug-django" onClick={() => setSearchVal("Django")}><FaTerminal style={{ marginRight: '6px' }} /> django</button>
            </div>
          </div>

          {/* Grayscale profile photo with cybernetic radar scanner glow */}
          <div className="hero-right stagger-load stagger-load-5">
            <div className="profile-photo-wrapper">
              <img src={profileImg} alt="Aya Tesnim Kettab" className="profile-photo" />
              <div className="profile-photo-overlay"></div>
              {/* Radar target scan details */}
              <div className="radar-sweep-scanner"></div>
              <div className="radar-crosshair"></div>
              <div className="radar-indicator-tag">SYS_LOC: CONSTANTINE, DZ</div>
            </div>
          </div>
        </section>

        {/* Dynamic CV Statistics HUD Banner */}
        <section className="stats-banner-container">
          <div className="stat-banner-item glass-element">
            <div className="stat-icon-wrapper purple"><FaGraduationCap /></div>
            <div className="stat-data">
              <span className="stat-val">Master's AI</span>
              <span className="stat-lbl">Constantine 2 University</span>
            </div>
          </div>
          <div className="stat-banner-item glass-element">
            <div className="stat-icon-wrapper cyan"><FaPalette /></div>
            <div className="stat-data">
              <span className="stat-val">UI/UX & Canva Expert</span>
              <span className="stat-lbl">Prototyping & Design Systems</span>
            </div>
          </div>
          <div className="stat-banner-item glass-element">
            <div className="stat-icon-wrapper pink"><FaCode /></div>
            <div className="stat-data">
              <span className="stat-val">7 Languages</span>
              <span className="stat-lbl">Python, C++, Java, Dart...</span>
            </div>
          </div>
        </section>

        {/* Dynamic CV Timelines Section */}
        <section className="section-container " data-aos="fade-up" id="academic">
          <div className="section-header">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <h2 className="section-title">Academic & Background</h2>
              <div className="academic-badge">
                <span className="pulsing-green-dot"></span>
                <span className="academic-badge-text">STATUS: MASTERS_AI</span>
              </div>
            </div>
          </div>

          <div className="cv-tabs-container">
            <div className="cv-tabs-headers">
              <button 
                className={`cv-tab-btn glass-element ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <FaGraduationCap /> Education
              </button>
              <button 
                className={`cv-tab-btn glass-element ${activeTab === 'languages' ? 'active' : ''}`}
                onClick={() => setActiveTab('languages')}
              >
                <FaLanguage /> Languages
              </button>
              <button 
                className={`cv-tab-btn glass-element ${activeTab === 'interests' ? 'active' : ''}`}
                onClick={() => setActiveTab('interests')}
              >
                <FaHeart /> Areas of Interest
              </button>
            </div>

            <div className="cv-tab-content glass-element">
              {activeTab === 'education' && (
                <div className="education-timeline">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-meta">
                        <span className="timeline-period">{edu.period}</span>
                      </div>
                      <div className="timeline-details">
                        <h3 className="timeline-degree">{edu.degree}</h3>
                        <span className="timeline-school">{edu.school}</span>
                        <p className="timeline-desc">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'languages' && (
                <div className="languages-grid-circles">
                  {LANGUAGES.map((lang, idx) => {
                    const radius = 38;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (lang.percent / 100) * circumference;

                    return (
                      <div key={idx} className="language-circle-card glass-element">
                        <div className="radial-progress-box">
                          <svg className="radial-svg" width="100" height="100">
                            {/* Track Circle */}
                            <circle className="radial-track" cx="50" cy="50" r={radius} />
                            {/* Dynamic Filled Indicator Circle */}
                            <circle 
                              className="radial-fill" 
                              cx="50" 
                              cy="50" 
                              r={radius}
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                            />
                          </svg>
                          <span className="radial-percent">{lang.percent}%</span>
                        </div>
                        <span className="lang-circle-name">{lang.name}</span>
                        <span className="lang-circle-level">{lang.level}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'interests' && (
                <div className="interests-grid">
                  {INTERESTS.map((interest, idx) => (
                    <div key={idx} className="interest-chip glass-element">
                      {interest}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* My Projects Carousel */}
        <section className="section-container " data-aos="fade-up" id="designs">
          <div className="section-header">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 className="section-title">My Projects</h2>
                {selectedSkill && (
                  <span className="skill-active-filter-desc">
                    Filtering projects using <b>{selectedSkill}</b> 
                    <button className="clear-filter-btn" onClick={() => setSelectedSkill(null)} title="Clear Filter">
                      <FaRedo style={{ fontSize: '10px' }} /> Reset
                    </button>
                  </span>
                )}
              </div>
              <div className="project-index-counter">
                <span className="current-index">0{currentProjIndex}</span>
                <span className="index-divider">/</span>
                <span className="total-index">0{filteredProjects.length}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="nav-arrow glass-element" onClick={() => scrollCarousel('left')} aria-label="Scroll Left">
                <FaChevronLeft />
              </button>
              <button className="nav-arrow glass-element" onClick={() => scrollCarousel('right')} aria-label="Scroll Right">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="carousel-outer">
            <div className="carousel-viewport" ref={carouselRef} onScroll={handleCarouselScroll}>
              <div className="carousel-track">
                {filteredProjects.map((proj, idx) => (
                  <div 
                    key={proj.id} 
                    className={`project-card glass-element ${selectedProject?.id === proj.id ? 'active-hud-target' : ''}`}
                    style={{ transitionDelay: `${idx * 0.08}s` }}
                    onClick={() => {
                      setSelectedProject(proj);
                      setActiveImageIndex(0);
                    }}
                  >
                    <div className="project-image-box">
                      <img src={proj.image} alt={proj.title} className="project-image" />
                    </div>
                    <div className="project-info">
                      <div className="project-meta">
                        <span className="project-title">{proj.title}</span>
                        <span className="project-category">{proj.category}</span>
                      </div>
                      <div className="project-link-btn">
                        <FaTerminal style={{ fontSize: '12px' }} />
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="no-projects-glow-alert glass-element">
                    No projects found utilizing skill: "{selectedSkill}". Click Reset above.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Carousel Toolbar */}
          <div className="carousel-toolbar">
            <div className="toolbar-icon glass-element" title="Figma UI/UX Studio">
              <FaPalette />
            </div>
            <div className="toolbar-icon glass-element" title="Mobile Architecture">
              <FaMobileAlt />
            </div>
            <div className="toolbar-icon glass-element" title="Engineering & Scripting">
              <FaCode />
            </div>
            <div className="toolbar-icon glass-element" title="Database Systems">
              <FaCube />
            </div>
          </div>
        </section>
        {/* Dynamic Interactive Skills Matrix */}
        <section className="section-container " data-aos="fade-up" id="skills">
          <div className="section-header">
            <h2 className="section-title">Technical Skills</h2>
          </div>

          <div className="skills-matrix">
            <div className="skill-category-card glass-element" data-aos="fade-up" data-aos-delay="0">
              <div className="skill-card-header">
                <div className="skill-icon-wrapper lang"><FaCode /></div>
                <div>
                  <span className="skill-meta-id">SYS_LANG_01</span>
                  <h3>Programming Languages</h3>
                </div>
              </div>
              <div className="skill-chips-container">
                {SKILLS.languages.map((skill, i) => (
                  <span 
                    key={i} 
                    className={`skill-chip ${selectedSkill === skill.name ? 'skill-active-glow' : ''}`}
                    style={{ '--hover-glow': skill.glow, border: `1px solid rgba(255, 255, 255, 0.08)` }}
                    onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                    title="Click to filter projects using this language"
                  >
                    <span className="skill-dot"></span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-category-card glass-element" data-aos="fade-up" data-aos-delay="80">
              <div className="skill-card-header">
                <div className="skill-icon-wrapper dev"><FaMobileAlt /></div>
                <div>
                  <span className="skill-meta-id">SYS_DEV_02</span>
                  <h3>Web & Mobile Dev</h3>
                </div>
              </div>
              <div className="skill-chips-container">
                {SKILLS.development.map((skill, i) => (
                  <span 
                    key={i} 
                    className={`skill-chip ${selectedSkill === skill.name ? 'skill-active-glow' : ''}`}
                    style={{ '--hover-glow': skill.glow, border: `1px solid rgba(255, 255, 255, 0.08)` }}
                    onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                    title="Click to filter projects using this framework"
                  >
                    <span className="skill-dot"></span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-category-card glass-element" data-aos="fade-up" data-aos-delay="160">
              <div className="skill-card-header">
                <div className="skill-icon-wrapper design"><FaPalette /></div>
                <div>
                  <span className="skill-meta-id">SYS_UIUX_03</span>
                  <h3>UI/UX & Prototyping</h3>
                </div>
              </div>
              <div className="skill-chips-container">
                {SKILLS.design.map((skill, i) => (
                  <span 
                    key={i} 
                    className={`skill-chip ${selectedSkill === skill.name ? 'skill-active-glow' : ''}`}
                    style={{ '--hover-glow': skill.glow, border: `1px solid rgba(255, 255, 255, 0.08)` }}
                    onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                    title="Click to filter projects using this design skill"
                  >
                    <span className="skill-dot"></span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-category-card glass-element" data-aos="fade-up" data-aos-delay="240">
              <div className="skill-card-header">
                <div className="skill-icon-wrapper method"><FaBrain /></div>
                <div>
                  <span className="skill-meta-id">SYS_AI_04</span>
                  <h3>Methodologies & UI/UX</h3>
                </div>
              </div>
              <div className="skill-chips-container">
                {SKILLS.utilities.map((skill, i) => (
                  <span 
                    key={i} 
                    className={`skill-chip ${selectedSkill === skill.name ? 'skill-active-glow' : ''}`}
                    style={{ '--hover-glow': skill.glow, border: `1px solid rgba(255, 255, 255, 0.08)` }}
                    onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                    title="Click to filter projects using this skill"
                  >
                    <span className="skill-dot"></span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Interactive Contact Card */}
        <section className="section-container " data-aos="fade-up" id="contact">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
          </div>
          
          <div className="contact-card glass-element " data-aos="fade-up">
            <div className="contact-details-grid">
              <a href="mailto:aya_tesnim.kettab@univ-constantine2.dz" className="contact-link-item glass-element">
                <FaEnvelope className="contact-icon" style={{ color: 'var(--accent-magenta)' }} />
                <div className="contact-meta">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">aya_tesnim.kettab@univ-constantine2.dz</span>
                </div>
              </a>

              <a href="tel:+213552445191" className="contact-link-item glass-element">
                <FaPhoneAlt className="contact-icon" style={{ color: 'var(--accent-cyan)' }} />
                <div className="contact-meta">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+213 552 445 191</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/aya-tesnim-kettab-b61b31332" target="_blank" rel="noreferrer" className="contact-link-item glass-element">
                <FaLinkedin className="contact-icon" style={{ color: 'var(--accent-purple)' }} />
                <div className="contact-meta">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">in/aya-tesnim-kettab</span>
                </div>
              </a>

              <a href="https://github.com/KettabAya" target="_blank" rel="noreferrer" className="contact-link-item glass-element">
                <FaGithub className="contact-icon" style={{ color: 'var(--accent-pink)' }} />
                <div className="contact-meta">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/KettabAya</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-glow-divider"></div>
          <div className="footer-bottom">
            <span className="footer-copyright">© AYA TESNIM KETTAB 2026</span>
            <span className="footer-credit">CREATIVE UI/UX & FULL-STACK SYSTEMS ENGINEER</span>
          </div>
        </footer>
      </div>

      {/* Cybernetic Digital CV Print Document Modal */}
      {showCvModal && (
        <div className="cv-modal-overlay" onClick={() => setShowCvModal(false)}>
          <button className="cv-overlay-close-btn" onClick={() => setShowCvModal(false)} aria-label="Close CV">
            <FaTimes />
          </button>
          <div className="cv-modal-card glass-element" onClick={(e) => e.stopPropagation()}>
            <div className="full-page-inner-container" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '40px 20px' }}>
              <div className="cv-modal-header">
              <div className="header-meta-left">
                <h2>Digital CV Document</h2>
                <span>Aya Tesnim Kettab // Master's Degree AI</span>
              </div>
              <div className="header-actions-right">
                <button className="cv-action-btn print" onClick={() => handleDownloadPdf()}>
                  <FaPrint /> Print / Save PDF
                </button>
                <button className="cv-action-btn close" onClick={() => setShowCvModal(false)}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="cv-printable-body">
              <div id="cv-printable-content">
              {/* CV Header */}
              <div className="cv-print-header">
                <h1>AYA TESNIM KETTAB</h1>
                <p className="cv-print-tagline">Computer Science Graduate | AI & Machine Learning Specialization</p>
                <div className="cv-print-contacts">
                  <span>+213 552 445 191</span>
                  <span>•</span>
                  <span>aya_tesnim.kettab@univ-constantine2.dz</span>
                  <span>•</span>
                  <span>linkedin.com/in/aya-tesnim-kettab-b61b31332</span>
                </div>
              </div>

              {/* CV Content Section split */}
              <div className="cv-print-sections-grid">
                <div className="cv-print-col-main">
                  <h3>Academic Projects</h3>
                  
                  <div className="cv-print-project-item">
                    <h4>MedEventa (Team Project)</h4>
                    <ul>
                      <li>Built a comprehensive end-to-end conference management system structured around 8 distinct user roles, covering the full lifecycle from setup to closing.</li>
                      <li>Implemented participant registration & visitor inscription with date selection and access management.</li>
                      <li>Developed abstract & thesis submission module allowing researchers to upload and submit academic work.</li>
                      <li>Engineered a peer review & voting system enabling reviewers to evaluate, score, and provide structured feedback on submitted papers.</li>
                      <li>Designed acceptance/rejection workflows and full conference scheduling tools for organizers.</li>
                      <li>Applied role-based access control ensuring each stakeholder (visitor, reviewer, author, administrator) interacts only with their relevant features.</li>
                    </ul>
                  </div>

                  <div className="cv-print-project-item">
                    <h4>University Management Application (Team Project)</h4>
                    <ul>
                      <li>Developed a cross-platform mobile application using Flutter to centralize campus tools.</li>
                      <li>Built secure authentication and user registration flows backed by a PHP and MySQL server.</li>
                      <li>Implemented an administrative panel to track pending student registrations and manage waitlists.</li>
                      <li>Designed an intuitive UI/UX ensuring accessibility for both students and university staff.</li>
                    </ul>
                  </div>

                  <div className="cv-print-project-item">
                    <h4>Stage-Io (Projet de Fin d'Études)</h4>
                    <ul>
                      <li>Engineered an end-to-end internship lifecycle solution managing the full journey from application to completion.</li>
                      <li>Built a student application module allowing students to browse and apply for available internship positions.</li>
                      <li>Implemented AI-driven matching workflows to recommend internship opportunities based on student verified skills.</li>
                      <li>Integrated a legal tracking pipeline to monitor conventions, digital signatures, and multi-party approvals in real-time.</li>
                      <li>Added evaluation & reporting tools enabling supervisors and universities to assess and document student performance.</li>
                      <li>Bridged institution-industry coordination between academic requirements and company expectations.</li>
                    </ul>
                  </div>

                  <div className="cv-print-project-item">
                    <h4>Electronic Signature Application (Personal Project)</h4>
                    <ul>
                      <li>Created a digital signature solution enabling users to sign, validate, and manage documents securely.</li>
                      <li>Reduced paperwork and accelerated approval workflows by digitizing document authentication processes.</li>
                    </ul>
                  </div>

                  <div className="cv-print-project-item">
                    <h4>E-Commerce Platform (Personal Project)</h4>
                    <ul>
                      <li>Designed and developed a full-featured online shop supporting product catalog management, shopping cart, order processing, and payment integration.</li>
                      <li>Delivered a seamless buying experience for customers and an intuitive admin dashboard for store management.</li>
                    </ul>
                  </div>
                </div>

                <div className="cv-print-col-side">
                  <h3>Profile</h3>
                  <p style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '14px', fontStyle: 'normal' }}>
                    Motivated Computer Science graduate specializing in Artificial Intelligence, with a strong foundation in software engineering and a passion for building intelligent systems. Skilled across multiple programming languages and frameworks, with hands-on experience in web development, mobile development, and data-driven applications. Currently pursuing a Master's degree in AI to deepen expertise in machine learning and intelligent systems design.
                  </p>

                  <h3>Education</h3>
                  <div className="cv-print-edu-item">
                    <h4>Master's Degree – Artificial Intelligence (In Progress)</h4>
                    <span>2025 – Present</span>
                    <p>University of Constantine 2 – Abdelhamid Mehri</p>
                  </div>
                  <div className="cv-print-edu-item">
                    <h4>Bachelor's Degree – Technology of Information (TI)</h4>
                    <span>2022 – 2025</span>
                    <p>University of Constantine 2 – Abdelhamid Mehri (Graduated 2025)</p>
                    <p style={{ fontSize: '10px', marginTop: '2px', color: '#666' }}>Coursework: Algorithms & Data Structures, Databases, Computer Networks, Software Engineering, Operating Systems, Artificial Intelligence Fundamentals</p>
                  </div>
                  <div className="cv-print-edu-item">
                    <h4>Baccalaureate – Experimental Sciences (Bac Scientifique)</h4>
                    <span>2023</span>
                    <p>Constantine, Algeria (Graduated 2023)</p>
                  </div>

                  <h3>Technical Skills</h3>
                  <div className="cv-print-skills-cat">
                    <strong>Languages:</strong> Python, C, C++, Java, JavaScript, TypeScript, Dart
                  </div>
                  <div className="cv-print-skills-cat">
                    <strong>Web/Mobile:</strong> HTML5, CSS3, JavaScript, React.js, Django, Flutter, Dart
                  </div>
                  <div className="cv-print-skills-cat">
                    <strong>Frameworks:</strong> Django REST Framework, React, Flutter
                  </div>
                  <div className="cv-print-skills-cat">
                    <strong>Scientific/AI:</strong> MATLAB, Python (NumPy, Pandas, Matplotlib), ML fundamentals, Neural Networks, Data Analysis
                  </div>
                  <div className="cv-print-skills-cat">
                    <strong>Other:</strong> Git, SQL, Problem Solving, OOP, Agile basics
                  </div>

                  <h3>Languages</h3>
                  <p>Arabic (Native), French (Proficient), English (Professional Working Proficiency)</p>

                  <h3>Areas of Interest</h3>
                  <p style={{ fontSize: '11px', lineHeight: '1.4' }}>Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, Full-Stack Web Development, Mobile Development, Algorithms & Competitive Programming</p>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* TRUE FULL PAGE PROJECT VIEW */}
      {selectedProject && (
        <div className="full-page-project-overlay">
          <div className="project-page-container">
            
            {/* Top Navigation */}
            <div className="project-page-nav">
              <button className="back-to-portfolio-btn glass-element" onClick={() => setSelectedProject(null)} aria-label="Back to Portfolio">
                <FaChevronLeft /> Back to Portfolio
              </button>
            </div>

            {/* Hero Section */}
            <div className="project-page-hero">
              <span className="project-page-category">{selectedProject.category}</span>
              <h1 className="project-page-title">{selectedProject.title}</h1>
              <div className="project-page-stack">
                {selectedProject.tools.map((tool, i) => (
                  <span key={i} className="hud-tech-pill" style={{ cursor: 'default' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Split Layout */}
            <div className="project-page-split">
              
              {/* Sticky Image Gallery */}
              <div className="project-gallery-wrapper">
                <div className="project-gallery-main">
                  <img 
                    src={selectedProject.images && selectedProject.images.length > 1 ? selectedProject.images[activeImageIndex] : selectedProject.image} 
                    alt={selectedProject.title} 
                    onClick={() => setIsLightboxOpen(true)}
                  />
                </div>
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="multi-image-slider" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <button className="slider-arrow prev" onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))} style={{ position: 'relative', left: 0, transform: 'none' }}>
                      <FaChevronLeft />
                    </button>
                    <div className="slider-dots" style={{ position: 'relative', bottom: 0, transform: 'none' }}>
                      {selectedProject.images.map((_, idx) => (
                        <span key={idx} className={`slider-dot ${idx === activeImageIndex ? 'active' : ''}`} onClick={() => setActiveImageIndex(idx)}></span>
                      ))}
                    </div>
                    <button className="slider-arrow next" onClick={() => setActiveImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))} style={{ position: 'relative', right: 0, transform: 'none' }}>
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </div>

              {/* Scrollable Content Details */}
              <div className="project-content-area">
                <div>
                  <div className="project-section-header">
                    <FaTerminal /> Overview
                  </div>
                  <p className="project-description-text">{selectedProject.description}</p>
                </div>

                {selectedProject.details && (
                  <div>
                    <div className="project-section-header">
                      <FaDna /> Key Accomplishments & Metrics
                    </div>
                    <div className="hud-accomplishments-timeline">
                      {selectedProject.details.map((detail, idx) => (
                        <div key={idx} className="hud-accomplishment-item">
                          <span className="hud-line-num">[{(idx + 1).toString().padStart(2, '0')}]</span>
                          <p className="hud-line-text" style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}>{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* System Diagnostic Log embedded at bottom */}
                <div className="hud-telemetry-box glass-element" style={{ marginTop: '20px' }}>
                  <div className="telemetry-window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="window-title">SYSTEM_DIAGNOSTIC_LOG</span>
                  </div>
                  <div className="telemetry-line">
                    <span className="telemetry-tag green">[SYS]</span>
                    <span className="telemetry-log">PRJ_0{selectedProject.id || 1} // ACTIVE_NODE</span>
                  </div>
                  <div className="telemetry-line">
                    <span className="telemetry-tag purple">[LOG]</span>
                    <span className="telemetry-log">COMPILATION: SUCCESSFUL</span>
                  </div>
                  <div className="telemetry-line">
                    <span className="telemetry-tag cyan">[SEC]</span>
                    <span className="telemetry-log">INTEGRITY: SECURE_HASH // VERIFIED</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Overlay */}
      {isLightboxOpen && selectedProject && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)} aria-label="Close image zoom">
            <FaTimes />
          </button>
          
          {selectedProject.images && selectedProject.images.length > 1 ? (
             <>
               <button 
                 className="lightbox-arrow prev" 
                 onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1)); }}
                 aria-label="Previous fullscreen image"
               >
                 <FaChevronLeft />
               </button>
               
               <img 
                 src={selectedProject.images[activeImageIndex]} 
                 alt="Enlarged screen visualization" 
                 onClick={(e) => e.stopPropagation()} 
               />
               
               <button 
                 className="lightbox-arrow next" 
                 onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1)); }}
                 aria-label="Next fullscreen image"
               >
                 <FaChevronRight />
               </button>
               
               <div className="lightbox-dots">
                 {selectedProject.images.map((_, idx) => (
                   <span 
                     key={idx} 
                     className={`lightbox-dot ${idx === activeImageIndex ? 'active' : ''}`}
                     onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                   ></span>
                 ))}
               </div>
             </>
          ) : (
             <img 
               src={selectedProject.image} 
               alt="Enlarged screen visualization" 
               onClick={(e) => e.stopPropagation()} 
             />
          )}
        </div>
      )}
    </>
  );
}

export default App;
