# Frontend Architecture – Atlas

## 1. Architectural Goals

The frontend architecture is designed to:
- isolate backend API contracts
- enable safe backend evolution
- support incremental feature growth
- enable spec-driven development
- minimize refactoring impact

---

## 2. High-Level Structure

The application follows a feature-based structure:

- core – global, singleton infrastructure
- shared – reusable UI and utilities
- features – domain-specific functionality

---

## 3. Core Layer

The core layer contains:
- API clients (HTTP only)
- Data Transfer Objects (DTOs)
- Mappers (DTO → UI models)
- Cross-cutting services

Frontend components never access backend APIs directly.

---

## 4. DTOs and Mappers

Backend responses are represented as DTOs.
DTOs are mapped into UI-specific models using mappers.

Benefits:
- backend changes are isolated
- UI remains stable
- strong typing boundaries are enforced

---

## 5. Feature Layer – Dashboard

The Dashboard feature owns:
- feature-specific state
- orchestration logic
- presentation components

Responsibilities include:
- holding current filter state
- triggering API reloads
- coordinating ticket grid, charts, and panels

---

## 6. State Management

Each feature owns a centralized state object.

State responsibilities:
- current filters
- pagination data
- loading indicators
- selected ticket / group

Components never manage global state directly.

---

## 7. Facade Pattern

Facades act as the single interaction point between:
- components
- state
- APIs

No component performs:
- API calls
- data mapping
- orchestration logic

---

## 8. Future Scalability

The architecture supports future expansion, including:
- additional data sources
- knowledge base features
- onboarding flows
- document-based content

Existing features remain untouched when new domains are added.
