# 📋 Test Plan: Shady Meadows B&B Booking Platform

**Author:** Samir (QA Tester)  
**Target Application:** [Shady Meadows B&B / Restful Booker](https://automationintesting.online/)  
**Test Focus:** Core Booking Workflow, Date/Price Validation, and Admin Operations  
**Status:** Executed & Delivered  

---

## 1. What Are We Testing and Why?

The goal of this test plan is straightforward: **ensure that hotel guests can browse rooms and make reservations smoothly without encountering bugs, pricing errors, or data loss**, while ensuring the hotel administrator can manage room listings securely.

Because this is a reservation system, the most sensitive areas are **dates and money**. If dates are mishandled, rooms get double-booked or scheduled for the past. If pricing calculations fail, the hotel loses money or overcharges customers. My testing is specifically designed to stress-test these business-critical areas.

---

## 2. Scope: What’s In and What’s Out?

### ✅ In-Scope (What I Tested)
* **Room Browsing:** Checking room details, nightly rates, photos, and amenity badges (Wi-Fi, TV, accessibility).
* **Booking Calendar & Date Engine:** Verifying the calendar picker, minimum stay rules, month-end transitions, and edge cases around dates.
* **Guest Reservation Form:** Validating input fields (Name, Email, Phone), boundary limits, character sanitization, and error messaging.
* **Contact Us Inquiry Form:** Testing customer inquiry submissions, field limits, and error handling.
* **Admin Portal:** Testing admin authentication (`admin` / `password`), session logout, adding new rooms, and modifying existing room details.

### ❌ Out-of-Scope (What We're Not Testing in This Cycle)
* **Live Credit Card Processing:** There is no live payment gateway attached in this build (all payments are mocked/direct confirmation).
* **Massive Concurrency / Load Testing:** Heavy load testing (>1,000 simultaneous users) will be handled separately in a dedicated performance cycle using tools like k6/JMeter.
* **Native Mobile Apps:** This cycle focuses strictly on responsive web browsers across desktop and mobile screen viewports.

---

## 3. How I Planned the Testing

To get thorough coverage without repeating identical tests, I applied standard QA techniques:

1. **Happy Path Testing:** Walking through the standard user journey from landing on the homepage to receiving a confirmed booking code.
2. **Boundary Value Analysis (BVA):** Looking at the "edges" where code often breaks—such as 1-night stays, bookings that cross over from the 31st of one month to the 1st of the next, and minimum/maximum character counts on names and phone numbers.
3. **Equivalence Partitioning (ECP):** Splitting inputs into valid and invalid buckets (e.g., standard email formats vs. malformed inputs missing `@` or domain endings).
4. **Negative & Exploratory Testing:** Intentionally doing what users aren't supposed to do—like entering past dates, setting check-out before check-in, entering text into numeric fields, and double-clicking submit buttons.
5. **UI & Cross-Browser Verification:** Checking that layouts don't break or overlap on Chrome, Firefox, and Edge, as well as on mobile screen widths.

---

## 4. Test Environment

* **Target URL:** `https://automationintesting.online/`
* **Primary Workstation:** Windows 11 PC (1920 × 1080 resolution)
* **Browsers Tested:**
  * Google Chrome (Latest stable)
  * Mozilla Firefox (Latest stable)
  * Microsoft Edge (Latest stable)
* **Helper Tools:** Chrome DevTools (Console log monitoring, Network tab payload checks, device emulation).

---

## 5. What Determines Pass or Fail?

### Ready to Start (Entry Criteria)
* Test environment is reachable with reasonable response times.
* Demo rooms and test data are available to interact with.
* Admin login credentials work.

### Ready to Ship (Exit Criteria)
* All 26 planned test cases have been executed and logged.
* **Zero Critical or Blocker bugs remaining open.** (Any bug that causes wrong prices, allows past date bookings, or crashes the page blocks the release).
* Any Major bugs have an approved workaround or fix scheduled.
* Full test summary and defect log shared with the team.

---

## 6. Known Risks & Where Things Could Break

| What Could Go Wrong | Likelihood | Impact | How I Tested For It |
| :--- | :--- | :--- | :--- |
| **Date logic breaks around months/leap years** | High | High | Created specific tests for cross-month dates and same-day check-in/out. |
| **Guests get charged the wrong amount** | Medium | Severe | Tested multi-night reservations (2, 3, 5 nights) to verify price multiplication. |
| **Users enter strange phone numbers or names** | High | Medium | Tested symbols, letters, spaces, and international prefixes in contact fields. |
| **Admins lose changes when distracted** | High | Low | Tested navigating away from the room edit screen while having unsaved edits. |
