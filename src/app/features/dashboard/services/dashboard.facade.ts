import { TicketsApi } from '../../../core/api/tickets.api';
import { map } from 'rxjs';
import { mapTicket } from '../../../core/mappers/ticket.mapper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardFilter } from '../models/dashboard-filter.model';
import { DashboardState } from '../state/dashboard.state';
import { DashboardStateService } from '../state/dashboard-state.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  readonly state$: Observable<DashboardState> =
    this.stateService.state$;

  constructor(
  private readonly stateService: DashboardStateService,
  private readonly ticketsApi: TicketsApi
) {}

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
    .pipe(
      map(page => page.items.map(mapTicket))
    )
    .subscribe({
      next: tickets => {
        console.log('[DashboardFacade] mapped tickets', tickets);
      },
      error: () => {
        this.stateService.setLoading(false);
      },
      complete: () => {
        this.stateService.setLoading(false);
      }
    });
}
}