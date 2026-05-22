import React from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import StudentPage from './pages/Student/StudentPage';
import TeacherPage from './pages/Teacher/TeacherPage';
import AdminPage from './pages/Admin/AdminPage';
import MobilePreviewPage from './pages/Mobile/MobilePreviewPage';
import QuestionEditorPage from './pages/QuestionBank/QuestionEditorPage';
import BulkUploadPage from './pages/QuestionBank/BulkUploadPage';
import ApprovalQueuePage from './pages/QuestionBank/ApprovalQueuePage';

// Additional pages per requirements mapping
import LeaderboardsPage from './pages/Leaderboards/LeaderboardsPage';
import RewardsPage from './pages/Rewards/RewardsPage';
import MatchLobbyPage from './pages/Match/MatchLobbyPage';
import MatchRoomPage from './pages/Match/MatchRoomPage';
import SettingsPage from './pages/Settings/SettingsPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import MasterUploadPage from './pages/Admin/MasterUploadPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mobile" element={<MobilePreviewPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/lobby" element={<MatchLobbyPage />} />
        <Route path="/match/:id" element={<MatchRoomPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/master-upload" element={<MasterUploadPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/question-bank/create" element={<QuestionEditorPage />} />
        <Route path="/question-bank/bulk" element={<BulkUploadPage />} />
        <Route path="/question-bank/approval" element={<ApprovalQueuePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}
