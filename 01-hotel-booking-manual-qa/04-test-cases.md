# 🧪 Detailed Test Cases Execution Log

**Project:** Shady Meadows B&B Hotel Reservation Platform  
**Document ID:** TC-SMB-001  
**Cycle:** Sprint 1 Test Execution  
**Total Test Cases:** 26 | **Passed:** 20 | **Failed:** 6 | **Blocked:** 0  

---

## Summary of Priority Levels
* **P1 (High):** Critical core functionality directly affecting revenue, bookings, or data security.
* **P2 (Medium):** Secondary workflows, validation warnings, and edge-case behaviors.
* **P3 (Low):** Minor visual, cosmetic, or optional enhancements.

---

## Detailed Test Cases

### Module 1: Room Catalog & Browsing (`TC_ROOM`)

#### `TC_ROOM_001` - Verify Room Catalog Cards Display Correct Details
* **Priority:** P1
* **Pre-conditions:** Web application is launched and user is on the homepage.
* **Test Steps:**
  1. Navigate to `https://automationintesting.online/`.
  2. Scroll to the "Rooms" section.
  3. Observe the displayed room cards.
* **Test Data:** Standard demo catalog.
* **Expected Result:** Each room card displays: Room image, Room type (e.g. Single, Twin, Suite), amenities list (Wi-Fi, TV, etc.), price per night (e.g. £100), and "Book this room" button.
* **Actual Result:** As expected. All room cards and metadata rendered cleanly.
* **Status:** ✅ **PASS**

---

#### `TC_ROOM_002` - Verify Room Accessibility & Amenity Badges
* **Priority:** P2
* **Pre-conditions:** User is viewing room cards on the homepage.
* **Test Steps:**
  1. Inspect the room card titled "Accessible".
  2. Check for wheelchair-accessible icon/badge.
  3. Hover over amenity icons.
* **Test Data:** N/A
* **Expected Result:** Badges are distinct, clearly visible, and contrast meets WCAG AA standards.
* **Actual Result:** As expected.
* **Status:** ✅ **PASS**

---

#### `TC_ROOM_003` - Verify Responsive Layout on Mobile Viewport
* **Priority:** P2
* **Pre-conditions:** Browser developer tools open in responsive device emulation mode.
* **Test Steps:**
  1. Set viewport to 375 × 667 (iPhone SE) and 768 × 1024 (iPad).
  2. Scroll vertically through room listings.
* **Test Data:** Mobile viewports.
* **Expected Result:** Room cards stack vertically without horizontal scrollbar or clipping.
* **Actual Result:** Layout adjusted responsively, cards stacked cleanly.
* **Status:** ✅ **PASS**

---

### Module 2: Booking Engine & Calendar (`TC_BOOK`)

#### `TC_BOOK_001` - Verify Clicking "Book this room" Expands Booking Drawer
* **Priority:** P1
* **Pre-conditions:** User is on homepage.
* **Test Steps:**
  1. Locate the first room card.
  2. Click the "Book this room" button.
* **Test Data:** N/A
* **Expected Result:** The room card expands smoothly to reveal the interactive date calendar and guest reservation form. Button text changes or collapses on second click.
* **Actual Result:** As expected. Date calendar and input fields rendered immediately.
* **Status:** ✅ **PASS**

---

#### `TC_BOOK_002` - Verify Booking Calendar Rejects Past Dates Selection
* **Priority:** P1
* **Pre-conditions:** Booking drawer for a room is open.
* **Test Steps:**
  1. Click and drag or click dates that are prior to current local calendar day.
  2. Inspect whether past dates can be highlighted.
  3. Attempt to submit a booking with past dates.
