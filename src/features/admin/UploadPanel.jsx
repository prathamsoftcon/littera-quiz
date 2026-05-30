import React from 'react';

export default function UploadPanel({ t, validation, uploadChecklist, runValidationPreview, importReady }) {
  return (
    <article className="panel admin-panel active-panel">
      <div className="panel-title">{t('adminMasterUploadValidation')}</div>
      <div className="upload-hero">
        <div>
          <p className="upload-subtitle">{t('adminConfirmImport')}</p>
          <h3 className="upload-title">{t('adminMasterUploadValidation')}</h3>
        </div>
        <div className="upload-chip">CSV / XLSX</div>
      </div>
      <div className="upload-stats">
        <div><strong>{validation.total}</strong><span>{t('adminTotalRows')}</span></div>
        <div><strong>{validation.valid}</strong><span>{t('adminValidRows')}</span></div>
        <div><strong>{validation.duplicate}</strong><span>{t('adminDuplicates')}</span></div>
        <div><strong>{validation.missing}</strong><span>{t('adminMissingFields')}</span></div>
        <div><strong>{validation.parentRef}</strong><span>{t('adminParentCodeErrors')}</span></div>
      </div>

      <div className="upload-order-panel">
        {uploadChecklist.map((row, index) => (
          <div className="upload-order-row" key={row.type}>
            <b>{index + 1}. {row.type}</b>
            <span>{row.required}</span>
          </div>
        ))}
      </div>

      <div className="inline-actions upload-actions">
        <button type="button" className="admin-btn ghost" onClick={runValidationPreview}>{t('adminRunValidationPreview')}</button>
        <button type="button" className="admin-btn" disabled={!importReady}>{t('adminConfirmImport')}</button>
      </div>
    </article>
  );
}
