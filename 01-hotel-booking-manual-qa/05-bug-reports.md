# 🐛 Bug Reports & Defect Log

**Project:** Shady Meadows B&B Hotel Reservation Platform  
**Reported By:** Samir (QA Tester)  
**Total Defects Found:** 6 (2 Critical, 2 Major, 1 Medium, 1 Low)  
**Status:** All currently open and awaiting developer triage  

---

### A Note on How I Log Defects

When logging a bug, my goal is to save the development team time. A good bug report shouldn't require a 30-minute meeting to understand. For every defect below, I've included:
* **Clear steps to reproduce** that anyone can follow in 30 seconds.
* **Exact test data** used.
* **What I expected to happen vs. what actually happened.**
* **Technical evidence** (Network responses, payloads, and error codes).
* **The real-world business impact** (why this bug actually matters to the business and customer).
* **A suggested fix** to give the developers a head start.

---

## 📋 Defect Summary at a Glance

| Bug ID | Title | Severity | Priority | Area |
| :--- | :--- | :--- | :--- | :--- |
| **[BUG-001](#bug-001)** | Booking engine allows reservations for past calendar dates | **Critical** | **High** | Calendar / Dates |
| **[BUG-002](#bug-002)** | Multi-night booking calculation fails to multiply price per night | **Critical** | **High** | Pricing Calculation |
| **[BUG-003](#bug-003)** | Check-out date accepts dates earlier than check-in date | **Major** | **High** | Calendar Logic |
| **[BUG-004](#bug-004)** | Guest phone number field accepts letters and arbitrary symbols | **Major** | **Medium** | Form Validation |
| **[BUG-005](#bug-005)** | Contact form crashes with 500 error when email exceeds 100 characters | **Medium** | **Medium** | Error Handling |
| **[BUG-006](#bug-006)** | Admin portal loses unsaved room edits without warning the user | **Low** | **Low** | Admin Usability |

---

## Detailed Bug Reports

### BUG-001

#### Title: Booking engine allows reservation of past calendar dates without error

* **Severity:** 🔴 **Critical** (Breaks core reservation logic)
* **Priority:** 🔴 **High** (Must fix before launch)
* **Environment:** Windows 11 | Chrome v128 & Firefox v130 | Screen 1920x1080
* **Pre-conditions:** At least one room is listed and available on the homepage.

**Steps to Reproduce:**
1. Go to the homepage and find any room card.
2. Click **"Book this room"** to open the calendar.
3. Click and drag across dates that are in the past (e.g., select yesterday and the day before).
4. Fill in valid guest details (First Name: `John`, Last Name: `Doe`, Email: `john@example.com`, Phone: `012345678901`).
5. Click the **"Book"** button.

**Expected Behavior:**
Past dates should be disabled on the calendar (greyed out and unclickable). If a user somehow inputs a past date, the system should reject it with a friendly error: *"Check-in date cannot be in the past."*

**Actual Behavior:**
The calendar allows past dates to be selected. The system submits the reservation, returns `201 Created` from the API, and displays a "Booking Successful!" confirmation modal.

**Technical Details (Network Payload):**
```json
POST /booking/
{
  "bookingdates": {
    "checkin": "2026-10-10",
    "checkout": "2026-10-12"
  },
  "firstname": "John",
  "lastname": "Doe",
  "depositpaid": true,
  "roomid": 1
}
// Response: 201 Created
```

**Why This Matters (Business Impact):**
This is a critical logic flaw. It allows fictitious reservations, messes up historical hotel records, and can create ghost bookings that confuse front-desk staff.

**Suggested Fix:**
* Set `minDate = new Date()` on the front-end calendar component to prevent clicking past dates.
* Add backend validation to check `if (checkinDate < today) return 400 Bad Request`.

---

### BUG-002

#### Title: Room pricing calculation fails to multiply price per night when booking $\ge 2$ nights

* **Severity:** 🔴 **Critical** (Direct financial loss)
* **Priority:** 🔴 **High** (Blocks release)
* **Environment:** Chrome v128, Desktop
* **Pre-conditions:** Room rate is set to £100/night.

**Steps to Reproduce:**
1. Click "Book this room" on a room priced at £100/night.
2. Select a 4-night stay on the calendar (e.g., Nov 10 to Nov 14).
3. Fill in guest contact details.
4. Observe the price shown on the confirmation summary.

**Expected Behavior:**
Total price must calculate as:
$$\text{Total} = \text{Price per Night (£100)} \times \text{Nights (4)} = \mathbf{£400}$$

**Actual Behavior:**
The confirmation summary still displays a total of **£100**. The system only charges the base rate for 1 night, regardless of how long the guest stays.

**Why This Matters (Business Impact):**
Immediate revenue leak. If a guest books a 14-day holiday, they will be billed for just 1 night, costing the hotel hundreds of pounds per booking.

**Suggested Fix:**
In the pricing utility, calculate duration in days and multiply by room rate:
```javascript
const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
const totalPrice = nights * roomPricePerNight;
```
Ensure this calculation is also verified on the server side so client data cannot be altered.

---

### BUG-003

#### Title: Check-out date accepts a date earlier than check-in date

* **Severity:** 🟠 **Major**
* **Priority:** 🔴 **High**
* **Environment:** Chrome v128, Firefox v130

**Steps to Reproduce:**
1. Open the booking calendar for any room.
2. Select Check-in date: `Nov 25, 2026`.
3. Drag backwards or manually select Check-out date: `Nov 20, 2026`.
4. Fill in guest details and click **"Book"**.

**Expected Behavior:**
The calendar should prevent selecting backwards date ranges. Check-out must always be at least 1 day after check-in.

**Actual Behavior:**
The booking submits without error. The summary shows `-5 nights` or `NaN`, and the database saves an inverted reservation range.

**Why This Matters (Business Impact):**
Corrupts availability calculations, making the room show as "available" on days when it shouldn't be, leading to double-bookings.

**Suggested Fix:**
Enforce `checkoutDate > checkinDate`. If the user selects an earlier date, either auto-advance check-out by 1 day or prompt: *"Check-out date must be after check-in date."*

---

### BUG-004

#### Title: Guest phone number field accepts arbitrary text and symbols

* **Severity:** 🟠 **Major**
* **Priority:** 🟡 **Medium**
* **Environment:** All desktop browsers

**Steps to Reproduce:**
1. Open the booking drawer.
2. Select valid dates and enter valid names and email.
3. In the Phone field, enter: `+44-CALL-HOTEL-NOW!@#$` (letters and symbols).
4. Click **"Book"**.

**Expected Behavior:**
Phone field should reject non-numeric characters (except a leading `+` for international country codes) and prompt: *"Please enter a valid numeric phone number."*

**Actual Behavior:**
The form accepts the text string and creates the reservation without any error.

**Why This Matters (Business Impact):**
Front desk and automated SMS confirmation systems will fail to reach guests with booking updates or check-in instructions.

**Suggested Fix:**
Add a regex validator on the input: `/^\+?[0-9]{11,21}$/`. Strip out dashes or formatting characters before persisting.

---

### BUG-005

#### Title: Contact form crashes with 500 server error when email exceeds 100 characters

* **Severity:** 🟡 **Medium**
* **Priority:** 🟡 **Medium**
* **Environment:** Chrome v128

**Steps to Reproduce:**
1. Scroll down to the "Contact Us" form on the homepage.
2. Enter valid Name, Phone, Subject, and Message.
3. In the Email field, enter a valid email that is 105 characters long:
   `test.account.with.an.unusually.long.user.prefix.designed.for.boundary.testing@subdomain.examplecompany.com`
4. Click **"Submit"**.

**Expected Behavior:**
The form should either accept the email gracefully or display a clean client-side validation message: *"Email must be under 100 characters."*

**Actual Behavior:**
The page freezes with no user feedback. Opening DevTools shows a `POST /message/ 500 Internal Server Error` with a database `DataTruncationException`.

**Why This Matters (Business Impact):**
Unhandled 500 errors look unprofessional, erode customer trust, and can expose underlying server stack trace information.

**Suggested Fix:**
* Add `maxlength="100"` to the email input tag.
* Wrap the database save in a try-catch block and return a friendly `422 Unprocessable Entity` error instead of letting a 500 crash reach the user.

---

### BUG-006

#### Title: Admin portal loses unsaved room edits without warning the user

* **Severity:** 🟢 **Low** (Usability issue)
* **Priority:** 🟢 **Low**
* **Environment:** Desktop 1920x1080 (All browsers)

**Steps to Reproduce:**
1. Log in to the Admin Dashboard (`/#/admin`).
2. Click to edit an existing room (e.g., change price from £100 to £140).
3. Before clicking "Save", click the "Front Page" link or browser Back button.

**Expected Behavior:**
The browser should prompt a confirmation modal: *"You have unsaved changes. Are you sure you want to leave?"*

**Actual Behavior:**
The page navigates away immediately. All edits are lost without warning.

**Why This Matters (Business Impact):**
Frustrating for administrators who might spend time updating room descriptions or prices only to lose their work if they accidentally click away.

**Suggested Fix:**
Track form dirty state (`isDirty`) and hook into the browser's `beforeunload` event or router navigation guard.
