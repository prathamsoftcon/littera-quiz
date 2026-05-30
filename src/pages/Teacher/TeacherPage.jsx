import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import TeacherHero from '../../components/teacher/TeacherHero';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherStatCard from '../../components/teacher/TeacherStatCard';
import QuestionSubmissionPanel from '../../features/teacher/QuestionSubmissionPanel';
import StudentPerformancePanel from '../../features/teacher/StudentPerformancePanel';
import TeacherClustersPanel from '../../features/teacher/TeacherClustersPanel';
import TeacherLeaderboardPanel from '../../features/teacher/TeacherLeaderboardPanel';
import './TeacherPage.css';

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

const leaderboardDataRaw = {
  School: [
    { rank: 1, name: 'Ms. Patel', students: 124, approved: 38, score: 612 },
    { rank: 2, name: 'Mr. Khan', students: 108, approved: 35, score: 562 },
    { rank: 3, name: 'Ms. Das', students: 96, approved: 28, score: 487 },
    { rank: 12, nameKey: 'teacherLeaderboardYou', students: 88, approved: 22, score: 416, isCurrent: true },
  ],
  Block: [
    { rank: 1, name: 'Ms. Sharma', students: 140, approved: 42, score: 668 },
    { rank: 2, name: 'Mr. Nair', students: 126, approved: 36, score: 604 },
    { rank: 3, name: 'Ms. Patel', students: 124, approved: 38, score: 612 },
    { rank: 12, nameKey: 'teacherLeaderboardYou', students: 88, approved: 22, score: 416, isCurrent: true },
  ],
  District: [
    { rank: 1, name: 'Ms. Singh', students: 182, approved: 54, score: 812 },
    { rank: 2, name: 'Mr. Verma', students: 168, approved: 48, score: 758 },
    { rank: 3, name: 'Ms. Sharma', students: 140, approved: 42, score: 668 },
    { rank: 26, nameKey: 'teacherLeaderboardYou', students: 88, approved: 22, score: 416, isCurrent: true },
  ],
  State: [
    { rank: 1, name: 'Ms. Rao', students: 240, approved: 72, score: 1012 },
    { rank: 2, name: 'Mr. Gill', students: 214, approved: 64, score: 932 },
    { rank: 3, name: 'Ms. Singh', students: 182, approved: 54, score: 812 },
    { rank: 64, nameKey: 'teacherLeaderboardYou', students: 88, approved: 22, score: 416, isCurrent: true },
  ],
};

const performanceBars = [42, 75, 62, 88, 54];

