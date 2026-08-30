import { useState } from 'react';
import { 
  IconShield, 
  IconCheck, 
  IconSearch, 
  IconDownload 
} from './Icons';

export function RulesSection({ ruleCategories, globalSearch }) {
  const [localSearch, setLocalSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const effectiveSearch = globalSearch || localSearch;

  const filteredCategories = ruleCategories.map((cat) => {
    const matchingRules = cat.rules.filter((r) => 
      r.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      cat.title.toLowerCase().includes(effectiveSearch.toLowerCase())
    );
    return {
      ...cat,
      rules: matchingRules
    };
  }).filter((cat) => cat.rules.length > 0);

  const handleCopySummary = () => {
    const text = ruleCategories.map(c => `${c.title}\n${c.rules.map(r => `• ${r}`).join('\n')}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="rules" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <IconShield size={16} />
            <span>Code of Conduct</span>
          </div>
          <h2>General Fest Rules & Guidelines</h2>
          <p>
            Official regulations regarding student eligibility, ID card verification, reporting punctuality, academic fair play, and scoring.
          </p>
        </div>

        {/* Search and Quick Action */}
        <div className="filter-row">
          <div className="search-input-wrapper" style={{ minWidth: '300px' }}>
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search fest rules, ID policy, scoring..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <button onClick={handleCopySummary} className="btn btn-secondary btn-sm">
            <IconDownload size={15} />
            <span>{copied ? 'Copied Rulebook to Clipboard!' : 'Copy Rulebook Summary'}</span>
          </button>
        </div>

        {/* Rules Categories List */}
        <div className="rules-container">
          {filteredCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
              No rules matched your search query "{effectiveSearch}".
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="rule-category-card">
                <h3 className="rule-category-title">
                  <IconShield size={18} style={{ color: 'var(--primary)' }} />
                  <span>{cat.title}</span>
                </h3>

                <ul className="rules-bullet-list">
                  {cat.rules.map((rule, idx) => (
                    <li key={idx} className="rules-bullet-item">
                      <IconCheck size={16} className="rule-check-icon" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
