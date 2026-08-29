import React, { useState } from 'react';
import { IconBell, IconAlertTriangle, IconClock, IconSearch } from './Icons';

export function AnnouncementBar({ announcements, onNavigate }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tags = ['All', 'Urgent', 'Tech Support', 'Event Update', 'Venue Info', 'Hospitality', 'Emergency'];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesTag = selectedTag === 'All' 
      ? true 
      : selectedTag === 'Urgent' 
        ? item.urgent 
        : item.tag === selectedTag;

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  const latestUrgent = announcements.find((a) => a.urgent);

  return (
    <div>
      {/* Top Banner Ticker */}
      {latestUrgent && (
        <div className="top-ticker">
          <div className="container top-ticker-content">
            <div className="top-ticker-left">
              <span className="top-ticker-badge">LIVE ALERT</span>
              <span className="top-ticker-text">{latestUrgent.title} — {latestUrgent.content}</span>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="top-ticker-link"
            >
              View Noticeboard &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Main Noticeboard Section */}
      <section id="announcements" className="section-wrapper">
        <div className="container">
          <div className="section-head">
            <div className="section-tag">
              <IconBell size={16} />
              <span>Official Broadcasts</span>
            </div>
            <h2>Live Announcements & Updates</h2>
            <p>Real-time notifications, schedule shifts, lab allocations, and official committee updates.</p>
          </div>

          {/* Filter & Search Bar */}
          <div className="filter-row">
            <div className="filter-pills">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`filter-pill ${selectedTag === tag ? 'active' : ''}`}
                >
                  {tag === 'Urgent' && <IconAlertTriangle size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />}
                  {tag}
                </button>
              ))}
            </div>

            <div className="search-input-wrapper">
              <IconSearch size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Notices Grid */}
          <div className="noticeboard-grid">
            {filteredAnnouncements.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
                No announcements match your search or filter criteria.
              </div>
            ) : (
              filteredAnnouncements.map((ann) => (
                <div key={ann.id} className={`notice-card ${ann.urgent ? 'urgent' : ''}`}>
                  <div className="notice-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className={`badge ${ann.urgent ? 'badge-urgent' : 'badge-upcoming'}`}>
                        {ann.tag}
                      </span>
                      <span className="notice-title">{ann.title}</span>
                    </div>
                    <div className="notice-time">
                      <IconClock size={14} />
                      <span>{ann.timestamp}</span>
                    </div>
                  </div>

                  <p className="notice-body">{ann.content}</p>

                  <div className="notice-footer">
                    <span>Issued by: <strong>{ann.author}</strong></span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