export default function TeacherPage() {
  const { t } = useTranslation();
  const teacherStats = [
    { label: t('teacherStatStudentsEnrolled'), value: 124, helper: t('teacherStatHelperActiveRoster'), tone: 'teal' },
    { label: t('teacherStatQuestionsSubmitted'), value: 42, helper: t('teacherStatHelperThisTerm'), tone: 'blue' },
    { label: t('teacherStatApprovedQuestions'), value: 38, helper: t('teacherStatHelperQualityPass'), tone: 'green' },
    { label: t('teacherStatTeacherRank'), value: '#12', helper: t('teacherStatHelperBlockLevel'), tone: 'amber' },
  ];
  const questionTypes = [
    { value: 'MCQ', label: t('teacherTypeMcq') },
    { value: 'Fill', label: t('teacherTypeFill') },
    { value: 'Match', label: t('teacherTypeMatch') },
    { value: 'Media', label: t('teacherTypeMedia') },
  ];
  const difficultyOptions = [
    { value: 'Easy', label: t('teacherDifficultyEasy') },
    { value: 'Medium', label: t('teacherDifficultyMedium') },
    { value: 'Hard', label: t('teacherDifficultyHard') },
  ];
  const leaderboardLevels = [
    { value: 'School', label: t('teacherLeaderboardLevelSchool') },
    { value: 'Block', label: t('teacherLeaderboardLevelBlock') },
    { value: 'District', label: t('teacherLeaderboardLevelDistrict') },
    { value: 'State', label: t('teacherLeaderboardLevelState') },
  ];
  const leaderboardData = useMemo(() => {
    return Object.fromEntries(
      Object.entries(leaderboardDataRaw).map(([level, rows]) => [
        level,
        rows.map((row) => ({
          ...row,
          name: row.nameKey ? t(row.nameKey) : row.name,
        })),
      ]),
    );
  }, [t]);
  const performanceNotes = [
    t('teacherPerformanceNoteAccuracy'),
    t('teacherPerformanceNoteNeedsRetry'),
    t('teacherPerformanceNoteRankProgression'),
  ];
  const [selectedType, setSelectedType] = useState('MCQ');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [questionText, setQuestionText] = useState('');
  const [answerData, setAnswerData] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [leaderboardLevel, setLeaderboardLevel] = useState('School');
  const [activeModule, setActiveModule] = useState('clusters');
  const [actionMessage, setActionMessage] = useState('');
  const [clusters, setClusters] = useState(clusterSeedRaw);
  const messageTimer = useRef(null);
  const [filters, setFilters] = useState({
    grade: 'All',
    band: 'All',
    activity: 'All',
    region: 'All',
  });

  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  const filteredClusters = useMemo(() => {
    return clusters.filter((cluster) => {
      if (filters.grade !== 'All' && cluster.grade !== filters.grade) return false;
      if (filters.band !== 'All' && cluster.band !== filters.band) return false;
      if (filters.activity !== 'All' && cluster.activity !== filters.activity) return false;
      if (filters.region !== 'All' && cluster.region !== filters.region) return false;
      return true;
    });
  }, [clusters, filters]);

  const displayClusters = useMemo(() => {
    return filteredClusters.map((cluster) => ({
      ...cluster,
      name: cluster.nameKey ? t(cluster.nameKey) : cluster.name,
      note: cluster.noteKey ? t(cluster.noteKey) : cluster.note,
    }));
  }, [filteredClusters, t]);

  function showMessage(message) {
    setActionMessage(message);
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }
    messageTimer.current = setTimeout(() => {
      setActionMessage('');
    }, 2800);
  }

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
    setActiveModule('clusters');
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

  function handleSaveDraft() {
    if (!questionText.trim()) {
      showMessage(t('teacherMessageDraftNeedQuestion'));
      return;
    }
    showMessage(t('teacherMessageDraftSaved'));
  }

  function handleSubmit() {
    if (!questionText.trim() || !category.trim() || !subCategory.trim()) {
      showMessage(t('teacherMessageSubmitMissing'));
      return;
    }
    showMessage(t('teacherMessageSubmitSuccess'));
    setQuestionText('');
    setCategory('');
    setSubCategory('');
    setMediaUrl('');
    setAnswerData('');
  }

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
            <TeacherClustersPanel
              filters={filters}
              onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
              clusters={displayClusters}
              onCreateCluster={handleCreateCluster}
              onClusterAction={handleClusterAction}
            />
          ) : null}

          {activeModule === 'leaderboard' ? (
            <TeacherLeaderboardPanel
              levels={leaderboardLevels}
              activeLevel={leaderboardLevel}
              onLevelChange={setLeaderboardLevel}
              rows={leaderboardData[leaderboardLevel]}
              scoreFormula={t('teacherLeaderboardScoreFormula')}
            />
          ) : null}

          {activeModule === 'submission' ? (
            <QuestionSubmissionPanel
              questionTypes={questionTypes}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              questionText={questionText}
              onQuestionTextChange={setQuestionText}
              answerData={answerData}
              onAnswerDataChange={setAnswerData}
              category={category}
              onCategoryChange={setCategory}
              subCategory={subCategory}
              onSubCategoryChange={setSubCategory}
              mediaUrl={mediaUrl}
              onMediaUrlChange={setMediaUrl}
              difficultyOptions={difficultyOptions}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
          ) : null}

          {activeModule === 'performance' ? (
            <StudentPerformancePanel bars={performanceBars} notes={performanceNotes} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
