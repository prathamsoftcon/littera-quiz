import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import TeacherHero from '../../components/teacher/TeacherHero';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherStatCard from '../../components/teacher/TeacherStatCard';
import QuestionSubmissionPanel from '../../features/teacher/QuestionSubmissionPanel';
import StudentPerformancePanel from '../../features/teacher/StudentPerformancePanel';
import TeacherClustersPanel from '../../features/teacher/TeacherClustersPanel';
import TeacherLeaderboardPanel from '../../features/teacher/TeacherLeaderboardPanel';
import './TeacherPage.css';

// Feature components manage their own state now

export default function TeacherPage() {
  const { t } = useTranslation();
  const teacherStats = [
    { label: t('teacherStatStudentsEnrolled'), value: 124, helper: t('teacherStatHelperActiveRoster'), tone: 'teal' },
    { label: t('teacherStatQuestionsSubmitted'), value: 42, helper: t('teacherStatHelperThisTerm'), tone: 'blue' },
    { label: t('teacherStatApprovedQuestions'), value: 38, helper: t('teacherStatHelperQualityPass'), tone: 'green' },
    { label: t('teacherStatTeacherRank'), value: '#12', helper: t('teacherStatHelperBlockLevel'), tone: 'amber' },
  ];
  const [activeModule, setActiveModule] = useState('clusters');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    return () => {
      // cleanup handled by feature components where applicable
    };
  }, []);
  // feature components handle their own actions; they can call setActionMessage via onAction

  const heroActions = [
    { label: t('teacherActionCreateQuestion'), onClick: () => setActiveModule('submission') },
    { label: t('teacherActionViewLeaderboard'), variant: 'ghost', onClick: () => setActiveModule('leaderboard') },
  ];

  const sidebarItems = [
    { key: 'clusters', label: t('teacherSidebarClusters') },
    { key: 'leaderboard', label: t('teacherSidebarLeaderboard') },
    { key: 'submission', label: t('teacherSidebarSubmission') },
    { key: 'performance', label: t('teacherSidebarPerformance') },
  ];

  return (
    <section className="screen teacher-screen">
      <div className="teacher-workspace">
        <TeacherSidebar
          title={t('teacherModulesTitle')}
          items={sidebarItems}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
        />
        <div className="teacher-content-column">
          <TeacherHero
            eyebrow={t('teacherEyebrow')}
            title={t('teacherTitle')}
            actions={heroActions}
          />

          {actionMessage ? (
            <div className="status-strip" role="status">
              {actionMessage}
            </div>
          ) : null}

          <div className="teacher-stack">
            <div className="teacher-stat-grid">
              {teacherStats.map((stat) => (
                <TeacherStatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  helper={stat.helper}
                  tone={stat.tone}
                />
              ))}
            </div>
          </div>

          {activeModule === 'clusters' ? (
            <TeacherClustersPanel onAction={setActionMessage} />
          ) : null}

          {activeModule === 'leaderboard' ? (
            <TeacherLeaderboardPanel scoreFormula={t('teacherLeaderboardScoreFormula')} />
          ) : null}

          {activeModule === 'submission' ? (
            <QuestionSubmissionPanel onAction={setActionMessage} />
          ) : null}

          {activeModule === 'performance' ? (
            <StudentPerformancePanel />
          ) : null}
        </div>
      </div>
    </section>
  );
}
