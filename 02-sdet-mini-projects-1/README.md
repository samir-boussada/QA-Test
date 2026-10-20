# 🚀 Enterprise SDET Quality Engineering Framework

[![Playwright Tests](https://github.com/samir-boussada/sdet-mini-projects/actions/workflows/ci.yml/badge.svg)](https://github.com/samir-boussada/sdet-mini-projects)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-v1.40+-green?logo=playwright)](https://playwright.dev/)
[![Zod](https://img.shields.io/badge/Schema-Zod-306998?logo=zod)](https://zod.dev/)
[![k6](https://img.shields.io/badge/Load_Testing-k6-7D64FF?logo=k6)](https://k6.io/)

A production-ready **Software Development Engineer in Test (SDET)** framework demonstrating enterprise test architecture:
* **E2E UI Automation** using **Playwright & TypeScript** with the Page Object Model (POM) pattern.
* **API Integration & Contract Testing** with **Zod runtime schema enforcement**.
* **Performance Testing** via **k6** benchmark scripts.
* **CI/CD Integration** with **GitHub Actions** and HTML test report artifacts.
* **VS Code Native Integration** for test execution, debugging, and trace inspection.

---

## 🏗️ Architecture & Features

```
tests/
├── api/                  # REST API & Contract Test Suites
│   ├── auth-token.spec.ts
│   ├── booking-crud.spec.ts
│   └── booking-contract.spec.ts
└── e2e/                  # End-to-End User Journey Tests
    ├── auth.spec.ts
    ├── inventory.spec.ts
    └── checkout.spec.ts

src/
├── api/                  # API Clients & Zod Contract Schemas
│   ├── BookingClient.ts
│   └── schemas/booking.schema.ts
├── data/                 # Centralized Fixtures & Test Data
├── fixtures/             # Custom Fixtures (Dependency Injection)
└── pages/                # Page Object Model (POM) Classes
    ├── BasePage.ts
    ├── LoginPage.ts
    ├── InventoryPage.ts
    ├── CartPage.ts
    └── CheckoutPage.ts

perf/
└── k6-load-test.js       # Load test with p95 latency thresholds
```

### Key Highlights
1. **Zero Hardcoded Selectors**: All UI interactions rely on accessible queries (`getByRole`, `data-test` locators) encapsulated in Page Objects.
2. **Dependency Injection via Fixtures**: Tests consume pre-initialized pages and API clients directly through `test.extend()`.
3. **Contract & Schema Testing**: Ensures backend API schemas do not break client contracts using runtime Zod validation.
4. **Traceability & Documentation**:
   * [Test Strategy Document](docs/TEST_STRATEGY.md)
   * [Defect / Incident Reports](docs/DEFECT_REPORT_SAMPLES.md)

---

## 💻 VS Code Setup (Recommended)

This project includes pre-configured VS Code settings and extension recommendations in `.vscode/`.

1. Open this repository in VS Code:
   ```bash
   code .
   ```
2. When prompted, install the recommended extensions, specifically:
   * **Playwright Test for VS Code** (`ms-playwright.playwright`)
3. Open the **Testing** icon on the VS Code Activity Bar (left sidebar) to:
   * View all discovered API and E2E tests in a tree.
   * Run or debug individual tests with one click (green play button).
   * Step through tests using VS Code breakpoints.

---

## ⚡ Quick Start & CLI Execution

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/samir-boussada/sdet-mini-projects.git
cd sdet-mini-projects

# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install --with-deps chromium firefox
```

### 2. Running Tests
```bash
# Run all test suites (API + UI)
npm test

# Run only API & Contract tests (Fast: < 5s)
npm run test:api

# Run UI E2E tests in Chromium
npm run test:ui

# Run UI tests with visible browser (Headed mode)
npm run test:ui:headed

# Open the interactive HTML Test Report
npm run test:report
```

### 3. Running Performance Tests (k6)
```bash
# Run load test (requires k6 installed)
k6 run perf/k6-load-test.js
```

---

## 🔄 CI/CD Pipeline

The `.github/workflows/ci.yml` pipeline runs on every Pull Request:
1. Installs Node.js and dependencies with npm caching.
2. Installs required browser binaries (`chromium`, `firefox`).
3. Executes API contract tests and UI E2E tests in parallel.
4. Archives the interactive **Playwright HTML Report** as a build artifact retained for 14 days.

---

## 📄 License
MIT License. Created for SDET portfolio demonstration.
