import React, { useMemo } from 'react';
import { useTranslation } from '../../context/TranslationContext';

export default function StudentPerformancePanel() {
  const { t } = useTranslation();
  const bars = useMemo(() => [42, 75, 62, 88, 54], []);
  const notes = useMemo(() => [
    t('teacherPerformanceNoteAccuracy'),
    t('teacherPerformanceNoteNeedsRetry'),
    t('teacherPerformanceNoteRankProgression'),
  ], [t]);

  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherPerformanceTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherPerformanceSubtitle')}</p>
        </div>
      </div>
      <div className="chart-bars">
        {bars.map((height, index) => (
          <span key={`perf-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="list">
        {notes.map((note) => (
          <div key={note}>{note}</div>
        ))}
      </div>
    </article>
  );
}