* **Test Data:** `Check-in: [Yesterday's Date]`, `Check-out: [Today's Date]`.
* **Expected Result:** Past calendar days must be greyed out, unclickable, or return a validation message: "Cannot select past dates for booking."
* **Actual Result:** User is able to highlight past calendar days and proceed to submit reservation without validation block.
* **Status:** ❌ **FAIL** (Linked Defect: [`BUG-001`](05-bug-reports.md#bug-001))

---

#### `TC_BOOK_003` - Verify Total Price Calculation for Multi-Night Booking
* **Priority:** P1
* **Pre-conditions:** Room rate is defined at £100 per night.
* **Test Steps:**
  1. Open booking calendar for a £100/night room.
  2. Drag and select a 3-night duration (e.g., Oct 21 to Oct 24).
  3. Inspect the displayed total price before and after booking confirmation.
* **Test Data:** Nights: 3 | Rate: £100 | Expected Total: £300.
* **Expected Result:** Total amount displayed calculates as `3 nights * £100 = £300`.
* **Actual Result:** Booking summary only displays flat base rate £100, failing to multiply by the 3 nights duration.
* **Status:** ❌ **FAIL** (Linked Defect: [`BUG-002`](05-bug-reports.md#bug-002))

---

#### `TC_BOOK_004` - Verify System Rejects Check-out Date Earlier than Check-in Date
* **Priority:** P1
* **Pre-conditions:** Booking calendar open.
* **Test Steps:**
  1. Attempt to set Check-out date prior to Check-in date (or select date range backwards).
  2. Observe validation error or date picker constraints.
* **Test Data:** `Check-in: Oct 25, 2026`, `Check-out: Oct 22, 2026`.
* **Expected Result:** Calendar automatically swaps the dates, disallows inverted selection, or displays: "Check-out date must be after check-in date."
* **Actual Result:** Calendar allows selection; submission displays "NaN nights" or negative calculation without blocking submission.
* **Status:** ❌ **FAIL** (Linked Defect: [`BUG-003`](05-bug-reports.md#bug-003))

---

#### `TC_BOOK_005` - Verify Booking Selection Across Month Boundaries
* **Priority:** P2
* **Pre-conditions:** Booking calendar is open.
* **Test Steps:**
  1. Navigate to the end of the current month.
  2. Select Check-in on the last day of the month (e.g., Oct 31).
  3. Click "Next Month" arrow in calendar view.
  4. Select Check-out on the 3rd of the subsequent month (e.g., Nov 3).
* **Test Data:** Dates spanning Oct 31 to Nov 03 (3 nights).
* **Expected Result:** System maintains continuous date range selection across month transition.
* **Actual Result:** As expected. Days in both months remained highlighted properly.
* **Status:** ✅ **PASS**

---

#### `TC_BOOK_006` - Verify Complete Successful Booking with Valid Data
* **Priority:** P1
* **Pre-conditions:** Booking drawer is open, dates are future dates.
* **Test Steps:**
  1. Select 2 future nights on the calendar.
  2. Enter First Name: `John`.
  3. Enter Last Name: `Doe`.
  4. Enter Email: `johndoe.qa@example.com`.
  5. Enter Phone: `012345678901`.
  6. Click "Book" button.
* **Test Data:** See step 2-5 above.
* **Expected Result:** Booking completes successfully. Modal displays: "Booking Successful!" with confirmed dates and room type.
* **Actual Result:** As expected. Confirmation popup rendered with booking details.
* **Status:** ✅ **PASS**

---

#### `TC_BOOK_007` - Verify Double-Clicking "Book" Button Prevents Duplicate Reservations
* **Priority:** P2
* **Pre-conditions:** Booking form filled with valid data.
* **Test Steps:**
  1. Click the "Book" button rapidly twice in succession.
  2. Inspect the Network tab for POST requests.
* **Test Data:** Valid guest details.
* **Expected Result:** "Book" button disables immediately upon first click to prevent race condition and duplicate reservation records.
* **Actual Result:** Single request processed; button disabled state handled correctly.
* **Status:** ✅ **PASS**

---

### Module 3: Guest Reservation Form Validation (`TC_FORM`)

#### `TC_FORM_001` - Verify Minimum Character Limit on First and Last Names
* **Priority:** P2
* **Pre-conditions:** Booking drawer open, dates selected.
* **Test Steps:**
  1. Enter First Name: `Jo` (2 characters).
  2. Enter Last Name: `Do` (2 characters).
  3. Fill valid email and phone number.
  4. Click "Book".
* **Test Data:** First: `Jo`, Last: `Do`.
* **Expected Result:** Form submission is rejected with error: "Firstname should be between 3 and 18 characters" / "Lastname should be between 3 and 30 characters".
* **Actual Result:** Form displays red alert banners requiring minimum 3 characters.
* **Status:** ✅ **PASS**

---

#### `TC_FORM_002` - Verify Maximum Character Limit on First and Last Names
* **Priority:** P2
* **Pre-conditions:** Booking drawer open, dates selected.
* **Test Steps:**
  1. Enter First Name: 19 characters (`JohnathanAlexander1`).
  2. Enter Last Name: 31 characters.
  3. Fill valid email and phone number.
  4. Click "Book".
* **Test Data:** 19-char first name, 31-char last name.
* **Expected Result:** Fields reject characters beyond limit or display validation error on submit.
* **Actual Result:** Alert displays indicating character limit exceeded.
* **Status:** ✅ **PASS**

---

#### `TC_FORM_003` - Verify Email Address Format Validation (Positive)
* **Priority:** P1
* **Pre-conditions:** Booking form open.
* **Test Steps:**
  1. Enter valid email formats: `alex.smith@test.co.uk`, `user+tag@domain.com`.
  2. Fill remaining mandatory fields.
  3. Click "Book".
* **Test Data:** Standard compliant emails.
* **Expected Result:** All valid RFC standard email formats are accepted without error.
* **Actual Result:** Accepted successfully.
* **Status:** ✅ **PASS**

---

#### `TC_FORM_004` - Verify Email Address Format Validation (Negative)
* **Priority:** P1
* **Pre-conditions:** Booking form open.
* **Test Steps:**
  1. Test the following invalid email formats one by one:
     * `plainaddress`
     * `@missingusername.com`
     * `user@.domain`
     * `user@domain..com`
  2. Click "Book" for each.
* **Test Data:** Malformed email strings.
* **Expected Result:** Submission blocked with message: "must be a well-formed email address".
* **Actual Result:** Red alert displayed: "must be a well-formed email address".
* **Status:** ✅ **PASS**

---

#### `TC_FORM_005` - Verify Phone Number Length Boundary (11 to 21 digits)
* **Priority:** P2
* **Pre-conditions:** Booking form open.
* **Test Steps:**
  1. Enter phone number with 10 digits (`0123456789`).
  2. Click "Book".
  3. Enter phone number with 22 digits (`0123456789012345678901`).
  4. Click "Book".
* **Test Data:** 10 digits and 22 digits.
* **Expected Result:** Error message displayed: "Phone must be between 11 and 21 characters".
* **Actual Result:** Error messages displayed as expected.
* **Status:** ✅ **PASS**

---

#### `TC_FORM_006` - Verify Phone Field Rejects Alphabetical and Special Characters
* **Priority:** P2
* **Pre-conditions:** Booking form open.
* **Test Steps:**
  1. In the Phone field, enter: `+44-CALL-ME-NOW!`.
  2. Fill valid name and email.
  3. Click "Book".
* **Test Data:** `+44-CALL-ME-NOW!` (alphanumeric with symbols).
* **Expected Result:** Field rejects non-numeric input or displays validation error: "Phone number must contain only numeric digits".
* **Actual Result:** System accepts alphanumeric string and processes booking without error.
* **Status:** ❌ **FAIL** (Linked Defect: [`BUG-004`](05-bug-reports.md#bug-004))

---

#### `TC_FORM_007` - Verify Form Rejection on Empty Mandatory Fields
* **Priority:** P1
* **Pre-conditions:** Booking calendar opened.
* **Test Steps:**
  1. Leave all guest fields (Name, Email, Phone) empty.
  2. Click "Book" button.
* **Test Data:** All fields blank.
* **Expected Result:** System blocks submission and displays specific validation errors for every empty mandatory field.
* **Actual Result:** Red alert block renders listing 4 specific missing requirements.
* **Status:** ✅ **PASS**

---

#### `TC_FORM_008` - Verify Special Character & Script Sanitization (XSS)
* **Priority:** P1
* **Pre-conditions:** Booking form open.
* **Test Steps:**
  1. In First Name field, enter: `<script>alert('XSS')</script>`.
  2. Submit form.
* **Test Data:** Cross-site scripting payload.
* **Expected Result:** Input is escaped/sanitized; no JavaScript dialog executes.
* **Actual Result:** Characters rendered as harmless text string, no script executed.
* **Status:** ✅ **PASS**

---

### Module 4: Contact Us / Customer Inquiries (`TC_CONT`)

#### `TC_CONT_001` - Verify Successful Contact Form Submission
* **Priority:** P2
* **Pre-conditions:** User scrolled to "Contact" section.
* **Test Steps:**
  1. Fill Name: `Sarah Jenkins`.
  2. Fill Email: `sarah.j@example.com`.
  3. Fill Phone: `078901234567`.
  4. Fill Subject: `Room Availability for Wedding`.
  5. Fill Message: `Hello, do you offer block discounts for 10 rooms?`.
  6. Click "Submit".
* **Test Data:** Valid inquiry data.
* **Expected Result:** Form clears and displays success message: "Thanks for getting in touch Sarah Jenkins! We'll get back to you...".
* **Actual Result:** Success banner displayed accurately.
* **Status:** ✅ **PASS**

---

#### `TC_CONT_002` - Verify Contact Form Validation on Missing Fields
* **Priority:** P2
* **Pre-conditions:** Contact section visible.
* **Test Steps:**
  1. Leave all fields empty.
  2. Click "Submit" button.
* **Test Data:** Blank inputs.
* **Expected Result:** Validation summary displays errors for Name, Email, Phone, Subject, and Description.
* **Actual Result:** Expected error highlights displayed.
* **Status:** ✅ **PASS**

---

#### `TC_CONT_003` - Verify Contact Form Stability on Maximum Payload
* **Priority:** P2
* **Pre-conditions:** Contact section visible.
* **Test Steps:**
  1. Fill Name, Phone, and Subject with valid data.
  2. Enter an email address string exceeding 100 characters (e.g. `100chars_user@domain...com`).
  3. In Message body, enter 2000 characters.
  4. Click "Submit".
* **Test Data:** Oversized email payload (>100 chars).
* **Expected Result:** Client-side validation indicates field length limit gracefully.
* **Actual Result:** Page displays unhandled HTTP 500 error in Network tab and UI freezes without feedback.
* **Status:** ❌ **FAIL** (Linked Defect: [`BUG-005`](05-bug-reports.md#bug-005))

---

### Module 5: Admin Portal & Management (`TC_ADMIN`)

#### `TC_ADMIN_001` - Verify Admin Login with Valid Credentials
* **Priority:** P1
* **Pre-conditions:** Navigate to `/#/admin`.
* **Test Steps:**
  1. In Username, enter: `admin`.
  2. In Password, enter: `password`.
  3. Click "Login".
* **Test Data:** `admin` / `password`.
* **Expected Result:** User is authenticated and redirected to Admin Dashboard showing Room creation form and existing room listings.
* **Actual Result:** Login successful, dashboard rendered.
* **Status:** ✅ **PASS**

---

#### `TC_ADMIN_002` - Verify Admin Login Rejects Invalid Credentials
* **Priority:** P1
* **Pre-conditions:** On Admin login page.
* **Test Steps:**
  1. Enter Username: `admin`.
  2. Enter Password: `WrongPassword123!`.
  3. Click "Login".
* **Test Data:** Invalid password.
* **Expected Result:** Login denied; red border or error banner displayed indicating invalid credentials.
* **Actual Result:** Login prevented, fields highlighted red.
* **Status:** ✅ **PASS**

---

#### `TC_ADMIN_003` - Verify Admin Room Creation Workflow
* **Priority:** P1
* **Pre-conditions:** Authenticated as admin on Dashboard.
* **Test Steps:**
  1. Fill Room # (`105`).
  2. Select Type (`Twin`).
  3. Set Accessible (`true`).
  4. Set Price (`150`).
  5. Check features: `WiFi`, `Refreshments`.
  6. Click "Create".
* **Test Data:** Room 105, Twin, £150.
* **Expected Result:** New room row is added to the admin room list table and appears on the public landing page.
* **Actual Result:** Room created and visible in list immediately.
* **Status:** ✅ **PASS**

---

#### `TC_ADMIN_004` - Verify Unsaved Changes Warning when Navigating Away
* **Priority:** P3
* **Pre-conditions:** Admin logged in, editing an existing room's details.
* **Test Steps:**
  1. Modify Room 105 price from `150` to `180`.
  2. Do not click Save.
  3. Click "Front Page" link or browser Back button.
* **Test Data:** Dirty form state.
* **Expected Result:** Browser displays confirmation modal: "You have unsaved changes. Are you sure you want to leave?".
* **Actual Result:** Browser navigates away immediately without prompting; unsaved edits are lost silently.
* **Status:** ❌ **FAIL** (Linked Defect: [`BUG-006`](05-bug-reports.md#bug-006))

---

#### `TC_ADMIN_005` - Verify Admin Logout Terminates Session
* **Priority:** P1
* **Pre-conditions:** Admin logged in.
* **Test Steps:**
  1. Click "Logout" button in top right navigation.
  2. Attempt to press browser Back button to re-access dashboard.
* **Test Data:** N/A.
* **Expected Result:** User is logged out to login screen; clicking Back redirects back to login without restoring admin session.
* **Actual Result:** Session ended properly, redirected to login screen.
* **Status:** ✅ **PASS**
