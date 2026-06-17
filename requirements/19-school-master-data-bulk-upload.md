# School Master Upload Wireframe Requirements

## Purpose

Provide an Admin Dashboard screen for uploading, validating, importing, and auditing school master data using the flow shown in `school-master-upload_wf.html`.

## User

- Admin

## Wireframe Flow

### 1. Upload Type Selection

```text
+--------------------------------------------------+
| 1. Upload Type Selection                         |
+--------------------------------------------------+
| Upload Type                                      |
| [ State ] [ District ] [ Block ] [ CRC ]         |
| [ Village ] [ School ]                           |
|                                                  |
| Active: School                                   |
+--------------------------------------------------+
```

- Admin can select one upload type.
- Available upload types are State, District, Block, CRC, Village, and School.
- The selected upload type is visually highlighted.
- The active upload type is shown as a status badge.
- Required fields update dynamically based on the selected upload type.

### 2. File Upload

```text
+--------------------------------------------------+
| 2. File Upload                                   |
+--------------------------------------------------+
| CSV/XLSX drag-and-drop area                      |
| [ Choose File ]                                  |
|                                                  |
| Uploaded File Information                        |
| Unsupported File Type Error                      |
+--------------------------------------------------+
```

- Admin can choose a file from the device.
- Admin can drag and drop a file into the upload area.
- Supported file types are CSV and XLSX.
- The UI shows uploaded file information:
  - File name
  - File size
  - File type
  - Detected row count
- The UI shows an inline unsupported file type error when an invalid file is selected.

### 3. Template and Required Fields

```text
+--------------------------------------------------+
| 3. Template and Required Fields                  |
+--------------------------------------------------+
| [ Download Template ]                            |
|                                                  |
| school_code school_name school_type village_code |
| crc_code block_code district_code state_code     |
+--------------------------------------------------+
```

- Admin can download a template for the selected upload type.
- The UI shows the required columns for the selected upload type.
- For School upload, the visible required fields are:
  - `school_code`
  - `school_name`
  - `school_type`
  - `village_code`
  - `crc_code`
  - `block_code`
  - `district_code`
  - `state_code`

### 4. Validation Preview Summary

```text
+--------------------------------------------------+
| 4. Validation Preview Summary                    |
+--------------------------------------------------+
| Total Records: 1,246                             |
| Valid Records: 1,188                             |
| Missing Fields: 24                               |
+--------------------------------------------------+
```

- The UI shows summary cards after file validation.
- The visible summary cards are:
  - Total Records
  - Valid Records
  - Missing Fields

### 5. Import Confirmation Popup

```text
+--------------------------------------------------+
| 5. Import Confirmation Popup                     |
+--------------------------------------------------+
| Confirm School Master Import                     |
| Import 1,188 valid School records...?            |
|                                                  |
| [ Cancel ] [ Import Records ]                    |
+--------------------------------------------------+
```

- The UI shows a confirmation popup before importing validated records.
- The confirmation message includes:
  - Upload type
  - Valid record count
  - Uploaded file name
  - Note that skipped records remain in the error report
- Admin can cancel the import.
- Admin can import records.

### 6. Import Complete Screen

```text
+--------------------------------------------------+
| 6. Import Complete Screen                        |
+--------------------------------------------------+
| Import Complete                                  |
| 1,188 records imported. 58 records skipped.      |
|                                                  |
| Imported Records: 1,188                          |
| Skipped Records: 58                              |
|                                                  |
| [ View Master Data ]                             |
+--------------------------------------------------+
```

- The UI shows an import complete state.
- The UI shows imported record count.
- The UI shows skipped record count.
- Admin can navigate to View Master Data.

### 7. Upload History

```text
+--------------------------------------------------+
| 7. Upload History                                |
+--------------------------------------------------+
| Upload Type Filter | Status Filter | Date Filter |
|                                                  |
| Date | Upload Type | File | Status | Imported    |
| Skipped | Details                                |
+--------------------------------------------------+
```

