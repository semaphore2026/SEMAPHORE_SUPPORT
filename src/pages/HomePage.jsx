import React from 'react';
import { 
  IconCalendar, 
  IconClock, 
  IconUser, 
  IconShield, 
  IconHelpCircle, 
  IconImage, 
  IconMapPin, 
  IconAward, 
  IconPhone, 
  IconSearch, 
  IconChevronRight 
} from '../components/Icons';

export function HomePage({ onNavigate, globalSearch, setGlobalSearch, eventsCount = 8, scheduleCount = 19 }) {
  const portalSections = [
    {
      id: 'events',
      title: 'Events & Heads',
      subtitle: `${eventsCount} Technical & Non-Technical competitions`,
      description: 'Find event locations, exact round timings, prize pools, and direct head coordinator hotlines.',
      icon: IconCalendar,
      color: '#2563eb',
      badge: 'Locations & Timings'
    },
    {
      id: 'schedule',
      title: 'Festival Schedule',
      subtitle: `${scheduleCount} Scheduled time slots`,
      description: 'Day 1 & Day 2 timeline with exact calendar dates, slot timings, and assigned venues.',
      icon: IconClock,
      color: '#059669',
      badge: 'Day 1 & Day 2'
    },
    {
      id: 'contacts',
      title: 'Main Contacts',
      subtitle: 'Faculty & Student Coordinators',
      description: 'Direct call and WhatsApp contacts for Conveners, Technical Leads, Registration & Hospitality.',
      icon: IconUser,
      color: '#7c3aed',
      badge: 'Direct Phone & WA'
    },
    {
      id: 'rules',
      title: 'General Rules',
      subtitle: 'Fest Code of Conduct',
      description: 'Official student eligibility, ID card regulations, reporting time, fair play, and scoring points.',
      icon: IconShield,
      color: '#d97706',
      badge: 'Guidelines'
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Help & Self Service',
      description: 'Quick answers regarding registration documents, WiFi passwords, food coupons, and stay.',
      icon: IconHelpCircle,
      color: '#0284c7',
      badge: 'Instant Answers'
    },
    {
      id: 'gallery',
      title: 'Moments Gallery',
      subtitle: 'Fest Highlights',
      description: 'Photos from the 24H hackathon, coding arenas, esports tournaments, and prize distributions.',
      icon: IconImage,
      color: '#e11d48',
      badge: 'Photo Grid'
    }
  ];

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="container hero-content">
          <div className="hero-pill">
            <span className="pulse-dot"></span>
            <span>SEMAPHORE 2K26 • HOSTED BY MCA - NMAMIT</span>
          </div>

          <h1 className="hero-title">
            SEMAPHORE 2K26 <span>Support & Event Portal</span>
          </h1>

          <p className="hero-description">
            Your centralized portal for event details with locations and coordinator heads, day-wise schedules with venues, general rules, FAQ, contacts, and photo gallery.
          </p>

          {/* Quick Search */}
          <div className="hero-search-box">
            <IconSearch size={20} className="hero-search-icon" />
            <input
              type="text"
              placeholder="Search any event, coordinator, venue (e.g. Turing Lab, Hackathon, Rahul)..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="hero-search-input"
            />
          </div>

          {/* Fast Navigation Buttons */}
          <div className="hero-quick-actions">
            <button onClick={() => onNavigate('events')} className="btn btn-primary">
              <IconCalendar size={16} />
              <span>Explore Events</span>
            </button>
            <button onClick={() => onNavigate('schedule')} className="btn btn-secondary">
              <IconClock size={16} />
              <span>View Schedule</span>
            </button>
            <button onClick={() => onNavigate('contacts')} className="btn btn-secondary">
              <IconPhone size={16} />
              <span>Contact Coordinators</span>
            </button>
          </div>

          {/* Stats Summary */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <div className="stat-value">{eventsCount}</div>
              <div className="stat-label">Competitions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">2 Days</div>
              <div className="stat-label">Oct 16 & 17, 2026</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₹ 1.75L+</div>
              <div className="stat-label">Total Prize Pool</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">NMAMIT</div>
              <div className="stat-label">Nitte Campus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Directory Navigation Grid */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-head">
            <div className="section-tag">
              <IconCalendar size={15} />
              <span>Portal Navigation</span>
            </div>
            <h2>Browse Support & Event Sections</h2>
            <p>Select any section below to view detailed information, schedules, rules, or contact details.</p>
          </div>

          <div className="portal-grid">
            {portalSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div 
                  key={sec.id} 
                  className="portal-nav-card"
                  onClick={() => onNavigate(sec.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate(sec.id); }}
                >
                  <div className="portal-nav-card-top">
                    <div className="portal-nav-icon" style={{ backgroundColor: `${sec.color}15`, color: sec.color }}>
                      <Icon size={22} />
                    </div>
                    <span className="badge badge-upcoming" style={{ fontSize: '0.7rem' }}>
                      {sec.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="portal-nav-title">{sec.title}</h3>
                    <div className="portal-nav-subtitle">{sec.subtitle}</div>
                    <p className="portal-nav-desc">{sec.description}</p>
                  </div>

                  <div className="portal-nav-action" style={{ color: sec.color }}>
                    <span>Open {sec.title.split(' ')[0]}</span>
                    <IconChevronRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
