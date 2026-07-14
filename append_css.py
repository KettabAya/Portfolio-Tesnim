import os

css_path = 'src/index.css'

new_css = """
/* ==========================================================================
   GLOBAL RESPONSIVENESS PATCH
   ========================================================================== */

/* 1. Ultra-Wide Screens (1600px+) */
@media (min-width: 1600px) {
  .app-wrapper {
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    box-shadow: 0 0 50px rgba(0,0,0,0.5);
  }
}

/* 2. Laptops & Large Tablets (992px - 1200px) */
@media (max-width: 1200px) {
  .hero-wordmark {
    font-size: clamp(3rem, 7vw, 5rem);
  }
  .stats-banner-container {
    flex-wrap: wrap;
    justify-content: center;
  }
  .stat-banner-item {
    flex: 1 1 calc(50% - 20px);
    min-width: 250px;
  }
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .contact-details-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

/* 3. Portrait Tablets & Mobile Transition (768px - 991px) */
@media (max-width: 991px) {
  /* CV Document Layout */
  .cv-printable-body {
    padding: 30px;
  }
  .cv-print-sections-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .cv-print-sidebar {
    border-left: none;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-left: 0;
    padding-top: 20px;
  }

  /* Academic Timeline */
  .cv-tabs-container {
    flex-direction: column;
  }
  .cv-tabs-headers {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  .cv-tab-btn {
    white-space: nowrap;
    padding: 12px 20px;
  }

  /* HUD Modal */
  .project-modal-grid {
    grid-template-columns: 1fr;
    max-height: 70vh;
    overflow-y: auto;
  }
  .hud-decoder-wrapper {
    max-width: 95%;
  }
}

/* 4. Mobile Devices (Max 767px) */
@media (max-width: 767px) {
  /* Sidebar to Bottom Dock */
  .hud-sidebar-console {
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-right: none;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px 20px 0 0;
    background: rgba(10, 10, 18, 0.95);
    backdrop-filter: blur(15px);
    padding: 0 15px;
    z-index: 1000;
  }
  .sidebar-dock-link {
    width: 45px;
    height: 45px;
    margin: 0;
  }

  /* Adjust App Wrapper for Bottom Dock */
  .app-wrapper {
    margin-left: 0;
    padding-bottom: 80px; /* Space for bottom dock */
  }

  /* Hero Section tweaks */
  .hero-wordmark {
    font-size: clamp(2.5rem, 10vw, 4rem);
    line-height: 1.1;
  }
  .hero-section {
    padding: 100px 20px 60px;
  }
  .terminal-search-wrapper {
    width: 100%;
  }

  /* Stat banners */
  .stat-banner-item {
    flex: 1 1 100%;
  }

  /* Project Cards */
  .carousel-track {
    grid-template-columns: 1fr;
  }
  
  /* Skills Grid */
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  /* CV Document Modal */
  .cv-modal-card {
    width: 95%;
    max-height: 85vh;
  }
  .cv-print-header h1 {
    font-size: 24px;
  }
  .cv-print-contacts {
    flex-direction: column;
    gap: 8px;
  }
  .cv-print-contacts span:nth-child(even) {
    display: none; /* Hide the bullets between items */
  }

  /* Global Padding */
  .section-container {
    padding: 60px 20px;
  }
  
  /* Top Nav fixes */
  .top-nav {
    left: 0;
    width: 100%;
  }
  .top-nav-inner {
    padding: 0 15px;
  }
  .brand-sub {
    display: none; /* Save space on mobile top nav */
  }
}
"""

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(new_css)
print("CSS appended successfully.")
