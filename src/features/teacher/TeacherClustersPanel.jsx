import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

export default function TeacherClustersPanel({
  filters,
  onFilterChange,
  clusters,
  onCreateCluster,
  onClusterAction,
}) {
  const { t } = useTranslation();
  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherClusterTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherClusterSubtitle')}</p>
        </div>
        <button type="button" className="teacher-btn ghost" onClick={onCreateCluster}>{t('teacherClusterCreate')}</button>
      </div>

      <div className="teacher-filter-row">
        <select
          className="teacher-select"
          value={filters.grade}
          onChange={(event) => onFilterChange('grade', event.target.value)}
        >
          <option value="All">{t('teacherFilterAllClasses')}</option>
          <option value="Grade 4">{t('teacherFilterGrade4')}</option>
          <option value="Grade 5">{t('teacherFilterGrade5')}</option>
          <option value="Grade 6">{t('teacherFilterGrade6')}</option>
        </select>
        <select
          className="teacher-select"
          value={filters.band}
          onChange={(event) => onFilterChange('band', event.target.value)}
        >
          <option value="All">{t('teacherFilterAllBands')}</option>
          <option value="Top">{t('teacherFilterTopPerformers')}</option>
          <option value="Mid">{t('teacherFilterMidPerformers')}</option>
          <option value="Low">{t('teacherFilterLowPerformers')}</option>
        </select>
        <select
          className="teacher-select"
          value={filters.activity}
          onChange={(event) => onFilterChange('activity', event.target.value)}
        >
          <option value="All">{t('teacherFilterAllActivity')}</option>
          <option value="Active">{t('teacherFilterActiveWeek')}</option>
          <option value="Drop">{t('teacherFilterRecentDrop')}</option>
        </select>
        <select
          className="teacher-select"
          value={filters.region}
          onChange={(event) => onFilterChange('region', event.target.value)}
        >
          <option value="All">{t('teacherFilterAllRegions')}</option>
          <option value="Jaipur">{t('teacherFilterRegionJaipur')}</option>
          <option value="Kota">{t('teacherFilterRegionKota')}</option>
          <option value="Udaipur">{t('teacherFilterRegionUdaipur')}</option>
        </select>
      </div>

      <div className="teacher-cluster-list">
        {clusters.map((cluster) => (
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
                onClick={() => onClusterAction('assign', cluster)}
              >
                {t('teacherClusterAssignQuiz')}
              </button>
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => onClusterAction('message', cluster)}
              >
                {t('teacherClusterMessage')}
              </button>
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => onClusterAction('export', cluster)}
              >
                {t('teacherClusterExportCsv')}
              </button>
              <button
                type="button"
                className="teacher-btn ghost"
                onClick={() => onClusterAction('review', cluster)}
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
