import React, { useState } from 'react';
import { 
  IconCalendar, 
  IconMapPin, 
  IconClock, 
  IconUser, 
  IconPhone, 
  IconWhatsApp, 
  IconSearch, 
  IconAward, 
  IconInfo 
} from './Icons';
import { EventModal } from './EventModal';

export function EventSection({ events, globalSearch }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = [
    'All',
    'Coding & Dev',
    'Web & Design',
    'AI & Data',
    'Gaming & Esports',
    'General & Management'
  ];

  const effectiveSearch = globalSearch || localSearch;

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesQuery = 
      evt.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      evt.description.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      evt.location.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      evt.headDetails.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      evt.category.toLowerCase().includes(effectiveSearch.toLowerCase());

    return matchesCat && matchesQuery;
  });

  return (
    <section id="events" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <IconCalendar size={16} />
            <span>Event Directory</span>
          </div>
          <h2>Events, Venues & Coordinator Heads</h2>
          <p>
            Explore all competitions with exact lab locations, round timings, prize pools, and direct coordinator hotlines.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="filter-row">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search event, lab, or coordinator..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No events found matching "{effectiveSearch}".
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div key={evt.id} className="event-card">
                <div>
                  {/* Top Badges & Title */}
                  <div className="event-card-top">
                    <span className={`badge ${evt.status === 'Live Now' ? 'badge-live' : 'badge-upcoming'}`}>
                      {evt.status}
                    </span>
                    <span className="badge badge-upcoming" style={{ fontSize: '0.7rem' }}>
                      {evt.category}
                    </span>
                  </div>

                  <h3 className="event-card-title">{evt.name}</h3>
                  <p className="event-card-tagline">{evt.tagline}</p>

                  {/* Required Event Meta: Location & Time */}
                  <div className="event-meta-list" style={{ marginTop: '0.9rem' }}>
                    <div className="event-meta-item">
                      <IconMapPin size={17} className="event-meta-icon" />
                      <div>
                        <span className="event-meta-label">Location:</span>
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    <div className="event-meta-item">
                      <IconClock size={17} className="event-meta-icon" />
                      <div>
                        <span className="event-meta-label">Time:</span>
                        <span>{evt.time} ({evt.date.split('-')[0].trim()})</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>Prize: <strong style={{ color: 'var(--accent-amber)' }}>{evt.prizePool}</strong></span>
                      <span>Team: <strong style={{ color: 'var(--text-primary)' }}>{evt.teamSize}</strong></span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Required Head Details Card */}
                  <div className="event-head-box">
                    <div className="event-head-info">
                      <span className="event-head-name">{evt.headDetails.name}</span>
                      <span className="event-head-role">{evt.headDetails.role}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {evt.headDetails.desk.split('(')[0]}
                      </span>
                    </div>

                    <div className="event-head-actions">
                      <a
                        href={`tel:${evt.headDetails.phone.replace(/\s+/g, '')}`}
                        className="btn-icon-link"
                        title={`Call ${evt.headDetails.name}`}
                      >
                        <IconPhone size={15} />
                      </a>
                      {evt.headDetails.whatsapp && (
                        <a
                          href={`https://wa.me/${evt.headDetails.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-icon-link btn-icon-whatsapp"
                          title={`WhatsApp ${evt.headDetails.name}`}
                        >
                          <IconWhatsApp size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Open Details Button */}
                  <button
                    onClick={() => setActiveModalEvent(evt)}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '0.85rem', justifyContent: 'space-between' }}
                  >
                    <span>View Rules & Full Details</span>
                    <IconInfo size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Full Details Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}
    </section>
  );
}
