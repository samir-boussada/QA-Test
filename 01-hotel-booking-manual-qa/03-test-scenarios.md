# 🎯 High-Level Test Scenarios

**Project:** Shady Meadows B&B Hotel Reservation Platform  
**Document ID:** TS-SMB-001  

Test Scenarios represent high-level test conditions and workflows designed to verify end-to-end user journeys and system integrity across all major application modules.

---

## Module 1: Room Catalog & Browsing (`TS_ROOM`)

| Scenario ID | Test Scenario Description | Objective |
| :--- | :--- | :--- |
| **TS_ROOM_01** | Verify landing page displays all hotel metadata and room cards accurately. | Validate that all published rooms render with image, room name, description, amenities, and nightly price. |
| **TS_ROOM_02** | Verify visual indicators and accessibility attributes of room features. | Ensure badges (e.g., Wi-Fi, TV, Safe, Accessible) are legible and render appropriate icons/labels. |
| **TS_ROOM_03** | Verify responsive layout of room cards on various screen widths. | Confirm room catalog maintains readable layout and does not clip elements on desktop and mobile viewports. |

---

## Module 2: Booking Engine & Calendar (`TS_BOOK`)

| Scenario ID | Test Scenario Description | Objective |
| :--- | :--- | :--- |
| **TS_BOOK_01** | Verify booking drawer/calendar expands upon clicking "Book this room". | Ensure interactive booking widget is rendered dynamically without page reload. |
| **TS_BOOK_02** | Verify calendar date selection constraints for past dates. | Ensure historical dates cannot be highlighted or selected for reservations. |
| **TS_BOOK_03** | Verify total price calculation logic for single-night and multi-night stays. | Confirm that `Total Price = Room Price per Night * Number of Nights`. |
| **TS_BOOK_04** | Verify date range validation when check-out date is set on or before check-in date. | Ensure booking system prevents inverted or zero-night reservations with explicit validation. |
| **TS_BOOK_05** | Verify cross-month and month-end boundary date selection. | Ensure selecting a stay spanning between the last day of one month and the beginning of the next works seamlessly. |
| **TS_BOOK_06** | Verify complete end-to-end booking reservation workflow with valid data. | Validate that entering valid guest details and dates generates a confirmed booking modal. |

---

## Module 3: Guest Reservation Form Validation (`TS_FORM`)

| Scenario ID | Test Scenario Description | Objective |
| :--- | :--- | :--- |
| **TS_FORM_01** | Verify first name and last name field character length boundaries and sanitization. | Ensure boundary limits (min 3 chars) are enforced and script tags/HTML injections are escaped. |
| **TS_FORM_02** | Verify email address input validation against valid and malformed syntaxes. | Ensure standard email addresses are accepted while missing `@` or domain parts are rejected. |
| **TS_FORM_03** | Verify phone number field accepts valid digits and rejects non-numeric characters. | Ensure only numeric digits (11–21 characters) can be submitted. |
| **TS_FORM_04** | Verify behavior when submitting booking form with all fields blank. | Confirm that inline error banners or highlighted alerts clearly instruct user on missing fields. |

---

## Module 4: Contact & Customer Inquiries (`TS_CONT`)

| Scenario ID | Test Scenario Description | Objective |
| :--- | :--- | :--- |
| **TS_CONT_01** | Verify successful message transmission through Contact Us form. | Ensure user receives success banner: "Thanks for getting in touch...". |
| **TS_CONT_02** | Verify validation messages when mandatory inquiry fields are missing. | Confirm appropriate error alerts display for each missing field. |
| **TS_CONT_03** | Verify form stability under maximum character boundary payloads. | Ensure sending long text messages (up to 2000 chars) does not trigger 500 server crashes. |

---

## Module 5: Admin Portal & Management (`TS_ADMIN`)

| Scenario ID | Test Scenario Description | Objective |
| :--- | :--- | :--- |
| **TS_ADMIN_01** | Verify administrator login with valid credentials. | Ensure admin user is granted access to room and booking management dashboard. |
| **TS_ADMIN_02** | Verify login rejection with invalid credentials and SQL injection payloads. | Ensure unauthorized access is prevented with clear error feedback and no stack traces exposed. |
| **TS_ADMIN_03** | Verify room creation functionality with customized attributes. | Validate that newly added rooms appear in admin room list and public catalog. |
| **TS_ADMIN_04** | Verify user experience when attempting to leave room edit mode with unsaved changes. | Ensure dirty form state triggers a confirmation dialog to prevent accidental data loss. |
