import React from 'react';
import { 
  IconX, 
  IconMapPin, 
  IconClock, 
  IconCalendar, 
  IconUser, 
  IconPhone, 
  IconMail, 
  IconWhatsApp, 
  IconAward, 
  IconShield,
  IconCheck
} from './Icons';

export function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className={`badge ${event.status === 'Live Now' ? 'badge-live' : 'badge-upcoming'}`}>
                {event.status}
              </span>
              <span className="badge badge-upcoming">{event.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{event.code}</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--text-primary)' }}>{event.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.2rem' }}>
              {event.tagline}
            </p>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Close event modal">
            <IconX size={20} />
          </button>
        </div>

        {/* Essential Details Grid (Location, Time, Prize, Team) */}
        <div className="event-meta-list" style={{ marginBottom: '1.25rem' }}>
          <div className="event-meta-item">
            <IconMapPin size={18} className="event-meta-icon" />
            <div>
              <span className="event-meta-label">Location / Venue:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{event.location}</strong>
            </div>
          </div>

          <div className="event-meta-item">
            <IconClock size={18} className="event-meta-icon" />
            <div>
              <span className="event-meta-label">Date & Timing:</span>
              <span>{event.date} • <strong>{event.time}</strong> ({event.duration})</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.25rem' }}>
            <div className="event-meta-item">
              <IconAward size={18} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
              <div>
                <span className="event-meta-label">Prize Pool:</span>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{event.prizePool}</span>
              </div>
            </div>
            <div className="event-meta-item">
              <IconUser size={18} className="event-meta-icon" />
              <div>
                <span className="event-meta-label">Team Size:</span>
                <span>{event.teamSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            Event Overview
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.55' }}>
            {event.description}
          </p>
        </div>

        {/* Rounds Breakdown */}
        {event.rounds && event.rounds.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Rounds & Schedule Breakdown
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {event.rounds.map((rnd, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.85rem'
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>{rnd.round}:</strong>
                    <span style={{ color: 'var(--text-primary)' }}>{rnd.title}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', textAlign: 'right', fontSize: '0.8rem' }}>
                    <span>{rnd.time}</span>
                    <div style={{ color: 'var(--accent-amber)' }}>{rnd.venue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specific Event Rules */}
        {event.rules && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Rules & Guidelines
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {event.rules.map((rule, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <IconCheck size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Head & Co-Head Contact Info Box */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
            Event Coordinators & Helpdesk Heads
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: event.coHeadDetails ? '1fr 1fr' : '1fr', gap: '0.85rem' }}>
            {/* Lead Head */}
            <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                {event.headDetails.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                {event.headDetails.role}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                📍 {event.headDetails.desk}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <a href={`tel:${event.headDetails.phone.replace(/\s+/g, '')}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  <IconPhone size={14} />
                  <span>Call</span>
                </a>
                {event.headDetails.whatsapp && (
                  <a href={`https://wa.me/${event.headDetails.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm" style={{ flex: 1 }}>
                    <IconWhatsApp size={14} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Co-Head */}
            {event.coHeadDetails && (
              <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  {event.coHeadDetails.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  {event.coHeadDetails.role}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                  📍 {event.coHeadDetails.desk}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${event.coHeadDetails.phone.replace(/\s+/g, '')}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    <IconPhone size={14} />
                    <span>Call</span>
                  </a>
                  <a href={`mailto:${event.coHeadDetails.email}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    <IconMail size={14} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <a href={`tel:${event.headDetails.phone.replace(/\s+/g, '')}`} className="btn btn-primary">
            <IconPhone size={16} />
            <span>Call {event.headDetails.name.split(' ')[0]}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
