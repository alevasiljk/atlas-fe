# Functional Specification – Atlas Frontend

## 1. Purpose

This application provides a frontend interface for Jira ticket classification,
enrichment, and grouping, based on backend-provided APIs.

The frontend does not implement business logic for enrichment or embedding.
All intelligence, grouping, and analysis are backend-driven.

The role of the frontend is to:
- visualize ticket data
- allow filtering and navigation
- trigger backend actions
- present results of enrichment and analysis

---

## 2. Scope

### In Scope
- Display Jira tickets retrieved from backend APIs
- Server-side filtering and pagination
- Visualization of unresolved tickets by group
- Triggering synchronization/enrichment processes
- Displaying group-level ticket analysis

### Out of Scope
- Jira integration logic
- Embedding or enrichment logic
- Knowledge storage or document ingestion (future)
- Authorization and authentication logic

---

## 3. Main User Flows

### 3.1 Dashboard Overview
- User lands on a dashboard showing a table of Jira tickets
- Tickets are retrieved from a backend API
- Pagination and sorting are server-side

### 3.2 Filtering Tickets
Users can filter tickets using:
- Status (Resolved / Unresolved)
- Priority
- Group (multi-select)
- Free-text search

Each change triggers a backend request and reloads the ticket list.

---

### 3.3 Ticket Grouping & Enrichment
Some tickets may initially lack:
- Group assignment
- Hard label
- Soft label

These tickets are displayed as "processing".

A synchronization action:
- reloads ticket data
- backend performs enrichment
- frontend receives notification when enrichment completes
- ticket data is reloaded automatically

---

### 3.4 Chart View
- User can view a chart showing unresolved tickets per group
- Only the top groups are shown individually
- Remaining groups are aggregated as "Other"

---

### 3.5 Side Panel – Group View
- Clicking a ticket opens a side panel
- Panel displays:
  - group name
  - selected ticket first
  - other tickets in the same group
- Analysis section displays generated insights (read-only)

If a ticket has no group:
- Side panel shows an informational message
- No analysis is shown

---

## 4. Language & Localization
- UI supports EN / IT toggle
- Only static text is localized
- Backend-provided values are never translated

---

## 5. Non-Functional Requirements
- Server-side pagination and filtering
- Consistent state synchronization
- Graceful handling of incomplete data
- Clear separation between UI and backend contracts
