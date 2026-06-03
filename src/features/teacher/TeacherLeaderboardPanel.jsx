import React, { useMemo, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import SegmentedControl from '../../components/SegmentedControl';

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

export default function TeacherLeaderboardPanel({ scoreFormula } = {}) {
  const { t } = useTranslation();
  const levels = [
    { value: 'School', label: t('teacherLeaderboardLevelSchool') },
    { value: 'Block', label: t('teacherLeaderboardLevelBlock') },
    { value: 'District', label: t('teacherLeaderboardLevelDistrict') },
    { value: 'State', label: t('teacherLeaderboardLevelState') },
  ];

  const [activeLevel, setActiveLevel] = useState('School');

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

  const rows = leaderboardData[activeLevel] || [];

  return (
    <article className="panel teacher-panel">
      <div className="teacher-panel-header">
        <div>
          <h3 className="teacher-panel-title">{t('teacherLeaderboardTitle')}</h3>
          <p className="teacher-panel-subtitle">{t('teacherLeaderboardSubtitle')}</p>
        </div>
      </div>

      <SegmentedControl options={levels} value={activeLevel} onChange={setActiveLevel} />
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
