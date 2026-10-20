# 🏨 Shady Meadows B&B — Manual QA Portfolio Project

Hey there! 👋 Welcome to my manual software testing portfolio project. 

I built this project to demonstrate how I approach quality assurance in a realistic web application: analyzing user requirements, planning test coverage, hunting down edge cases, and documenting defects clearly so developers can easily reproduce and fix them.

---

## 🎯 Why This Project?

A lot of beginner QA portfolios test simple static pages where nothing ever breaks. I wanted something much closer to real life.

I chose **[Restful Booker Platform (Shady Meadows B&B)](https://automationintesting.online/)** because hotel reservation systems are notoriously prone to tricky bugs:
* **Date calculations:** Handling past dates, leap years, and check-out before check-in.
* **Pricing logic:** Making sure the system correctly multiplies room rates across multiple nights.
* **Input validation:** Preventing bad data (or crashes) from strange phone numbers, long emails, or special characters.
* **Admin controls:** Managing room listings and ensuring changes aren't accidentally lost.

---

## 🧭 How I Approached Testing (My Thought Process)

When testing this platform, I didn't just click through the happy paths. I put on the hat of both a real hotel guest and a stressed receptionist, asking questions like:

* *"What happens if a user tries to book a room yesterday?"*
* *"What if someone selects 4 nights—does the math actually charge for 4 nights, or does it default to 1?"*
* *"What happens if a customer pastes an international phone number with symbols into the form?"*
* *"What if an admin edits a room's price, gets interrupted, and clicks away without saving?"*

To keep testing structured and thorough, I used several core QA techniques:
* **Boundary Value Analysis (BVA):** Testing 1-night minimum stays, month-end date transitions (e.g., Oct 31 to Nov 2), and field length boundaries.
* **Equivalence Class Partitioning (ECP):** Grouping valid vs. invalid email formats and phone lengths to test efficiently without redundant work.
* **Exploratory & Negative Testing:** Deliberately trying things a standard user might accidentally do (like double-clicking submit or entering inverted dates).

---

## 📊 Quick Project Snapshot

Here is a summary of what I found during my test cycle:

* **Total Test Cases Executed:** 26
* **Passed:** 20 (76.9%)
* **Failed / Bugs Found:** 6 (23.1%)
* **Blocker/Critical Bugs:** 2 (Major revenue and date validation issues)
* **Final Release Verdict:** 🔴 **Not ready for production.** (We cannot ship while guests are being under-billed and able to book past dates).

---

## 🚨 Top Bugs Discovered (The Highlights)

Here are three of the most critical issues I caught during testing:

1. **Multi-Night Underbilling ([BUG-002](05-bug-reports.md#bug-002)):** When booking a room for 3 or 4 nights, the platform only charges the single-night rate (£100 total instead of £300 or £400). This would cause massive revenue loss on day one.
2. **Booking in the Past ([BUG-001](05-bug-reports.md#bug-001)):** The calendar widget allows users to highlight and confirm bookings for yesterday or last week, corrupting reservation records.
3. **500 Server Crash on Long Email ([BUG-005](05-bug-reports.md#bug-005)):** Submitting an email over 100 characters in the contact form triggers an unhandled database error and freezes the UI with no helpful feedback.

*(See full reproduction steps, actual vs. expected results, and suggested fixes in [`05-bug-reports.md`](05-bug-reports.md)).*

---

## 📁 What’s Inside This Repository

Feel free to click through the documentation to see the full testing lifecycle:

| Document | What It Shows |
| :--- | :--- |
| **[01-test-plan.md](01-test-plan.md)** | How I planned the testing scope, identified risks, and set pass/fail criteria. |
| **[02-requirements-traceability-matrix.md](02-requirements-traceability-matrix.md)** | A map showing that every feature requirement has matching test cases and defect tracking. |
| **[03-test-scenarios.md](03-test-scenarios.md)** | High-level user journeys across the 5 core modules. |
| **[04-test-cases.md](04-test-cases.md)** | 26 step-by-step test cases with exact inputs, preconditions, and execution outcomes. |
| **[05-bug-reports.md](05-bug-reports.md)** | 6 detailed defect reports written in standard Jira format with reproduction steps and impact analysis. |
| **[06-test-execution-summary-report.md](06-test-execution-summary-report.md)** | The final sign-off report summarizing metrics, defect density, and my release recommendation. |
| **[templates/](templates/)** | Clean templates I created for reusable test cases and bug logging. |

---

## 🛠️ Environment & Tools Used

* **Testing Type:** Manual, Functional, Exploratory, Usability
* **Browsers Tested:** Google Chrome (Latest), Mozilla Firefox, Microsoft Edge
* **Tools:** Chrome DevTools (Console logging, Network inspection), GitHub, Markdown

---

## 💬 About Me & Contact

* **QA Tester:** Samir Boussada
* **GitHub Profile:** [github.com/samir-boussada](https://github.com/samir-boussada)
* **Portfolio Repository:** [hotel-booking-manual-qa-portfolio](https://github.com/samir-boussada/hotel-booking-manual-qa-portfolio)

I am a detail-oriented QA tester who loves finding defects and improving software quality to help teams build rock-solid products. Feel free to connect or reach out!
