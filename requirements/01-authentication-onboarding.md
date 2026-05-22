# Authentication and Onboarding Requirements

## Purpose

Allow students, teachers, and admins to securely access the platform with role-based experiences and complete structured student registration for regional leaderboard mapping. School and regional data can be fetched from master data based on school code.

## Users

- Student
- Teacher
- Admin

## Step-wise Wireframe Flow

### Step 1: Login Entry Screen

```text
+--------------------------------------------------+
| Littera Quiz                                     |
| Secure login for students, teachers, and admins  |
+--------------------------------------------------+
| Login Method                                     |
| [ OTP Login (Mobile / Email) ] [ Google Login ] |
|                                                  |
| Mobile Number / Email                            |
| [ +91 __________________ ] / [ name@example.com ]|
|                                                  |
| [ Send OTP ]                                     |
|                                                  |
| New student? Complete profile after login        |
+--------------------------------------------------+
```

- Primary action: Send OTP or continue with Google.
- System checks whether the user already exists.
- Existing users are routed by role: Student, Teacher, or Admin.
- New student users continue to structured onboarding.

### Step 2: OTP Verification Screen

```text
+--------------------------------------------------+
| Verify OTP                                       |
+--------------------------------------------------+
| OTP sent to +91 XXXXX XXXXX  OR  user@email.com  |
| [ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]              |
|                                                  |
| [ Verify and Continue ]                          |
| Resend OTP                                       |
+--------------------------------------------------+
```

- Primary action: Verify and Continue.
- Invalid OTP shows inline error.
- OTP can be delivered to either the mobile number or the email address provided.
- Successful verification checks role and onboarding completion.

### Step 3: Role Routing Screen

```text
+--------------------------------------------------+
| Preparing Your Dashboard                         |
+--------------------------------------------------+
| Role detected: Student / Teacher / Admin         |
| Profile status: Complete / Incomplete            |
|                                                  |
| Next: Dashboard or Student Onboarding            |
+--------------------------------------------------+
```

- Student with incomplete profile is blocked from quiz participation.
- Teacher is routed to teacher dashboard and student enrollment tools.
- Admin is routed to admin control center.

### Step 4: Student Onboarding Screen

```text
+--------------------------------------------------+
| Complete Student Profile                         |
+--------------------------------------------------+
| Student Name     [ __________________ ]          |
| Email Address    [ __________________ ]          |
| Mobile Number    [ __________________ ]          |
| School Code      [ ____________ ] [ Fetch ]      |
| School Name      [ Auto-filled ]                 |
| Village          [ Auto-filled ]                 |
| CRC              [ Auto-filled ]                 |
| Block            [ Auto-filled ]                 |
| District         [ Auto-filled ]                 |
|                                                  |
| [ Save and Continue ]                            |
+--------------------------------------------------+
```

- All mandatory fields must be completed.
- School name and geography fields should be fetched from master data based on school code.
- If school code is invalid or not found, the system shows an inline error and prevents onboarding completion.
- Saved regional data powers Block, District, Zone, and State leaderboards.

### Step 5: Access Confirmation Screen

- Access request will be confirmed by Admin or Super Admin only. Access  will be based on access role  village, crc,block,district,state
village role will allow access to 

- Based on school code, village-level mapping is automatically applied.

```text
+--------------------------------------------------+
| Profile Complete                                 |
+--------------------------------------------------+
| Student mapped to:                               |
| Village -> CRC -> Block -> District              |
|                                                  |
| [ Go to Dashboard ]                              |
+--------------------------------------------------+
```

- Student can now join eligible quiz slots.
- Teacher-enrolled students are linked to the teacher account.
- Regional mapping becomes available for reporting and leaderboard logic.
-Teacher may have two role 1. teacher 2. admin . To participate in quiz  teacher role is must.

## Functional Requirements

- The system shall support OTP-based login using mobile number.
- The system shall support OAuth login, including Google authentication.
 - The system shall support OTP-based login using mobile number or email.
 - The system shall support OAuth login, including Google authentication.
- The system shall assign users to role-based access: Student, Teacher, or Admin.
- The system shall require structured onboarding for every student.
- The system shall fetch school name and regional hierarchy from school and geography master data based on school code.
- Student onboarding shall capture:
  - Student name
  - Email address
  - Mobile number
  - School code
  - School name
  - Village
  - CRC
  - Block
  - District
- The system shall validate mandatory fields before allowing quiz participation.
- The system shall validate school code before saving onboarding details.
- The system shall map each student to regional hierarchy for leaderboards and reporting.
- Teachers shall be able to enroll students under their account.

## Acceptance Criteria

- A user can log in with OTP and reach the correct role dashboard.
- A user can log in with OAuth and reach the correct role dashboard.
 - A user can log in with OTP sent to mobile or email and reach the correct role dashboard.
 - A user can log in with OAuth (Google) and reach the correct role dashboard.
- A student cannot join a quiz until mandatory onboarding data is complete.
- Entering a valid school code auto-populates School Name, Village, CRC, Block, and District.
- Entering an invalid school code shows an error and blocks onboarding completion.
- Student regional data is available for Block, District, Zone, and State leaderboard calculations.
- Teacher-enrolled students are counted toward teacher engagement metrics.

## Dependencies

- User identity service
- OTP provider
- OAuth provider
- School and geography master data
