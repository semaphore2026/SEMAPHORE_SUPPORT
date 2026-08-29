import React from 'react';
import { 
  IconSearch, 
  IconCalendar, 
  IconClock, 
  IconPhone, 
  IconTicket, 
  IconAward, 
  IconShield,
  IconX
} from './Icons';

export function HeroBanner({ 
  globalSearch, 
  setGlobalSearch, 
  onNavigate, 
  onOpenTicketModal,
  eventsCount = 8,
  scheduleCount = 19
}) {
  return (
    <section id="top" className="hero-wrapper">
      <div className="container hero-content">
        {/* Live Pill */}
        <div className="hero-pill">
          <span className="pulse-dot"></span>
          <span>SEMAPHORE 2K26 • HOSTED BY MCA - NMAMIT • HELPDESK ACTIVE</span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          SEMAPHORE 2K26 <span>Support & Event Portal</span>
        </h1>

        <p className="hero-description">
          Instant access to event locations, exact timings, head coordinator hotlines, day-wise schedules, general rules, and 24/7 attendee assistance.
        </p>

        {/* Global Search Box */}
        <div className="hero-search-box">
          <IconSearch size={20} className="hero-search-icon" />
          <input
            type="text"
            placeholder="Search any event, coordinator, venue (e.g. Turing Lab, Hackathon, Rahul)..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="hero-search-input"
            id="hero-global-search"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="hero-search-clear"
              aria-label="Clear search input"
            >
              <IconX size={18} />
            </button>
          )}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="hero-quick-actions">
          <button onClick={() => onNavigate('events')} className="btn btn-primary">
            <IconCalendar size={16} />
            <span>Explore Events & Heads</span>
          </button>

          <button onClick={() => onNavigate('schedule')} className="btn btn-secondary">
            <IconClock size={16} />
            <span>View Timeline & Venues</span>
          </button>

          <button onClick={onOpenTicketModal} className="btn btn-secondary">
            <IconTicket size={16} />
            <span>Submit Help Ticket</span>
          </button>

          <button onClick={() => onNavigate('contacts')} className="btn btn-secondary">
            <IconPhone size={16} />
            <span>Coordinator Directory</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-value">{eventsCount}</div>
            <div className="stat-label">Competitions & Tracks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{scheduleCount}</div>
            <div className="stat-label">Scheduled Slots</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹ 1.75L+</div>
            <div className="stat-label">Total Prize Pool</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24x7</div>
            <div className="stat-label">Live Support & Med Care</div>
          </div>
        </div>
      </div>
    </section>
  );
}
