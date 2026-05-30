import React from 'react';
import { useTranslation } from '../../context/TranslationContext';
import SegmentedControl from '../../components/SegmentedControl';

export default function TeacherLeaderboardPanel({
  levels,
  activeLevel,
  onLevelChange,
  rows,
  scoreFormula,
}) {
  const { t } = useTranslation();
  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherLeaderboardTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherLeaderboardSubtitle')}</p>
        </div>
      </div>

      <SegmentedControl options={levels} value={activeLevel} onChange={onLevelChange} />
      <div className="teacher-formula">{scoreFormula}</div>

      <div className="teacher-table">
        <div className="teacher-table-row teacher-table-head">
          <span>{t('teacherLeaderboardRank')}</span>
          <span>{t('teacherLeaderboardTeacher')}</span>
          <span>{t('teacherLeaderboardStudents')}</span>
          <span>{t('teacherLeaderboardApproved')}</span>
          <span>{t('teacherLeaderboardScore')}</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.rank}
            className={`teacher-table-row ${row.isCurrent ? 'active' : ''}`}
          >
            <span>{row.rank}</span>
            <span>{row.name}</span>
            <span>{row.students}</span>
            <span>{row.approved}</span>
            <span>{row.score}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
