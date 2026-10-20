# Enterprise Test Automation Strategy

## 1. Executive Summary
This document outlines the testing strategy, architecture, and quality assurance framework for the application suite. The framework implements a modern **Shift-Left Testing Pyramid**, prioritizing fast API and contract validations while maintaining robust end-to-end user journey verifications.

---

## 2. Test Pyramid & Scope

```
        / \
       /   \     E2E UI Tests (Playwright)
      /  UI \    - Core Purchase Flows & Critical Paths
     /-------\
    /   API   \  Integration & Contract Tests (Playwright + Zod)
   /  Contract \ - CRUD Lifecycle, Schema Enforcement, Auth
  /-------------\
 /  Performance  \ Load & Resilience Tests (k6)
/_________________\ - Latency Thresholds (p95 < 600ms), 20 VUs
```

### 2.1 E2E UI Layer (SauceDemo Target)
* **Goal**: Validate user-facing behavior, navigation, and cross-browser consistency.
* **Coverage**:
  * Authentication (positive, locked out, invalid inputs).
  * Product catalog navigation, dynamic sorting, and cart count badges.
  * Multi-step checkout pipeline with form validation.
* **Execution**: Parallel execution across Chromium, Firefox, and Mobile Chrome viewports.

### 2.2 API & Contract Layer (Restful-Booker Target)
* **Goal**: Validate backend services with fast feedback cycles (< 5 seconds total run).
* **Coverage**:
  * Token-based authentication and cookie headers.
  * CRUD lifecycle: `POST /booking` $\to$ `GET /booking/:id` $\to$ `PUT /booking/:id` $\to$ `DELETE /booking/:id`.
  * Runtime schema and contract enforcement via **Zod schemas**.

### 2.3 Performance Layer (k6)
* **Goal**: Benchmark API endpoints under sustained concurrent load.
* **SLA Thresholds**:
  * $95\%$ of transactions complete under $600\text{ms}$.
  * Failure rate strictly lower than $1\%$.

---

## 3. Automation Architecture & Design Patterns

1. **Page Object Model (POM)**:
   * Encapsulates web elements and interactions into dedicated, reusable classes (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`).
   * Eliminates hardcoded selectors inside test definitions.

2. **Custom Fixtures (`test.extend`)**:
   * Uses Playwright dependency injection to inject instantiated pages and API clients directly into test signatures.
   * `loggedInPage` fixture enables fast testing of post-authentication features without repetitive UI login steps.

3. **API Client Abstraction (`BookingClient`)**:
   * Encapsulates all REST calls and headers behind strongly typed methods.

---

## 4. CI/CD & Reporting

* **Pipeline**: GitHub Actions triggers on every PR and commit to `main`.
* **Artifacts**: Playwright HTML report and traces are preserved as downloadable build artifacts for triage.
* **Failure Triaging**: Traces, screenshots, and videos are captured on first retry for debugging.
