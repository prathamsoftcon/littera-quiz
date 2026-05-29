import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import flagIn from '../assets/flag-in.png';
import flagUs from '../assets/flag-us.png';
import litteraLogo from '../assets/littera_logo.png';
import { useTranslation } from '../context/TranslationContext';

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isLoginPage = location.pathname === '/quiz' || location.pathname === '/login' || location.pathname === '/';

  const languages = [
    { code: 'en', label: t('english'), icon: flagUs },
    { code: 'hi', label: t('hindi'), icon: flagIn },
  ];

  const activeLanguage = languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-title-wrap">
        <img src={litteraLogo} alt="Littera logo" className="topbar-logo" />
        <h1>{t('topbarTitle')}</h1>
      </div>

      <div className="topbar-actions">
        <div className="language-dropdown" ref={dropdownRef}>
          <button
            className="language-trigger"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={t('languageSelect')}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <img src={activeLanguage.icon} alt={activeLanguage.label} className="language-icon" />
            <span>{activeLanguage.label}</span>
            <span className="language-caret" aria-hidden="true">▾</span>
          </button>

          {isOpen ? (
            <div className="language-menu" role="listbox" aria-label={t('languageOptions')}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`language-option ${language === item.code ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                >
                  <img src={item.icon} alt={item.label} className="language-icon" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {!isLoginPage ? (
          <button
            type="button"
            className="signout-btn"
            onClick={() => navigate('/quiz')}
          >
            {t('signOut')}
          </button>
        ) : null}
      </div>
    </header>
  );
}
