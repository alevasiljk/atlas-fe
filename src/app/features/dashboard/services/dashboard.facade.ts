import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DashboardFilter } from '../models/dashboard-filter.model';
import { DashboardState } from '../state/dashboard.state';
import { DashboardStateService } from '../state/dashboard-state.service';
import { TicketsApi } from '../../../core/api/tickets.api';
import { mapTicket } from '../../../core/mappers/ticket.mapper';
import { GroupsApi } from '../../../core/api/groups.api';
import { PrioritiesApi } from '../../../core/api/priorities.api';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  readonly state$: Observable<DashboardState>;

  constructor(
    private readonly stateService: DashboardStateService,
    private readonly ticketsApi: TicketsApi,
    private readonly groupsApi: GroupsApi,
    private readonly prioritiesApi: PrioritiesApi,
  ) {
    this.state$ = this.stateService.state$;
  }

  updateFilter(filter: Partial<DashboardFilter>): void {
    this.stateService.updateFilter(filter);
  }

  setLoading(loading: boolean): void {
    this.stateService.setLoading(loading);
  }

  loadTickets(): void {
    const filter = this.stateService.snapshot.filter;

    this.stateService.setLoading(true);

    this.ticketsApi
      .getTickets(filter)
      .pipe(map((page) => page.items.map(mapTicket)))
      .subscribe({
        next: (tickets) => {
          this.stateService.setTickets(tickets);
        },
        error: () => {
          this.stateService.setLoading(false);
        },
        complete: () => {
          this.stateService.setLoading(false);
        },
      });
  }

  loadPriorities(): void {
    this.prioritiesApi.getPriorities().subscribe({
      next: (priorities) => this.stateService.setPriorities(priorities),
    });
  }

  loadGroups(): void {
    this.groupsApi.getGroupsDropdown().subscribe({
      next: (groups) => this.stateService.setGroups(groups),
    });
  }

  changePage(page: number): void {
    this.stateService.setPage(page);
  }

  changePageSize(pageSize: number): void {
    this.stateService.setPageSize(pageSize);
  }

  changeSort(sort: 'asc' | 'desc'): void {
    this.stateService.setSort(sort);
  }

  /**
   * Force reload of tickets without changing filters.
   *
   * Used for:
   * - manual sync button
   * - backend enrichment completion
   * - future SignalR integration
   */
  refresh(): void {
    // IMPORTANT:
    // We intentionally DO NOT call updateFilter here,
    // to avoid resetting pagination or other filter state.

    this.loadTickets();
  }

  /**
   * TODO (Phase 7):
   * SignalR / WebSocket hook.
   *
   * Example:
   *
   * this.signalRService.onEnrichmentCompleted()
   *   .subscribe(() => {
   *     this.refresh();
   *   });
   *
   * This keeps real-time updates isolated from UI code.
   */
}
