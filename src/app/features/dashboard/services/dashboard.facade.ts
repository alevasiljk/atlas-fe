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

  constructor(private readonly stateService: DashboardStateService) {}

  updateFilter(filter: Partial<DashboardFilter>): void {
    this.stateService.updateFilter(filter);
  }

  setLoading(loading: boolean): void {
    this.stateService.setLoading(loading);
  }
}