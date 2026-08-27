import React, { useState } from 'react';
import { 
  IconHome,
  IconCalendar, 
  IconClock, 
  IconHelpCircle, 
  IconUser, 
  IconShield, 
  IconImage, 
  IconX 
} from './Icons';

export function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: IconHome },
    { id: 'events', label: 'Events', icon: IconCalendar },
    { id: 'schedule', label: 'Schedule', icon: IconClock },
    { id: 'faq', label: 'FAQ', icon: IconHelpCircle },
    { id: 'contacts', label: 'Contacts', icon: IconUser },
    { id: 'rules', label: 'Rules', icon: IconShield },
    { id: 'gallery', label: 'Gallery', icon: IconImage },
  ];

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Link */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
          className="brand-link"
        >
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
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="nav-actions">
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
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
