# Implementation Plan – Spec Driven (Updated)

This implementation plan reflects the actual, finalized development flow
used for the Atlas Frontend.  
The plan is backend-first and domain-driven, with UI intentionally implemented last.

---

## Guiding Principles
- Spec-first development
- Backend-driven contracts
- Domain separation (grid, side panel, chart)
- One logical phase per milestone
- UI implemented only after data flow is stable
- No speculative coding

---

## Phase 0 – Foundation ✅ (Completed)
- Angular project setup
- Feature-based architecture definition
- Functional and frontend architecture specs
- Repository structure and baseline commit

---

## Phase 1 – Dashboard State & Filters ✅ (Completed)
- Define `DashboardFilter` model
- Centralize dashboard state
- Server-side filter contract (status, priority, groups, search)
- Pagination and sort state
- No UI and no API calls initially

---

## Phase 2 – API Integration & DTOs ✅ (Completed)
- Implement API clients for:
  - Tickets
  - Priorities dropdown
  - Groups dropdown
- Define backend DTOs per domain
- Implement DTO → UI mappers
- Connect state and facade to backend APIs

---

## Phase 3 – Tickets Data Flow ✅ (Completed)
- Load tickets from backend
- Populate dashboard state with tickets
- Manage loading state
- Backend-driven pagination and sorting
- Sync reload on filter change
- No UI rendering yet

---

## Phase 4 – Sync / Refresh Flow ✅ (Completed)
- Introduce explicit `refresh()` flow
- Reload tickets without changing filters
- Prepare hook for enrichment completion
- Prepare architecture for future SignalR integration
- No UI and no real-time wiring yet

---

## Phase 5 – Pagination & Sorting Logic ✅ (Completed)
- Centralize page, pageSize, and sort logic in state
- Facade-driven pagination API
- Ensure automatic reload rules
- UI-independent pagination behavior

---

## Phase 6 – Side Panel Domain (Backend-Driven) ✅ (Completed)
- Define dedicated side panel DTOs
- Implement group details API client
- Separate side panel domain from dashboard grid
- Extend dashboard state with:
  - selectedGroup
  - sidePanelOpen
- Facade orchestration for opening/closing side panel
- No UI and no rendering yet

---

## Phase 7 – UI Implementation (Current / Next)
UI is implemented only after all backend and state flows are stable.

### Phase 7.1 – Side Panel UI
- Open / close side panel
- Display group name
- Display group tickets (clicked ticket first)
- Handle "no group assigned" state
- Analysis section placeholder

### Phase 7.2 – Toolbar & Filters UI
- Status, priority, group, and search filters
- Server-side reload on every change
- i18n applied only to static labels

### Phase 7.3 – Tickets Grid UI
- Render tickets grid
- Sticky header and footer
- Pagination controls
- Processing state for enrichment (hourglass / grey rows)

---

## Phase 8 – Chart (Pending Backend API)
- Dedicated chart API (not reused from dropdowns)
- Top 10 groups by unresolved tickets
- Remaining groups aggregated into "Others"
- Chart logic implemented only after API finalization

---

## Phase 9 – Real-Time Updates (Optional)
- SignalR / WebSocket integration
- Enrichment completion triggers refresh
- Update sync timestamp

---

## AI Usage Strategy
- AI assists implementation only
- All architectural decisions remain manual
- Specifications act as strict AI constraints
- No auto-generated refactors
- No logic inferred outside backend contracts