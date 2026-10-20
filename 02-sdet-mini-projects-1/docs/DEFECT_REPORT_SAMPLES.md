# Defect & Incident Reports (Sample Showcase)

This document illustrates how bugs and defects discovered during automation and exploratory testing are documented and escalated to engineering teams.

---

### Defect Ticket: QA-104

* **Title**: Missing Postal Code error banner displays incorrect casing and alignment on mobile viewports
* **Severity**: Medium
* **Priority**: P2
* **Component**: Checkout / UI Frontend
* **Environment**: Mobile Chrome (Pixel 5 viewport), Production Build v1.4.2

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Log in using `standard_user`
3. Add any product to cart and navigate to `/checkout-step-one.html`
4. Enter First Name: "John", Last Name: "Doe", leave Postal Code empty.
5. Tap the "Continue" button.

#### Expected Result
An accessible error banner appears with the message: `Error: Postal Code is required`, remaining fully within the mobile viewport boundaries.

#### Actual Result
The error icon overlaps the input field boundary and text truncates on screens narrower than 360px.

---

### Defect Ticket: QA-108

* **Title**: `PUT /booking/{id}` returns 200 OK with missing token instead of 403 Forbidden
* **Severity**: High (Security / Access Control)
* **Priority**: P1
* **Component**: Booking Service API
* **Environment**: Staging API v2.1.0

#### Steps to Reproduce
1. Dispatch `PUT /booking/12` with updated JSON payload.
2. Omit the `Cookie: token={value}` authentication header.

#### Expected Result
HTTP 401 Unauthorized or 403 Forbidden with `{ "error": "Authentication credentials were not provided" }`.

#### Actual Result
Endpoint responds with HTTP 403 or unhandled string instead of a structured JSON response, breaking client error parsers.
