import React, { useState } from 'react';
import { 
  IconUser, 
  IconPhone, 
  IconMail, 
  IconWhatsApp, 
  IconMapPin, 
  IconClock, 
  IconSearch, 
  IconShield,
  IconAlertTriangle 
} from './Icons';

export function ContactsSection({ contacts, categories, globalSearch }) {
  const [selectedCat, setSelectedCat] = useState('All Contacts');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = globalSearch || localSearch;

  const filteredContacts = contacts.filter((c) => {
    const matchesCat = selectedCat === 'All Contacts' || c.committee === selectedCat;
    const matchesSearch = 
      c.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      c.role.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      c.department.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      c.desk.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      c.phone.includes(effectiveSearch);

    return matchesCat && matchesSearch;
  });

  return (
    <section id="contacts" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <IconUser size={16} />
            <span>Support Directory</span>
          </div>
          <h2>Main Contact Persons & Committee Heads</h2>
          <p>
            Connect directly with faculty conveners, student leads, event heads, hospitality, and 24/7 medical response desks.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="filter-row">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`filter-pill ${selectedCat === cat ? 'active' : ''}`}
              >
                {cat === 'Medical & Emergency' && <IconAlertTriangle size={14} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#fda4af' }} />}
                {cat}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search coordinator, role, or desk..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="contacts-grid">
          {filteredContacts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No contact persons found matching your criteria.
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div 
                key={contact.id} 
                className={`contact-card ${contact.committee === 'Medical & Emergency' ? 'emergency' : ''}`}
              >
                <div>
                  {/* Card Header with Initials Avatar */}
                  <div className="contact-card-header">
                    <div className="contact-avatar">
                      {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="contact-info">
                      <h3>{contact.name}</h3>
                      <div className="contact-role">{contact.role}</div>
                      <div className="contact-dept">{contact.department}</div>
                    </div>
                  </div>

                  {/* Desk & Availability Details */}
                  <div className="contact-details-list" style={{ marginTop: '0.85rem' }}>
                    <div className="contact-row">
                      <IconMapPin size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                      <span>{contact.desk}</span>
                    </div>

                    <div className="contact-row">
                      <IconClock size={15} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                      <span>Hours: <strong>{contact.availability}</strong></span>
                    </div>

                    <div className="contact-row">
                      <IconPhone size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                      <span>Phone: <strong>{contact.phone}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons: Call, WhatsApp, Email */}
                <div className="contact-actions-bar">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="btn btn-primary btn-sm"
                  >
                    <IconPhone size={14} />
                    <span>Call Now</span>
                  </a>

                  {contact.whatsapp ? (
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm"
                    >
                      <IconWhatsApp size={14} />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <a
                      href={`mailto:${contact.email}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <IconMail size={14} />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
