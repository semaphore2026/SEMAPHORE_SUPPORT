import React, { useState, useEffect } from 'react';
import './App.css';

// Data imports
import { eventsData } from './data/eventsData';
import { scheduleData, scheduleDays, scheduleVenues } from './data/scheduleData';
import { contactsData, contactCategories } from './data/contactsData';
import { faqData, faqCategories } from './data/faqData';
import { ruleCategories } from './data/rulesData';
import { galleryData, galleryCategories } from './data/galleryData';
import { campusData, facilityCategories } from './data/campusData';

// Component & Page imports
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { EventSection } from './components/EventSection';
import { ScheduleSection } from './components/ScheduleSection';
import { FaqSection } from './components/FaqSection';
import { ContactsSection } from './components/ContactsSection';
import { RulesSection } from './components/RulesSection';
import { GallerySection } from './components/GallerySection';
import { CampusMapSection } from './components/CampusMapSection';
import { IconChevronLeft } from './components/Icons';

function App() {
  // Read initial page from URL hash if present (e.g. #events)
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = ['home', 'events', 'schedule', 'faq', 'contacts', 'rules', 'gallery', 'map'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [globalSearch, setGlobalSearch] = useState('');

  // Handle URL hash changes (browser back/forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'events', 'schedule', 'faq', 'contacts', 'rules', 'gallery', 'map'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Sticky Header Navbar with Home navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Page Content with Breadcrumb Back navigation for inner pages */}
      <main className="main-content-wrapper">
        {currentPage !== 'home' && (
          <div className="page-breadcrumb-bar">
            <div className="container">
              <button
                onClick={() => handleNavigate('home')}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <IconChevronLeft size={16} />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        )}

        {/* Home Page */}
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
            eventsCount={eventsData.length}
            scheduleCount={scheduleData.length}
          />
        )}

        {/* Events Page */}
        {currentPage === 'events' && (
          <EventSection
            events={eventsData}
            globalSearch={globalSearch}
          />
        )}

        {/* Schedule Page */}
        {currentPage === 'schedule' && (
          <ScheduleSection
            scheduleData={scheduleData}
            scheduleDays={scheduleDays}
            scheduleVenues={scheduleVenues}
            globalSearch={globalSearch}
          />
        )}

        {/* FAQ Page */}
        {currentPage === 'faq' && (
          <FaqSection
            faqData={faqData}
            categories={faqCategories}
            globalSearch={globalSearch}
          />
        )}

        {/* Contacts Page */}
        {currentPage === 'contacts' && (
          <ContactsSection
            contacts={contactsData}
            categories={contactCategories}
            globalSearch={globalSearch}
          />
        )}

        {/* General Rules Page */}
        {currentPage === 'rules' && (
          <RulesSection
            ruleCategories={ruleCategories}
            globalSearch={globalSearch}
          />
        )}

        {/* Photo Gallery Page */}
        {currentPage === 'gallery' && (
          <GallerySection
            galleryData={galleryData}
            categories={galleryCategories}
            globalSearch={globalSearch}
          />
        )}

        {/* Campus Map Page */}
        {currentPage === 'map' && (
          <CampusMapSection
            campusData={campusData}
            categories={facilityCategories}
            globalSearch={globalSearch}
          />
        )}
      </main>
    </div>
  );
}

export default App;
