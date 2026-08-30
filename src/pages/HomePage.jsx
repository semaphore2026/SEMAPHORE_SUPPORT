import { contactsData } from '../data/contactsData';
import { IconMessageSquare, IconPhone } from '../components/Icons';

export function HomePage({ onNavigate }) {
  const mainContacts = contactsData.filter((contact) => contact.isPrimary).slice(0, 5);

  return (
    <>
      <section className="hero-wrapper welcome-home" aria-label="Semaphore 2K26 welcome">
        <div className="welcome-animation">
          <span className="welcome-small">WELCOME TO</span>
          <h1 className="welcome-title">SEMAPHORE 2K26</h1>
          <div className="welcome-actions">
            <button onClick={() => onNavigate('events')} className="btn btn-primary">
              Explore Events
            </button>
            <button onClick={() => onNavigate('schedule')} className="btn btn-secondary">
              View Schedule
            </button>
            <button onClick={() => onNavigate('map')} className="btn btn-secondary">
              Campus Map
            </button>
            <button onClick={() => onNavigate('contacts')} className="btn btn-secondary">
              Contact Coordinators
            </button>
          </div>
        </div>
      </section>

      <section className="home-contacts-section" aria-labelledby="main-contacts-title">
        <div className="container">
          <div className="home-contacts-heading">
            <span className="section-tag">Core Team Directory</span>
            <h2 id="main-contacts-title">Meet the People Behind Semaphore 2K26</h2>
          </div>

          <div className="home-contacts-grid">
            {mainContacts.map((contact) => (
              <article className="home-contact-card" key={contact.id}>
                <div className="home-contact-photo" aria-hidden="true"></div>
                <div className="home-contact-info">
                  <h3>{contact.name}</h3>
                  <p className="home-contact-role">{contact.role}</p>
                  <p className="home-contact-department">{contact.department}</p>
                  <p className="home-contact-committee">{contact.committee}</p>
                </div>
                <div className="home-contact-actions">
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="btn btn-primary btn-sm">
                    <IconPhone size={14} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-sm"
                  >
                    <IconMessageSquare size={14} />
                    <span>Message</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
