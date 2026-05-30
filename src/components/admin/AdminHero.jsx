import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHero({ t }) {
  return (
    <div className="admin-hero">
      <div>
        <p className="eyebrow">{t('adminEyebrow')}</p>
        <h2>{t('adminControlCenter')}</h2>
      </div>
      <div className="admin-hero-actions">
        <Link to="/question-bank/approval" className="admin-link-btn">{t('adminOpenApprovalQueue')}</Link>
        <Link to="/admin/master-upload" className="admin-link-btn ghost">{t('adminGoMasterUpload')}</Link>
      </div>
    </div>
  );
}
