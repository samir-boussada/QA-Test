# 🗺️ Requirements Traceability Matrix (RTM)

**Project:** Shady Meadows B&B Hotel Reservation Platform  
**Document ID:** RTM-SMB-001  
**Last Updated:** Current Test Cycle  

The Requirements Traceability Matrix ensures that every functional and business requirement has corresponding test coverage and tracks execution status and associated defects.

---

## Traceability Mapping Table

| Req ID | Business / Functional Requirement Description | Test Scenario ID | Test Case ID | Test Type | Execution Status | Associated Defects |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-001** | Landing page must display hotel branding, address, contact details, and a list of available rooms with descriptions and prices. | `TS_ROOM_01` | `TC_ROOM_001` | Functional / UI | **Passed** | None |
| **REQ-002** | Room cards must accurately display room type, features (Wi-Fi, TV, Safe), and price per night. | `TS_ROOM_02` | `TC_ROOM_002` | Functional | **Passed** | None |
| **REQ-003** | Clicking "Book this room" must toggle the interactive booking calendar and guest reservation form. | `TS_BOOK_01` | `TC_BOOK_001` | Functional / UI | **Passed** | None |
| **REQ-004** | Booking calendar must disable past dates and prevent selection of dates prior to today. | `TS_BOOK_02` | `TC_BOOK_002` | Negative / BVA | **FAILED** | `BUG-001` |
| **REQ-005** | Total booking price must correctly multiply room price by the total number of nights selected. | `TS_BOOK_03` | `TC_BOOK_003` | Functional / Calculation | **FAILED** | `BUG-002` |
| **REQ-006** | System must prevent selecting a check-out date that is on or before the selected check-in date. | `TS_BOOK_04` | `TC_BOOK_004` | Negative / Logic | **FAILED** | `BUG-003` |
| **REQ-007** | Booking calendar must support cross-month date ranges without data corruption. | `TS_BOOK_05` | `TC_BOOK_005` | Boundary (BVA) | **Passed** | None |
| **REQ-008** | Guest form must require First Name (3-18 chars) and Last Name (3-30 chars). | `TS_FORM_01` | `TC_FORM_001`, `TC_FORM_002` | Functional / Boundary | **Passed** | None |
| **REQ-009** | Guest Email must validate standard RFC 5322 format (e.g., `user@domain.com`). | `TS_FORM_02` | `TC_FORM_003`, `TC_FORM_004` | Positive / Negative | **Passed** | None |
| **REQ-010** | Guest Phone must require 11 to 21 numerical digits and reject non-digit characters. | `TS_FORM_03` | `TC_FORM_005`, `TC_FORM_006` | Negative / ECP | **FAILED** | `BUG-004` |
| **REQ-011** | Successful booking must render a confirmation modal displaying reservation dates and confirmation code. | `TS_BOOK_06` | `TC_BOOK_006` | Functional (E2E) | **Passed** | None |
| **REQ-012** | Contact form must allow visitors to submit inquiries with valid Name, Email, Phone, Subject, and Message. | `TS_CONT_01` | `TC_CONT_001` | Functional | **Passed** | None |
| **REQ-013** | Contact form must reject submission with empty mandatory fields and highlight errors in red. | `TS_CONT_02` | `TC_CONT_002` | Negative / Validation | **Passed** | None |
| **REQ-014** | Contact form must handle character boundaries gracefully without unhandled application exceptions. | `TS_CONT_03` | `TC_CONT_003` | Boundary / Robustness | **FAILED** | `BUG-005` |
| **REQ-015** | Admin portal must authenticate valid credentials (`admin` / `password`) and grant access to dashboard. | `TS_ADMIN_01` | `TC_ADMIN_001` | Functional / Auth | **Passed** | None |
| **REQ-016** | Admin portal must reject invalid credentials and prevent unauthorized dashboard access. | `TS_ADMIN_02` | `TC_ADMIN_002` | Security / Negative | **Passed** | None |
| **REQ-017** | Admin can create new rooms specifying Room Number, Type, Accessible, Price, and Features. | `TS_ADMIN_03` | `TC_ADMIN_003` | Functional / CRUD | **Passed** | None |
| **REQ-018** | Admin editing room details should prompt a confirmation alert if user navigates away with unsaved changes. | `TS_ADMIN_04` | `TC_ADMIN_004` | Usability / UI | **FAILED** | `BUG-006` |

---

## 📈 Coverage Summary

* **Total Requirements Documented:** 18
* **Requirements with Test Coverage:** 18 (100% Coverage)
* **Requirements Passing Verification:** 12 (66.7%)
* **Requirements Failing Verification (Blocked by Defects):** 6 (33.3%)
