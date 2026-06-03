import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from '../../context/TranslationContext';

const clusterSeedRaw = [
  {
    id: 'c1',
    nameKey: 'teacherClusterNameLowAccuracy',
    noteKey: 'teacherClusterNoteLowAccuracy',
    size: 18,
    avgScore: 46,
    engagement: 58,
    suggested: true,
    grade: 'Grade 5',
    band: 'Low',
    activity: 'Drop',
    region: 'Jaipur',
  },
  {
    id: 'c2',
    nameKey: 'teacherClusterNameSpeedBoosters',
    noteKey: 'teacherClusterNoteSpeedBoosters',
    size: 22,
    avgScore: 71,
    engagement: 64,
    suggested: false,
    grade: 'Grade 6',
    band: 'Mid',
    activity: 'Active',
    region: 'Kota',
  },
  {
    id: 'c3',
    nameKey: 'teacherClusterNameTopPerformers',
    noteKey: 'teacherClusterNoteTopPerformers',
    size: 12,
    avgScore: 89,
    engagement: 81,
    suggested: true,
    grade: 'Grade 4',
    band: 'Top',
    activity: 'Active',
    region: 'Udaipur',
  },
];

export default function TeacherClustersPanel({ onAction } = {}) {
  const { t } = useTranslation();
  const [clusters, setClusters] = useState(clusterSeedRaw);
  const [filters, setFilters] = useState({ grade: 'All', band: 'All', activity: 'All', region: 'All' });
  const messageTimer = useRef(null);

  function showMessage(msg) {
    if (typeof onAction === 'function') onAction(msg);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => {
      if (typeof onAction === 'function') onAction('');
    }, 2800);
  }

  const filtered = useMemo(() => clusters.filter((cluster) => {
    if (filters.grade !== 'All' && cluster.grade !== filters.grade) return false;
    if (filters.band !== 'All' && cluster.band !== filters.band) return false;
    if (filters.activity !== 'All' && cluster.activity !== filters.activity) return false;
    if (filters.region !== 'All' && cluster.region !== filters.region) return false;
    return true;
  }), [clusters, filters]);

  const displayClusters = useMemo(() => filtered.map((cluster) => ({
    ...cluster,
    name: cluster.nameKey ? t(cluster.nameKey) : cluster.name,
    note: cluster.noteKey ? t(cluster.noteKey) : cluster.note,
  })), [filtered, t]);

  function handleCreateCluster() {
    const nextCluster = {
      id: `c-${Date.now()}`,
      nameKey: 'teacherClusterNewName',
      noteKey: 'teacherClusterNewNote',
      size: 0,
      avgScore: 0,
      engagement: 0,
      suggested: false,
      grade: 'Grade 5',
      band: 'Mid',
      activity: 'Active',
      region: 'Jaipur',
    };
    setClusters((prev) => [nextCluster, ...prev]);
    showMessage(t('teacherMessageClusterCreated'));
  }

  function handleClusterAction(action, cluster) {
    if (action === 'export') {
      const rows = [
        ['Cluster', 'Size', 'AvgScore', 'Engagement'],
        [cluster.name, cluster.size, cluster.avgScore, cluster.engagement],
      ];
      const csv = rows.map((row) => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cluster.name.replace(/\s+/g, '-')}-cluster.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showMessage(t('teacherMessageClusterExported').replace('{name}', cluster.name));
      return;
    }

    if (action === 'assign') {
      showMessage(t('teacherMessageClusterAssigned').replace('{name}', cluster.name));
      return;
    }
    if (action === 'message') {
      showMessage(t('teacherMessageClusterMessaged').replace('{name}', cluster.name));
      return;
    }
    if (action === 'review') {
      showMessage(t('teacherMessageClusterReviewed').replace('{name}', cluster.name));
    }
  }

  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherClusterTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherClusterSubtitle')}</p>
        </div>
        <button type="button" className="teacher-btn ghost" onClick={handleCreateCluster}>{t('teacherClusterCreate')}</button>
      </div>

      <div className="teacher-filter-row">
        <select
          className="teacher-select"
          value={filters.grade}
          onChange={(event) => setFilters((prev) => ({ ...prev, grade: event.target.value }))}
        >
          <option value="All">{t('teacherFilterAllClasses')}</option>
          <option value="Grade 4">{t('teacherFilterGrade4')}</option>
          <option value="Grade 5">{t('teacherFilterGrade5')}</option>
          <option value="Grade 6">{t('teacherFilterGrade6')}</option>
        </select>
        <select
          className="teacher-select"
          value={filters.band}
          onChange={(event) => setFilters((prev) => ({ ...prev, band: event.target.value }))}
        >
          <option value="All">{t('teacherFilterAllBands')}</option>
          <option value="Top">{t('teacherFilterTopPerformers')}</option>
          <option value="Mid">{t('teacherFilterMidPerformers')}</option>
          <option value="Low">{t('teacherFilterLowPerformers')}</option>
        </select>
        <select
          className="teacher-select"
          value={filters.activity}
          onChange={(event) => setFilters((prev) => ({ ...prev, activity: event.target.value }))}
        >
          <option value="All">{t('teacherFilterAllActivity')}</option>
          <option value="Active">{t('teacherFilterActiveWeek')}</option>
          <option value="Drop">{t('teacherFilterRecentDrop')}</option>
        </select>
        <select
          className="teacher-select"
          value={filters.region}
          onChange={(event) => setFilters((prev) => ({ ...prev, region: event.target.value }))}
        >
          <option value="All">{t('teacherFilterAllRegions')}</option>
          <option value="Jaipur">{t('teacherFilterRegionJaipur')}</option>
          <option value="Kota">{t('teacherFilterRegionKota')}</option>
          <option value="Udaipur">{t('teacherFilterRegionUdaipur')}</option>
        </select>
      </div>

      <div className="teacher-cluster-list">
        {displayClusters.map((cluster) => (
          <div key={cluster.id} className="teacher-cluster-card">
            <div className="teacher-cluster-main">
              <div>
                <div className="teacher-cluster-title">
                  <strong>{cluster.name}</strong>
                  {cluster.suggested ? <span className="teacher-chip">{t('teacherClusterSuggested')}</span> : null}
                </div>
                <p className="teacher-muted">{cluster.note}</p>
              </div>
              <div className="teacher-cluster-metrics">
                <div>
                  <span>{t('teacherClusterMetricSize')}</span>
                  <strong>{cluster.size}</strong>
                </div>
                <div>
                  <span>{t('teacherClusterMetricAvgScore')}</span>
                  <strong>{cluster.avgScore}%</strong>
                </div>
                <div>
                  <span>{t('teacherClusterMetricEngagement')}</span>
                  <strong>{cluster.engagement}%</strong>
                </div>
              </div>
            </div>
            <div className="teacher-inline-actions">
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => handleClusterAction('assign', cluster)}
              >
                {t('teacherClusterAssignQuiz')}
              </button>
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => handleClusterAction('message', cluster)}
              >
                {t('teacherClusterMessage')}
              </button>
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => handleClusterAction('export', cluster)}
              >
                {t('teacherClusterExportCsv')}
              </button>
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => handleClusterAction('review', cluster)}
              >
                {t('teacherClusterMarkReview')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
