import React from 'react';
import { 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconClock, 
  IconShield, 
  IconChevronUp 
} from './Icons';

export function Footer({ onNavigate, onOpenTicketModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <div className="brand-badge" style={{ width: '32px', height: '32px', fontSize: '0.95rem' }}>S</div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>SEMAPHORE 2026</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              The official centralized event support, schedule, rules, and participant assistance portal for SEMAPHORE 2026. Available 24/7 during festival days.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={onOpenTicketModal} className="btn btn-primary btn-sm">
                Submit Support Query
              </button>
              <a href="tel:+919845500911" className="btn btn-danger btn-sm">
                Emergency Call
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Access</h4>
            <ul className="footer-links">
              <li><a href="#events" onClick={(e) => { e.preventDefault(); onNavigate('events'); }}>Event Directory & Heads</a></li>
              <li><a href="#schedule" onClick={(e) => { e.preventDefault(); onNavigate('schedule'); }}>Day 1 & 2 Schedules</a></li>
              <li><a href="#contacts" onClick={(e) => { e.preventDefault(); onNavigate('contacts'); }}>Coordinator Contacts</a></li>
              <li><a href="#rules" onClick={(e) => { e.preventDefault(); onNavigate('rules'); }}>General Rules & Conduct</a></li>
              <li><a href="#gallery" onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }}>Photo Gallery</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); onNavigate('faq'); }}>Helpdesk FAQs</a></li>
            </ul>
          </div>

          {/* Col 3: Key Venues */}
          <div className="footer-col">
            <h4>Campus Venues</h4>
            <ul className="footer-links" style={{ fontSize: '0.82rem' }}>
              <li><strong>Main Auditorium:</strong> Sir M.V. Central Block</li>
              <li><strong>Turing & Newton Labs:</strong> 3rd Floor CS Block</li>
              <li><strong>Ada Lovelace Lab:</strong> 2nd Floor IT Wing</li>
              <li><strong>Esports Arena:</strong> SAC 1st Floor</li>
              <li><strong>Food Court:</strong> Ground Floor Dining Hall</li>
              <li><strong>Central Registration:</strong> Foyer Counters 1-6</li>
            </ul>
          </div>

          {/* Col 4: Hotlines */}
          <div className="footer-col">
            <h4>24x7 Hotlines</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>Medical & Ambulance:</span>
                <div><a href="tel:+919845500911" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>+91 98455 00911</a></div>
              </div>
              <div>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Student Control Room:</span>
                <div><a href="tel:+919886011223" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>+91 98860 11223</a></div>
              </div>
              <div>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>Hospitality & Stay:</span>
                <div><a href="tel:+919535077889" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>+91 95350 77889</a></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2026 SEMAPHORE Organizing Committee. All rights reserved. Designed for lightning fast participant support.
          </div>
          <button 
            onClick={scrollToTop} 
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <span>Back to Top</span>
            <IconChevronUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
