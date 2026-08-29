import React, { useEffect } from 'react';
import { IconX, IconChevronLeft, IconChevronRight, IconMapPin, IconCalendar } from './Icons';

export function LightboxModal({ imageItem, allImages, onClose, onSelectImage }) {
  const currentIndex = imageItem ? allImages.findIndex((img) => img.id === imageItem.id) : -1;

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (currentIndex === -1 || !allImages?.length) return;
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    onSelectImage(allImages[prevIndex]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (currentIndex === -1 || !allImages?.length) return;
    const nextIndex = (currentIndex + 1) % allImages.length;
    onSelectImage(allImages[nextIndex]);
  };

  useEffect(() => {
    if (!imageItem) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        onSelectImage(allImages[prevIndex]);
      }
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % allImages.length;
        onSelectImage(allImages[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageItem, currentIndex, allImages, onClose, onSelectImage]);

  if (!imageItem) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      {/* Top Close Button */}
      <button 
        onClick={onClose}
        className="modal-close-btn" 
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 2010 }}
        aria-label="Close Lightbox"
      >
        <IconX size={24} />
      </button>

      {/* Navigation Buttons */}
      {allImages.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="lightbox-nav-btn lightbox-prev"
            aria-label="Previous photo"
          >
            <IconChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="lightbox-nav-btn lightbox-next"
            aria-label="Next photo"
          >
            <IconChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image Preview */}
      <div className="lightbox-img-wrapper" onClick={(e) => e.stopPropagation()}>
        <img 
          src={imageItem.imageUrl} 
          alt={imageItem.title}
          className="lightbox-img" 
        />
        
        {/* Caption Bar */}
        <div style={{
          marginTop: '0.75rem',
          padding: '0.85rem 1rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          maxWidth: '680px',
          margin: '0.75rem auto 0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            {imageItem.title}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
            {imageItem.caption}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span><IconMapPin size={13} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> {imageItem.location}</span>
            <span><IconCalendar size={13} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> {imageItem.date}</span>
            <span style={{ color: 'var(--primary)' }}>{currentIndex + 1} / {allImages.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