- The UI shows upload history.
- The UI provides filters for:
  - Upload Type
  - Status
  - Date
- The history table shows:
  - Date
  - Upload Type
  - File
  - Status
  - Imported
  - Skipped
  - Details action
- Admin can refresh upload history.
- Admin can open a history row.

### 8. Upload Details Popup

```text
+--------------------------------------------------+
| 8. Upload Details Popup                          |
+--------------------------------------------------+
| Type: School                                     |
| File: school_master_jaipur.csv                   |
| Status: Complete                                 |
| Imported: 1,188 records                          |
| Skipped: 58 records                              |
|                                                  |
| [ Download Report ] [ Close ]                    |
+--------------------------------------------------+
```

- The UI shows details for an upload history row.
- Upload details include:
  - Type
  - File
  - Status
  - Imported records
  - Skipped records
- Admin can download a report.
- Admin can close the details popup.

### 9. UX States

```text
+--------------------------------------------------+
| 9. UX States                                     |
+--------------------------------------------------+
| Success toast                                    |
| API loading state                                |
| No Upload History                                |
| API Failure                                      |
+--------------------------------------------------+
```

- The UI shows a success toast state.
- The UI shows an API loading state.
- The UI shows an empty upload history state.
- The UI shows an API failure state with Retry Validation action.
- The screen must remain responsive on desktop, tablet, and mobile.

## Upload Types

| Upload Type | Visible Required Fields |
| --- | --- |
| State | `state_code`, `state_name` |
| District | `district_code`, `district_name`, `state_code` |
| Block | `block_code`, `block_name`, `state_code`, `district_code` |
| CRC | `crc_code`, `crc_name`, `state_code`, `district_code`, `block_code` |
| Village | `village_code`, `village_name`, `state_code`, `district_code`, `block_code`, `crc_code` |
| School | `school_code`, `school_name`, `school_type`, `village_code`, `crc_code`, `block_code`, `district_code`, `state_code` |

## Functional Requirements

- The system shall show the School Master Upload workflow inside the Admin Dashboard.
- The system shall allow Admin to select State, District, Block, CRC, Village, or School as the upload type.
- The system shall highlight the selected upload type.
- The system shall show an active upload type badge.
- The system shall support CSV and XLSX file selection.
- The system shall support drag-and-drop file upload.
- The system shall show uploaded file metadata.
- The system shall show an inline unsupported file type error.
- The system shall provide a Download Template action.
- The system shall show required columns for the selected upload type.
- The system shall show a validation preview summary with total, valid, and missing-field counts.
- The system shall show an import confirmation popup.
- The system shall show an import complete screen with imported and skipped record counts.
- The system shall show upload history with filters and a details action.
- The system shall show an upload details popup.
- The system shall provide a Download Report action from upload details.
- The system shall show success, loading, empty, and API failure states.
- The system shall be responsive across screen sizes.

## Acceptance Criteria

- Admin can view the School Master Upload workflow from the Admin Dashboard.
- Admin can switch between all six upload types.
- Required field chips change according to the selected upload type.
- Admin can choose or drop a CSV/XLSX file.
- Invalid file type feedback is shown inline.
- Admin can download a template.
- Validation summary displays Total Records, Valid Records, and Missing Fields.
- Import confirmation popup displays Cancel and Import Records actions.
- Import complete screen displays imported and skipped record counts.
- Upload history displays Date, Upload Type, File, Status, Imported, Skipped, and Details.
- Upload details popup displays Type, File, Status, Imported, and Skipped.
- UX states for success, loading, empty history, and API failure are represented.

## Out Of Scope For This Wireframe

The following items are not active visible functionality in `school-master-upload_wf.html` and should not be required by this file:

- Column mapping
- Validate File button section
- Validation processing loader section
- Duplicate records summary card
- Invalid parent references summary card
- Error records grid
- Import button disabled/enabled state section
- Spreadsheet task coverage section
- School-code lookup during onboarding
- Uploaded by field in upload history
- Role behavior for Super Admin
