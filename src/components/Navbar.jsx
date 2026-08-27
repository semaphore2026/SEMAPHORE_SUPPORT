import React, { useState, useEffect } from 'react';
import { 
  IconBell, 
  IconCalendar, 
  IconClock, 
  IconHelpCircle, 
  IconUser, 
  IconShield, 
  IconImage, 
  IconTicket, 
  IconPhone, 
  IconX 
} from './Icons';

export function Navbar({ activeSection, onNavigate, onOpenTicketModal, onOpenEmergencyModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'events', label: 'Events', icon: IconCalendar },
    { id: 'schedule', label: 'Schedule', icon: IconClock },
    { id: 'faq', label: 'FAQ', icon: IconHelpCircle },
    { id: 'contacts', label: 'Contacts', icon: IconUser },
    { id: 'rules', label: 'Rules', icon: IconShield },
    { id: 'gallery', label: 'Gallery', icon: IconImage },
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#top" onClick={(e) => { e.preventDefault(); handleNavClick('top'); }} className="brand-link">
          <div className="brand-badge">S</div>
          <div className="brand-text">
            <span className="brand-title">SEMAPHORE 2K26</span>
            <span className="brand-subtitle">MCA - NMAMIT Support Portal</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links-desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-btn ${activeSection === item.id ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions (Emergency + Support Ticket + Mobile Toggle) */}
        <div className="nav-actions">
          <a
            href="tel:+919845500911"
            className="btn btn-danger btn-sm"
            title="Emergency Medical Hotline"
          >
            <IconPhone size={15} />
            <span className="hide-mobile">Emergency</span>
          </a>

          <button
            onClick={onOpenTicketModal}
            className="btn btn-primary btn-sm"
          >
            <IconTicket size={15} />
            <span>Helpdesk</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <IconX size={20} /> : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <a href="tel:+919845500911" className="btn btn-danger" style={{ flex: 1 }}>
            <IconPhone size={16} />
            <span>Call Emergency</span>
          </a>
          <button onClick={() => { setMobileMenuOpen(false); onOpenTicketModal(); }} className="btn btn-primary" style={{ flex: 1 }}>
            <IconTicket size={16} />
            <span>New Ticket</span>
          </button>
        </div>
      </div>
    </header>
  );
}
