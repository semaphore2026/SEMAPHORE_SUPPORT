import { useState } from 'react';
import { 
  IconClock, 
  IconCalendar, 
  IconMapPin, 
  IconSearch, 
  IconUser 
} from './Icons';

export function ScheduleSection({ scheduleData, scheduleDays, scheduleVenues, globalSearch }) {
  const [selectedDay, setSelectedDay] = useState('day1');
  const [selectedVenue, setSelectedVenue] = useState('All Venues');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = globalSearch || localSearch;

  const filteredSchedule = scheduleData.filter((item) => {
    const matchesDay = item.day === selectedDay;
    const matchesVenue = selectedVenue === 'All Venues' || item.venue === selectedVenue;
    const matchesQuery = 
      item.title.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.venue.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.coordinator.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.time.toLowerCase().includes(effectiveSearch.toLowerCase());

    return matchesDay && matchesVenue && matchesQuery;
  });

  return (
    <section id="schedule" className="section-wrapper">
      <div className="container schedule-container">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <IconClock size={16} />
            <span>Master Timeline</span>
          </div>
          <h2>Festival Schedule & Venue Timeline</h2>
          <p>
            Complete day-wise schedule with exact time slots, calendar dates, assigned venues, and coordinator details.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="schedule-day-tabs">
          {scheduleDays.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id)}
              className={`schedule-day-btn ${selectedDay === d.id ? 'active' : ''}`}
            >
              <span>{d.label}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.85, marginLeft: '0.4rem' }}>
                ({d.shortDate})
              </span>
            </button>
          ))}
        </div>

        {/* Filters Row: Venue Dropdown & Search */}
        <div className="filter-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
            <label htmlFor="venue-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Filter by Venue:
            </label>
            <select
              id="venue-select"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="form-select"
              style={{ maxWidth: '280px', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
            >
              {scheduleVenues.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="search-input-wrapper">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search schedule or speaker..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="schedule-items-list">
          {filteredSchedule.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No scheduled events found for this day, venue, or search filter.
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div key={item.id} className="schedule-card">
                {/* Time & Date Column */}
                <div className="schedule-time-col">
                  <div className="schedule-time-text">{item.time}</div>
                  <div className="schedule-date-badge">
                    <IconCalendar size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                    {item.date}
                  </div>
                  <span className={`badge ${
                    item.status === 'Live Now' 
                      ? 'badge-live' 
                      : item.status === 'Completed' 
                        ? 'badge-completed' 
                        : 'badge-upcoming'
                  }`} style={{ alignSelf: 'flex-start', marginTop: '0.2rem' }}>
                    {item.status === 'Live Now' && <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>}
                    {item.status}
                  </span>
                </div>

                {/* Main Details (Title, Venue, Coordinator, Description) */}
                <div className="schedule-main-col">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 className="schedule-item-title">{item.title}</h3>
                    <span className="badge badge-upcoming" style={{ fontSize: '0.7rem' }}>
                      {item.category}
                    </span>
                  </div>

                  {/* Required Venue Display */}
                  <div className="schedule-venue-row">
                    <IconMapPin size={16} style={{ flexShrink: 0 }} />
                    <span>Venue: <strong>{item.venue}</strong> ({item.locationDetail})</span>
                  </div>

                  <p className="schedule-desc">{item.description}</p>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <IconUser size={14} />
                    <span>Coordinator: <strong style={{ color: 'var(--text-secondary)' }}>{item.coordinator}</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="schedule-actions-col">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Slot #{item.id.replace('sch-', '')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
