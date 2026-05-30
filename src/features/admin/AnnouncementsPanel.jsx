import React from 'react';

export default function AnnouncementsPanel({ t, announcements, draftAnnouncement, setDraftAnnouncement, sendAnnouncement }) {
  return (
    <article className="panel admin-panel active-panel">
      <div className="panel-title">{t('adminAnnouncementsBroadcasts')}</div>
      <div className="announce-composer">
        <select
          className="admin-select"
          value={draftAnnouncement.target}
          onChange={(event) => setDraftAnnouncement((prev) => ({ ...prev, target: event.target.value }))}
        >
          <option>{t('adminAudienceAllStudents')}</option>
          <option>{t('adminAudienceAllTeachers')}</option>
          <option>{t('adminAudienceDistrictJaipur')}</option>
          <option>{t('adminAudienceBlockAmber')}</option>
          <option>{t('adminAudienceRoleAdmin')}</option>
        </select>
        <textarea
          className="admin-textarea"
          value={draftAnnouncement.text}
          onChange={(event) => setDraftAnnouncement((prev) => ({ ...prev, text: event.target.value }))}
          placeholder={t('adminAnnouncementPlaceholder')}
        />
        <button type="button" className="admin-btn" onClick={sendAnnouncement}>{t('adminSendBroadcast')}</button>
      </div>

      <div className="announce-list">
        {announcements.map((item) => (
          <div className="announce-row" key={item.id}>
            <div>
              <strong>{item.target}</strong>
              <p>{item.text}</p>
            </div>
            <small>{item.at}</small>
          </div>
        ))}
      </div>
    </article>
  );
}
