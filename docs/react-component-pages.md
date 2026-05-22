# React Project: Components & Pages (concise)

Purpose: Short, actionable list mapping components -> files and pages -> routes for a React project scaffold based on the wireframes and existing `globalcontentlibrary`.

## Top-level folders
- `src/components/` — all reusable UI components
- `src/pages/` — route pages (one folder per major area)
- `src/layouts/` — `MainLayout.jsx` (Topbar + container)
- `src/hooks/`, `src/services/`, `src/styles/`, `src/utils/`

## Component list (files under `src/components/`)
- `Topbar.jsx` — header + role tabs
- `RoleTabs.jsx`
- `MainLayout.jsx` (can live in `layouts`)
- `Panel.jsx` — generic card wrapper
- `StepFlow.jsx` — step indicator
- `SegmentedControl.jsx` — segmented button group
- `Input.jsx`, `Textarea.jsx`, `LookupRow.jsx`
- `OTPBoxes.jsx`
- `Grid.jsx` / `PanelGrid.jsx`
- `MetricRow.jsx`, `ListBlock.jsx`, `StatusStrip.jsx`
- `Board.jsx` — game board component
- `QuestionCard.jsx`
- `UploadBox.jsx`, `FileDrop.jsx`
- `ValidationPreview.jsx`
- `QueueTable.jsx`, `ReviewRow.jsx`, `ReviewDetail.jsx`
- `QuestionForm.jsx` — wrapper for question editor
- `MCQOptions.jsx`, `FillAnswer.jsx`, `MatchPairs.jsx`, `MediaAnswer.jsx`
- `AnswerPanels.jsx` — orchestrator for answer variants
- `ContentLibraryWrappers/ContentCardWrapper.jsx` — adapters reusing `globalcontentlibrary` components (ContentCard, ContentGrid, UploadContentDrawer)
- `PhonePreview.jsx` — mobile preview
- `SearchBar.jsx`, `Pagination.jsx`, `Modal.jsx`, `Drawer.jsx`, `Toast.jsx`, `ButtonPrimary.jsx`

## Pages list (files under `src/pages/`)
- `App.jsx` — router + top-level routes
- `pages/Onboarding/OnboardingPage.jsx` — includes: `LoginPanel`, `OTPPanel`, `RoleRouting`, `StudentOnboarding`, `TeacherOnboarding`, `AccessConfirmation`
- `pages/Student/StudentPage.jsx` — `Dashboard`, `MatchLobby`, `GameBoard` (subcomponents as needed)
- `pages/Leaderboards/LeaderboardsPage.jsx` — student & teacher leaderboards
- `pages/Teacher/TeacherPage.jsx` — `TeacherDashboard`, `QuestionSubmissionPage`, `StudentPerformance`
- `pages/Admin/AdminPage.jsx` — `ApprovalQueuePage`, `LiveMonitoring`, `Analytics`, `MasterUpload`
- `pages/Mobile/MobilePreviewPage.jsx`
- `pages/QuestionBank/Index.jsx` — routes: `/question-bank` root
  - `pages/QuestionBank/QuestionEditorPage.jsx` — create/edit question
  - `pages/QuestionBank/BulkUploadPage.jsx` — CSV/XLSX upload + validate
  - `pages/QuestionBank/ApprovalQueuePage.jsx` — pending list + review panel
  - `pages/QuestionBank/ApprovedBankPage.jsx` — searchable approved questions
- `pages/ContentLibrary/ContentLibraryPage.jsx` — wrapper that reuses `globalcontentlibrary/pages/GlobalContentLibraryPage.jsx`
- `pages/NotFound.jsx`

## Example route mapping
- `/` → `OnboardingPage`
- `/student` → `StudentPage`
- `/leaderboards` → `LeaderboardsPage`
- `/teacher` → `TeacherPage`
- `/admin` → `AdminPage`
- `/mobile` → `MobilePreviewPage`
- `/question-bank` → `QuestionBank/Index.jsx` (with nested routes `/create`, `/bulk`, `/approval`, `/bank`)
- `/content-library` → `ContentLibraryPage`

## Quick props/state notes (short)
- `QuestionForm.jsx`: props: `initialData?`, `onSave`; state: `{ type, text, meta, options[], correct }`
- `QueueTable.jsx`: props: `rows[]`, `onSelect`, `filters`
- `UploadBox.jsx`: props: `onFile(file)`, `accepted=['.csv','.xlsx']`



