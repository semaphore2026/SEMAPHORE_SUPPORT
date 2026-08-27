import React, { useState } from 'react';
import './App.css';

// Data imports
import { eventsData } from './data/eventsData';
import { scheduleData, scheduleDays, scheduleVenues } from './data/scheduleData';
import { contactsData, contactCategories } from './data/contactsData';
import { faqData, faqCategories } from './data/faqData';
import { ruleCategories } from './data/rulesData';
import { galleryData, galleryCategories } from './data/galleryData';

// Component imports
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { EventSection } from './components/EventSection';
import { ScheduleSection } from './components/ScheduleSection';
import { FaqSection } from './components/FaqSection';
import { ContactsSection } from './components/ContactsSection';
import { RulesSection } from './components/RulesSection';
import { GallerySection } from './components/GallerySection';
import { SupportTicketModal } from './components/SupportTicketModal';
import { Footer } from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -75; // Account for sticky navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-layout">
      {/* Sticky Header Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTicketModal={() => setIsTicketModalOpen(true)}
      />

      {/* Main Hero Banner with Global Search and Status */}
      <HeroBanner
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        onNavigate={handleNavigate}
        onOpenTicketModal={() => setIsTicketModalOpen(true)}
        eventsCount={eventsData.length}
        scheduleCount={scheduleData.length}
      />

      {/* Event Details Section (Location, Time, Head Details, Rules) */}
      <EventSection
        events={eventsData}
        globalSearch={globalSearch}
      />

      {/* Multi-Day Schedules & Venue Timeline (Date, Time, Venue) */}
      <ScheduleSection
        scheduleData={scheduleData}
        scheduleDays={scheduleDays}
        scheduleVenues={scheduleVenues}
        globalSearch={globalSearch}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        faqData={faqData}
        categories={faqCategories}
        globalSearch={globalSearch}
        onOpenTicketModal={() => setIsTicketModalOpen(true)}
      />

      {/* Main Contact Persons Directory (Conveners, Leads, Hotlines) */}
      <ContactsSection
        contacts={contactsData}
        categories={contactCategories}
        globalSearch={globalSearch}
      />

      {/* General Rules & Code of Conduct */}
      <RulesSection
        ruleCategories={ruleCategories}
        globalSearch={globalSearch}
      />

      {/* Photo Gallery & Lightbox */}
      <GallerySection
        galleryData={galleryData}
        categories={galleryCategories}
        globalSearch={globalSearch}
      />

      {/* 24/7 Support Ticket Desk Modal */}
      <SupportTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* Footer with Hotlines and Quick Links */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTicketModal={() => setIsTicketModalOpen(true)}
      />
    </div>
  );
}

export default App;
