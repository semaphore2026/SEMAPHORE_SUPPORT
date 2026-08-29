import React, { useState } from 'react';
import { IconImage, IconMapPin, IconCalendar, IconSearch } from './Icons';
import { LightboxModal } from './LightboxModal';

export function GallerySection({ galleryData, categories, globalSearch }) {
  const [selectedCat, setSelectedCat] = useState('All Moments');
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  const filteredGallery = galleryData.filter((item) => {
    const matchesCat = selectedCat === 'All Moments' || item.category === selectedCat;
    const matchesSearch = globalSearch 
      ? item.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        item.caption.toLowerCase().includes(globalSearch.toLowerCase()) ||
        item.location.toLowerCase().includes(globalSearch.toLowerCase())
      : true;
    return matchesCat && matchesSearch;
  });

  return (
    <section id="gallery" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <IconImage size={16} />
            <span>Visual Highlights</span>
          </div>
          <h2>SEMAPHORE Moments & Gallery</h2>
          <p>
            Snapshots from the 24H hackathon, coding arenas, esports tournaments, campus atmosphere, and trophy celebrations.
          </p>
        </div>

        {/* Categories Bar */}
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
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredGallery.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No photos found for the selected filter.
            </div>
          ) : (
            filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="gallery-card"
                onClick={() => setActiveLightboxImg(item)}
                role="button"
                tabIndex={0}
                aria-label={`View full photo of ${item.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveLightboxImg(item); }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="gallery-image"
                  loading="lazy"
                />

                <div className="gallery-overlay">
                  <span className="badge badge-upcoming" style={{ alignSelf: 'flex-start', marginBottom: '0.4rem', fontSize: '0.65rem' }}>
                    {item.category}
                  </span>
                  <h4 className="gallery-card-title">{item.title}</h4>
                  <div className="gallery-card-meta">
                    <span><IconMapPin size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> {item.location}</span>
                    <span>• {item.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <LightboxModal
          imageItem={activeLightboxImg}
          allImages={filteredGallery}
          onClose={() => setActiveLightboxImg(null)}
          onSelectImage={(img) => setActiveLightboxImg(img)}
        />
      )}
    </section>
  );
}
