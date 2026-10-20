# 🏆 QA & SDET Engineering Portfolio

![QA Status](https://img.shields.io/badge/QA%20Portfolio-Production%20Ready-success?style=for-the-badge)
![Testing Stack](https://img.shields.io/badge/Stack-Manual%20QA%20%7C%20Playwright%20%7C%20TypeScript%20%7C%20Zod%20%7C%20k6-blue?style=for-the-badge)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange?style=for-the-badge)

Welcome to my central **Software Quality Assurance (QA) & SDET Portfolio**. 

This repository consolidates my testing projects into one organized showcase, demonstrating both **functional manual testing rigor** (STLC, Test Planning, RTM, Edge-Case hunting, Defect Logging) and **advanced test automation architecture** (Playwright E2E, Microservice Contracts, Chaos Engineering, and Performance Testing).

---

## 📂 Featured Portfolio Projects

| # | Project Name | Focus & Specialty | Core Tools & Techniques | Quick Link |
| :-: | :--- | :--- | :--- | :---: |
| **01** | **Hotel Reservation System (Manual QA)** | Full STLC cycle: Test Plan, RTM, 26 Test Cases, 6 Jira-style Bug Reports, and Go/No-Go Release Sign-Off. | Boundary Value Analysis, ECP, Error Guessing, Jira Format, Chrome DevTools | [Explore Project ➔](01-hotel-booking-manual-qa/) |
| **02** | **Enterprise SDET Quality Engineering Framework** | Full-stack E2E UI automation, runtime API contract verification, and load testing in CI/CD. | Playwright, TypeScript, Page Object Model (POM), Zod Contracts, k6 Load, GitHub Actions | [Explore Project ➔](02-sdet-mini-projects-1/) |
| **03** | **Microservices Automation & Chaos Engineering** | Multi-service distributed workflows, consumer-driven contracts, and resilience under network failures. | Playwright API, Zod, Chaos/Fault Injection (503 simulation, backoff retries) | [Explore Project ➔](03-sdet-mini-projects-2/) |

---

## 🔍 Detailed Overview of Each Project

### 🏨 [01. Hotel Reservation System — Manual QA Portfolio](01-hotel-booking-manual-qa/)
* **Target App:** [Restful Booker Platform (Shady Meadows B&B)](https://automationintesting.online/)
* **What it demonstrates:**
  * **Master Test Plan (MTP):** Defining testing scope, environments, entry/exit criteria, and risk mitigations.
  * **Requirements Traceability Matrix (RTM):** 100% requirements coverage mapping user stories to test cases and defects.
  * **26 Detailed Test Cases:** Realistic test steps, preconditions, boundary validations, and execution outcomes.
  * **6 High-Quality Defect Tickets:** Documented in standard Jira format with reproduction steps, network payloads, severity vs. priority ratings, and suggested developer fixes.
  * **Test Execution Summary:** Defect density analysis, revenue risk evaluation, and a data-driven release recommendation.

---

### ⚡ [02. Enterprise SDET Framework — UI, API & Load Testing](02-sdet-mini-projects-1/)
* **What it demonstrates:**
  * **Robust E2E UI Automation:** Built with **Playwright & TypeScript** using the Page Object Model (POM) design pattern.
  * **Contract & Schema Validation:** Enforcing strict runtime JSON response schemas using **Zod** to catch API breaking changes before production.
  * **Performance Benchmarking:** Automated **k6** scripts measuring latency, error rates, and throughput under concurrent load.
  * **Continuous Integration:** Fully automated **GitHub Actions** CI pipeline that runs test suites and publishes HTML reports on every commit.

---

### 🔬 [03. Microservices Automation & Chaos Engineering](03-sdet-mini-projects-2/)
* **What it demonstrates:**
  * **Distributed Workflow Testing:** Validating multi-service chains (Auth $\to$ Inventory $\to$ Order $\to$ Payment) across microservice boundaries.
  * **Consumer-Driven Contracts:** Schema enforcement between independent backend services.
  * **Chaos & Resilience Testing:** Intentionally injecting transient faults (HTTP 503 gateway outages, inventory stock conflicts) to verify retry policies, exponential backoff, and graceful error handling.

---

## 🛠️ Technical Skills & Competencies Matrix

| Domain | Skills & Technologies |
| :--- | :--- |
| **Manual QA & STLC** | Test Planning, Test Case Authoring, RTM, Bug Reporting (Jira format), BVA, Equivalence Partitioning, Exploratory Testing |
| **UI Automation** | Playwright, TypeScript, Page Object Model (POM), Cross-Browser Testing, Auto-waiting, Visual Assertions |
| **API & Contract Testing** | REST APIs, Postman, Playwright API Request, Zod Schema Enforcement, Auth Token Chaining, Status Codes |
| **Performance & Resilience** | k6 Load Testing, Stress Testing, Chaos Engineering, Fault Injection, Exponential Backoff Validation |
| **DevOps & Tooling** | Git, GitHub Actions, CI/CD Pipelines, Chrome DevTools, VS Code, Markdown Documentation |

---

## 👤 Author & Contact

* **QA / SDET Engineer:** Samir Boussada
* **GitHub Profile:** [@samir-boussada](https://github.com/samir-boussada)
* **Email:** [boussadasamir15@gmail,com]
* **LinkedIn:** [Https://www.linkedin.com/in/samir-boussada-5bba06113]

Feel free to explore the repository subfolders, inspect the test artifacts and code, or reach out if you would like to discuss quality assurance opportunities!
