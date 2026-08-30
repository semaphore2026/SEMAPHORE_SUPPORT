import { useState } from 'react';
import { 
  IconX, 
  IconTicket, 
  IconCheck, 
  IconAlertTriangle, 
  IconPhone, 
  IconClock, 
  IconMapPin 
} from './Icons';

export function SupportTicketModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    regId: '',
    phone: '',
    category: 'WiFi / Network Access',
    isUrgent: false,
    description: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.description) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `SMP-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        id: generatedId,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...formData
      });
      setIsSubmitting(false);
    }, 400);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormData({
      name: '',
      regId: '',
      phone: '',
      category: 'WiFi / Network Access',
      isUrgent: false,
      description: ''
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-upcoming">24/7 HELPDESK</span>
              <span className="badge badge-live">DESK 01 ACTIVE</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              {submittedTicket ? 'Support Ticket Generated' : 'Submit Support Query / Request'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {submittedTicket 
                ? 'Your query has been logged and assigned to the nearest campus support volunteer.' 
                : 'Need immediate assistance, badge replacement, WiFi help, or venue guidance? Let us know.'}
            </p>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Close Support Modal">
            <IconX size={20} />
          </button>
        </div>

        {submittedTicket ? (
          /* Confirmation View */
          <div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.25rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <IconCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#6ee7b7', marginBottom: '0.25rem' }}>
                Ticket {submittedTicket.id}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Status: <strong>Assigned to Central Control Desk #01</strong>
              </p>
            </div>

            {/* Ticket Summary Details */}
            <div className="event-meta-list" style={{ marginBottom: '1.25rem' }}>
              <div className="event-meta-item">
                <IconClock size={16} className="event-meta-icon" />
                <div>
                  <span className="event-meta-label">Estimated Response:</span>
                  <span>5 - 12 minutes (Volunteer will call {submittedTicket.phone})</span>
                </div>
              </div>

              <div className="event-meta-item">
                <IconMapPin size={16} className="event-meta-icon" />
                <div>
                  <span className="event-meta-label">Physical Helpdesk:</span>
                  <span>Main Auditorium Foyer (Counters 1 to 3)</span>
                </div>
              </div>

              <div className="event-meta-item">
                <IconTicket size={16} className="event-meta-icon" />
                <div>
                  <span className="event-meta-label">Category & Subject:</span>
                  <span>{submittedTicket.category} • {submittedTicket.description}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button onClick={handleReset} className="btn btn-secondary">
                Submit Another Query
              </button>
              <a href="tel:+919886011223" className="btn btn-primary">
                <IconPhone size={16} />
                <span>Call Central Desk Now</span>
              </a>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="ticket-name">Your Full Name *</label>
                <input
                  id="ticket-name"
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ticket-phone">Mobile Number *</label>
                <input
                  id="ticket-phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="ticket-reg">College / Reg ID (Optional)</label>
                <input
                  id="ticket-reg"
                  type="text"
                  placeholder="e.g. SEM-2041 or College Name"
                  value={formData.regId}
                  onChange={(e) => setFormData({ ...formData, regId: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ticket-cat">Issue Category *</label>
                <select
                  id="ticket-cat"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="WiFi / Network Access">WiFi / Network Access</option>
                  <option value="Lost Participant Badge / ID">Lost Participant Badge / ID</option>
                  <option value="Food Coupon / Meal Issue">Food Coupon / Meal Issue</option>
                  <option value="Schedule / Event Clash">Schedule / Event Clash</option>
                  <option value="Hostel & Accommodation">Hostel & Accommodation</option>
                  <option value="Medical / First Aid">Medical / First Aid</option>
                  <option value="Other General Query">Other General Query</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ticket-desc">Describe your issue / question *</label>
              <textarea
                id="ticket-desc"
                required
                rows={3}
                placeholder="Explain what help you need or your current location (e.g. Sitting in Turing Lab, need power strip)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
              ></textarea>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconAlertTriangle size={18} style={{ color: formData.isUrgent ? 'var(--accent-rose)' : 'var(--text-muted)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Mark as Urgent Priority
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                <IconTicket size={16} />
                <span>{isSubmitting ? 'Logging Ticket...' : 'Submit Support Ticket'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
