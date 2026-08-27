import React from 'react';
import { 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconClock, 
  IconShield, 
  IconChevronUp 
} from './Icons';

export function Footer({ onNavigate }) {
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
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>SEMAPHORE 2K26</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              National Level IT Fest organized by Department of MCA, NMAM Institute of Technology, Nitte.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              Official portal for event details, schedules, rules, coordinators, and FAQ.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Portal Navigation</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('home')} className="footer-link-btn">Home</button></li>
              <li><button onClick={() => onNavigate('events')} className="footer-link-btn">Events & Heads</button></li>
              <li><button onClick={() => onNavigate('schedule')} className="footer-link-btn">Festival Schedule</button></li>
              <li><button onClick={() => onNavigate('contacts')} className="footer-link-btn">Coordinator Contacts</button></li>
              <li><button onClick={() => onNavigate('rules')} className="footer-link-btn">General Rules</button></li>
              <li><button onClick={() => onNavigate('faq')} className="footer-link-btn">Help & FAQ</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="footer-link-btn">Moments Gallery</button></li>
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
