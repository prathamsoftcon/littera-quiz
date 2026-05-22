# Requirements → Pages & Components Mapping

Purpose: Har requirement file ke liye short mapping — kaunse pages aur components banane chahiye, taaki implementation requirement-aligned ho.

Note: Component names follow the earlier `react-component-pages.md` convention.

1) 01-authentication-onboarding.md
- Pages: `OnboardingPage`
- Components: `LoginComponent` (OTP / Google buttons), `OTPVerification`, `RoleRouting`, `StudentOnboardingForm`, `TeacherOnboardingForm`, `AccessConfirmation`, `ProtectedRoute` (role-based)

2) 02-question-bank-approval.md
- Pages: `QuestionEditorPage`, `BulkUploadPage`, `ApprovalQueuePage`, `ApprovedBankPage`
- Components: `QuestionForm`, `AnswerPanels` (MCQ/Fill/Match/Media), `UploadBox`, `ValidationPreview`, `QueueTable`, `ReviewDetail`, `ContentLibraryWrappers`

3) 03-game-mechanics.md
- Pages: (part of) `StudentPage`, `GameMatchPage` (optional)
- Components: `Board`, `QuestionCard`, `Dice`, `Timer`, `ScoringService`, `MoveAnimation`, `MatchSummary`

4) 04-multiplayer-gameplay.md
- Pages: `MatchLobby` (under Student) and `MatchRoom`
- Components/Services: `MatchLobbyList`, `PlayerList`, `MatchManager` (service), `useRealtime` / `WebSocketService`, `PresenceIndicator`, `SyncHooks`

5) 05-student-leaderboards.md
- Pages: `LeaderboardsPage`
- Components: `LeaderboardFilter`, `LeaderboardTable`, `LeaderboardRow`, `Pagination`, `ExportCSV`

6) 06-teacher-module-leaderboard.md
- Pages: `TeacherLeaderboardPage` (or part of `LeaderboardsPage`)
- Components: `TeacherRow`, `SubmissionStats`, `ApprovalStats`, `FilterControls`

7) 07-notifications-announcements.md
- Pages: (global) `NotificationsPanel` / `AnnouncementsPage`
- Components/Services: `NotificationBell`, `Toast`, `InAppList`, `PushAdapter`, `NotificationsService`

8) 08-rewards-system.md
- Pages: `RewardsPage` / `ProfileRewards`
- Components: `BadgeCard`, `RewardsList`, `RedeemModal`, `ShareRewardModal`, `RewardsAPI`

9) 09-analytics-reporting.md
- Pages: `AnalyticsPage` (admin)
- Components: `Chart` (bar/line), `AnalyticsFilters`, `KPIBoxes`, `ExportControls`, `AnalyticsService`

10) 10-customization.md
- Pages: `SettingsPage`
- Components: `ThemeToggle`, `LanguageSelector`, `CustomizationForm`, `PreviewPanel`

11) 11-social-features.md
- Pages: (integrated) share features on `RewardsPage`, `QuestionShare`
- Components: `ShareButtons`, `InviteFlow`, `SocialAuth` (Google reuse), `SharePreview`

12) 12-realtime-system.md
- Cross-cutting: `useRealtime`, `WebSocketService`, `SyncQueue`, `PresenceIndicator`, `RealtimeMiddleware` (for conflict resolution)

13) 13-cheating-prevention.md
- Pages: `AdminMonitoringPage` (part of `AdminPage`)
- Components/Services: `MonitoringPanel`, `ViolationLogger`, `ClientChecks` (fullscreen/camera/tab), `AntiCheatService`, `AlertModal`

14) 14-slot-based-participation.md
- Pages: `SlotSchedulerPage` / `StudentPage` slot sections
- Components: `SlotList`, `SlotCard`, `JoinSlotButton`, `SlotValidator`, `SlotDetailModal`

15) 15-offline-low-network.md
- Pages: (app-level) `OfflineStatus` UI, `MobilePreviewPage` demo
- Components/Services: `OfflineManager`, `LocalCacheQueue`, `SyncOnReconnectButton`, `LowNetworkMode` toggle, `PrefetchService`

16) 16-mobile-app.md
- Pages: `MobilePreviewPage` and native integration adapters
- Components: `PhonePreview`, `BottomNav`, `NativeBridge` (Capacitor adapter), `OfflineSync` UI

17) 17-admin-control-center.md
- Pages: `AdminPage` (with subpanels)
- Components: `ApprovalQueue`, `LiveMonitoring`, `Analytics`, `MasterUpload`, `UploadPreview`, `AdminActions`

18) 18-scalability-architecture.md
- Docs/Tools: `HealthDashboard` (admin), `MetricsExporter`
- Components: `ScalingControls` (admin documentation UI), `ServiceStatusList`

19) 19-school-master-data-bulk-upload.md
- Pages: `MasterDataUploadPage` (under Admin)
- Components: `MasterUploadBox`, `CSVMapper`, `ParentCodeValidator`, `PreviewList`, `ConfirmImportButton`, `UploadReport`

20) 20-access-role.md
- Cross-cutting: `RoleBasedRouter`, `ProtectedRoute`, `AccessMatrix` component, `RoleSwitch` (admin)

---
Shared UI primitives (create once, reuse everywhere):
- `Topbar`, `Panel`, `StepFlow`, `SegmentedControl`, `Input`/`Textarea`, `OTPBoxes`, `UploadBox`, `Modal`, `Drawer`, `Toast`, `ButtonPrimary`, `SearchBar`, `Pagination`, `Chart` components, `ContentLibraryWrappers`.

Next step suggestions:
- Approve this mapping; I can then generate non-code page blueprints (MD files) for each page listing required props/data and acceptance criteria.
- Or I can start stubbing the pages/components in `src/` as code (you asked earlier for code stubs).
