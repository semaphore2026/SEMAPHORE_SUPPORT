import React, { useState } from 'react';
import { 
  IconHelpCircle, 
  IconChevronDown, 
  IconChevronUp, 
  IconSearch, 
  IconTicket 
} from './Icons';

export function FaqSection({ faqData, categories, globalSearch, onOpenTicketModal }) {
  const [selectedCat, setSelectedCat] = useState('All FAQs');
  const [localSearch, setLocalSearch] = useState('');
  const [openItems, setOpenItems] = useState({ 'faq-01': true }); // First open by default

  const effectiveSearch = globalSearch || localSearch;

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = selectedCat === 'All FAQs' || item.category === selectedCat;
    const matchesSearch = 
      item.question.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(effectiveSearch.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <IconHelpCircle size={16} />
            <span>Help Center</span>
          </div>
          <h2>Frequently Asked Questions</h2>
          <p>
            Quick answers regarding registrations, documents, WiFi credentials, food coupons, accommodation, and certificates.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="filter-row">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`filter-pill ${selectedCat === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div className="faq-grid">
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No answers found for your query. Click below to submit a support ticket.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="badge badge-upcoming" style={{ fontSize: '0.7rem' }}>
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>

                    {isOpen ? (
                      <IconChevronUp size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    ) : (
                      <IconChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="faq-answer-box">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Didn't find answer CTA */}
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem 1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.2rem' }}>
              Have another question or need specific assistance?
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Feel free to reach out directly to the respective student coordinators or faculty conveners.
            </p>
          </div>
          <a href="#contacts" className="btn btn-primary">
            <span>View Coordinator Contacts</span>
          </a>
        </div>
      </div>
    </section>
  );
}
